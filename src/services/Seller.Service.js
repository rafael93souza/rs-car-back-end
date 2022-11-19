const knex = require('../connections/database');
const errors = require('../utils/errorsBase');

async function create(data) {
    const sellerExists = await knex('vendedores').where('email', data.email).orWhere("cpf", data.cpf).first();
    if (sellerExists) throw errors(409, 'E-mail e/ou CPF já cadastrado no sistema!');

    const createdSeller = await knex('vendedores').insert(data).returning("*");
    return createdSeller;
};
async function update(id, data) {
    if (!Number(id)) throw errors(400, 'Informe código válido do vendedor');

    const sellerExists = await knex('vendedores').where({ id }).first();
    if (!sellerExists) throw errors(403, 'Vendedor não encontrado no sistema!');

    const sellerExistsData = await knex('vendedores').where('email', data.email).where("id", "!=", id)
        .orWhere("cpf", data.cpf).where("id", "!=", id).first();

    if (sellerExistsData) throw errors(409, 'E-mail e/ou CPF já cadastrado no sistema!');
    const updateSeller = await knex('vendedores').update(data).where({ id }).returning("*");
    return updateSeller;
};

module.exports = {
    create, update
};