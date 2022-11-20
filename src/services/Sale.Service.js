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
        .first();

    if (saleExists) {
        if (saleExists.status) {
            throw errors(409, 'Carro já vendido!');
        } else {
            const updateSale = await knex('vendas')
                .update({ ...data, status: true })
                .where({ id: saleExists.id })
                .returning(["id", "vendedor_id", "carro_id", "data", "valor"]);
            return updateSale;
        }
    }
    const createdSale = await knex('vendas')
        .insert(data)
        .returning(["id", "vendedor_id", "carro_id", "data", "valor"]);
    return createdSale;
};


module.exports = {
    create,
};