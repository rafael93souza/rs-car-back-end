const knex = require('../connections/database');
const errors = require('../utils/errorsBase');
const sub = require('date-fns/sub');
const add = require('date-fns/add');
const format = require('date-fns/format');

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
        .where({ 'vn.status': true })
        .orderBy("vn.id", "desc")
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
    const sellers = await knex("vendedores")
        .select("id", "nome")
        .where({ status: true });

    const sales = await knex('vendas as vn')
        .where({ 'vn.status': true })
        .sum("vn.valor as soma")
        .groupBy("vn.vendedor_id")
        .join("vendedores as vd", 'vd.id', "=", "vn.vendedor_id")
        .groupBy("vd.id")
        .select("vn.vendedor_id", "vd.nome")
        .orderBy("soma", "desc")

    sellers.map((seller) => {
        const findSale = sales.find((sale) => sale.vendedor_id === seller.id)
        if (!findSale) sales.push({ soma: 0, ...seller })
    })
    return sales;
};

async function findMonthlySum(qtd_months) {
    const filterDate = qtd_months ? qtd_months : 6;
    const days = new Date().getDate();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    const milliseconds = new Date().getMilliseconds();
    const filter = sub(new Date(),
        { months: filterDate, days: days - 1, hours, minutes, seconds, milliseconds });
    const results = []

    for (i = 1; i <= filterDate; i++) {
        const months = add(filter, { months: i });
        const months2 = add(months, { months: 1, seconds: -1 })
        const sales = await knex('vendas')
            .where({ 'status': true })
            .andWhere("data", ">", months)
            .andWhere("data", "<", months2)
        let sumSales = 0
        if (sales.length) {
            sales.map((sale) => sumSales += sale.valor)
        }
        const formatterDate = Intl.DateTimeFormat('pt-BR', {
            year: "numeric",
            month: "long"
        });
        results.push({
            mes: formatterDate.format(months),
            soma_mensal: sumSales,
            media_mensal: (sumSales / sales.length) || 0,
            quantidade_vendas: sales.length,
            periodo: { de: months, ate: months2 },
        })
    }
    return results;
};
module.exports = {
    create, update, findAll, find, remove, findSumAll, findMonthlySum
};