const knex = require('../connections/database');
const errors = require('../utils/errorsBase');

async function create(data) {
    const sellerExists = await knex("vendedores")
        .where({ id: data.vendedor_id })
        .andWhere({ status: true })
        .first();
    if (!sellerExists) throw errors(409, 'Vendedor não cadastrado no sistema');

    const carExists = await knex("carros")
        .where({ id: data.carro_id })
        .andWhere({ status: true })
        .first();
    if (!carExists) throw errors(409, 'Carro não cadastrado no sistema');

    const saleExists = await knex('vendas')
        .where("carro_id", data.carro_id)
        .andWhere({ status: true })
        .first();

    if (saleExists) throw errors(409, 'O carro informado já vendido!');

    const createdSale = await knex('vendas')
        .insert(data)
        .returning(["id", "vendedor_id", "carro_id", "data", "valor"]);
    return createdSale;
};

async function update(id, data) {
    if (!Number(id)) throw errors(400, 'Informe código válido da venda');

    const saleExists = await knex('vendas')
        .where({ id })
        .andWhere({ status: true })
        .first();
    if (!saleExists) throw errors(403, 'Venda não encontrado no sistema!');

    const sellerExists = await knex("vendedores")
        .where({ id: data.vendedor_id })
        .andWhere({ status: true })
        .first();
    if (!sellerExists) throw errors(409, 'Vendedor não cadastrado no sistema');

    const carExists = await knex("carros")
        .where({ id: data.carro_id })
        .andWhere({ status: true })
        .first();
    if (!carExists) throw errors(409, 'Carro não cadastrado no sistema');

    const saleExistsData = await knex('vendas')
        .where("carro_id", data.carro_id)
        .andWhere("id", "!=", id)
        .andWhere({ status: true })
        .first();
    if (saleExistsData) throw errors(409, 'Carro que deseja atualizar já foi vendido!');

    const updateSale = await knex('vendas')
        .update(data)
        .where({ id })
        .returning(["id", "vendedor_id", "carro_id", "data", "valor"]);
    return updateSale;
};

async function findAll() {
    const sales = await knex('vendas')
        .select(["id", "vendedor_id", "carro_id", "data", "valor"])
        .where({ status: true });
    return sales;
};


async function find(id) {
    if (!Number(id)) throw errors(400, 'Informe código válido da venda');

    const saleExists = await knex('vendas')
        .select(["id", "vendedor_id", "carro_id", "data", "valor"])
        .where({ id })
        .andWhere({ status: true })
        .first();
    if (!saleExists) throw errors(403, 'Venda não encontrada no sistema!');
    return saleExists;
};

module.exports = {
    create, update, findAll, find
};