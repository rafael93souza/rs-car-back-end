const knex = require('../connections/database');
const errors = require('../utils/errorsBase');

async function create(data) {
    const carExists = await knex('carros')
        .where('placa', data.placa)
        .andWhere({ status: true })
        .first();
    if (carExists) throw errors(409, 'Carro já cadastrado no sistema!');

    const createdCar = await knex('carros').insert({ ...data }).returning("*");
    const { status, ...car } = createdCar[0];
    return [car];
};

module.exports = {
    create,
};
