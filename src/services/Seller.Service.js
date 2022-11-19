const knex = require('../connections/database');
const errors = require('../utils/errorsBase');

async function create(data) {
    const sellerExists = await knex('vendedores').where('email', data.email).orWhere("cpf", data.cpf).first();
    if (sellerExists) throw errors(409, 'E-mail e/ou CPF já cadastrado no sistema!');

    const createdSeller = await knex('vendedores').insert(data).returning("*");
    return createdSeller;
};

module.exports = {
    create,
};