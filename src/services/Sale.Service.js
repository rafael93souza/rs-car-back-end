const knex = require('../connections/database');
const errors = require('../utils/errorsBase');
const sub = require('date-fns/sub')
const add = require('date-fns/add')

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

    if (saleExists) throw errors(409, 'O carro informado já foi vendido!');

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
    const sales = await knex('vendas as vn')
        .join("vendedores as vd", 'vd.id', "=", "vn.vendedor_id")
        .join("carros as cr", "cr.id", "=", "vn.carro_id")
        .select("vn.id", "vn.vendedor_id", "vn.carro_id", "vn.data", "vn.valor", "vd.nome", "vd.cpf", "vd.email", "cr.marca", "cr.modelo", "cr.ano", "cr.placa", "cr.preco", "cr.cor")
        .where({ 'vn.status': true });
    return sales;
};


async function find(id) {
    if (!Number(id)) throw errors(400, 'Informe código válido da venda');

    const saleExists = await knex('vendas as vn')
        .join("vendedores as vd", 'vd.id', "=", "vn.vendedor_id")
        .join("carros as cr", "cr.id", "=", "vn.carro_id")
        .select("vn.id", "vn.vendedor_id", "vn.carro_id", "vn.data", "vn.valor", "vd.nome", "vd.cpf", "vd.email", "cr.marca", "cr.modelo", "cr.ano", "cr.placa", "cr.preco", "cr.cor")
        .where({ 'vn.id': id })
        .where({ 'vn.status': true })
        .first();
    if (!saleExists) throw errors(403, 'Venda não encontrada no sistema!');
    return saleExists;
};


async function remove(id) {
    if (!Number(id)) throw errors(400, 'Informe código válido da venda');

    const saleExists = await knex('vendas')
        .where({ id })
        .andWhere({ status: true })
        .first();
    if (!saleExists) throw errors(403, 'Venda não encontrada no sistema!');

    await knex("vendas").update({ status: false }).where({ id })

    return true;
};


async function findSumAll() {
    const sales = await knex('vendas as vn')
        .where({ 'vn.status': true })
        .sum("vn.valor as soma")
        .groupBy("vn.vendedor_id")
        .join("vendedores as vd", 'vd.id', "=", "vn.vendedor_id")
        .groupBy("vd.id")
        .select("vn.vendedor_id", "vd.nome")
    return sales;
};

module.exports = {
    create, update, findAll, find, remove, findSumAll
};