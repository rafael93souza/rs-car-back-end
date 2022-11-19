const knex = require('../connections/database');
const errors = require('../utils/errorsBase');

async function create(data) {
    const sellerExists = await knex('vendedores')
        .where('email', data.email)
        .orWhere("cpf", data.cpf)
        .first();

    if (sellerExists) {
        if (sellerExists.status) {
            throw errors(409, 'E-mail e/ou CPF já cadastrado no sistema!');
        } else {
            const updateSeller = await knex('vendedores')
                .update({ ...data, status: true })
                .where({ id: sellerExists.id })
                .returning(["id", "nome", "email", "cpf"]);
            return updateSeller;
        }
    }
    const createdSeller = await knex('vendedores')
        .insert(data)
        .returning(["id", "nome", "email", "cpf"]);
    return createdSeller;
};


async function update(id, data) {
    if (!Number(id)) throw errors(400, 'Informe código válido do vendedor');

    const sellerExists = await knex('vendedores')
        .where({ id })
        .andWhere({ status: true })
        .first();
    if (!sellerExists) throw errors(403, 'Vendedor não encontrado no sistema!');

    const sellerExistsData = await knex('vendedores')
        .where('email', data.email)
        .where("id", "!=", id)
        .orWhere("cpf", data.cpf)
        .where("id", "!=", id)
        .first();

    if (sellerExistsData) throw errors(409, 'E-mail e/ou CPF já cadastrado no sistema!');
    const updateSeller = await knex('vendedores')
        .update(data)
        .where({ id })
        .returning(["id", "nome", "email", "cpf"]);
    return updateSeller;
};


async function findAll() {
    const sellers = await knex('vendedores')
        .select(["id", "nome", "email", "cpf"])
        .where({ status: true })
    return sellers;
};


async function find(id) {
    if (!Number(id)) throw errors(400, 'Informe código válido do vendedor');

    const sellerExists = await knex('vendedores')
        .select(["id", "nome", "email", "cpf"])
        .where({ id })
        .andWhere({ status: true })
        .first();
    if (!sellerExists) throw errors(403, 'Vendedor não encontrado no sistema!');
    return sellerExists;
};


async function remove(id) {
    if (!Number(id)) throw errors(400, 'Informe código válido do vendedor');

    const sellerExists = await knex('vendedores')
        .where({ id })
        .andWhere({ status: true })
        .first();
    if (!sellerExists) throw errors(403, 'Vendedor não encontrado no sistema!');

    await knex("vendedores").update({ status: false }).where({ id })

    return true;
};

module.exports = {
    create, update, findAll, find, remove
};