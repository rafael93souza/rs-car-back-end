const knex = require('../connections/database');
const errors = require('../utils/errorsBase');

async function create(data) {
    const carExists = await knex('carros')
        .where('placa', data.placa)
        .first();

    if (carExists) {
        if (carExists.status) {
            throw errors(409, 'Carro já cadastrado no sistema!');
        } else {
            const updateCar = await knex('carros')
                .update({ ...data, status: true })
                .where({ id: carExists.id })
                .returning("*");
            const { status, ...car } = updateCar[0];
            return [car];
        }
    }
    const createdCar = await knex('carros').insert({ ...data }).returning("*");
    const { status, ...car } = createdCar[0];
    return [car];
};


async function update(id, data) {
    const carExists = await knex('carros')
        .where({ id })
        .andWhere({ status: true })
        .first();
    if (!carExists) throw errors(409, 'Carro não encontrado no sistema!');

    const carExistsData = await knex('carros')
        .where('placa', data.placa)
        .andWhere('id', '!=', id)
        .first()

    if (carExistsData) throw errors(409, 'Placa já cadastrada no sistema para outro veículo!');

    const updateCar = await knex('carros')
        .update({ ...data })
        .where({ id })
        .returning("*");
    const { status, ...car } = updateCar[0];
    return [car];
};

module.exports = {
    create, update
};
