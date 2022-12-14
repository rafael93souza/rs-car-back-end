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

async function findAll() {
    const cars = await knex('carros')
        .select(["id", "marca", "modelo", "ano", "placa", "preco", "cor"])
        .where({ status: true })
        .orderBy("id", "desc")

    const sales = await knex('vendas')
        .where({ 'status': true });

    sales.map((sale) => {
        const findCar = cars.find(car => car.id === sale.carro_id)
        findCar.vendido = true
    })
    return cars
};

async function find(id) {
    if (!Number(id)) throw errors(400, 'Informe código válido do carro');

    const carExists = await knex('carros')
        .select(["id", "marca", "modelo", "ano", "placa", "preco", "cor"])
        .where({ id })
        .andWhere({ status: true })
        .first();
    if (!carExists) throw errors(403, 'Carro não encontrado no sistema!');

    const sale = await knex('vendas')
        .where({ 'status': true })
        .andWhere({ carro_id: carExists.id })
        .first();
    if (sale) carExists.vendido = true
    return carExists;
};

async function remove(id) {
    if (!Number(id)) throw errors(400, 'Informe código válido do carro');

    const carExists = await knex('carros')
        .where({ id })
        .andWhere({ status: true })
        .first();
    if (!carExists) throw errors(403, 'Carro não encontrado no sistema!');

    const saleExists = await knex("vendas")
        .where({ carro_id: id })
        .andWhere({ status: true })
        .first();
    if (saleExists) throw errors(403, 'Carro não pode ser excluido sistema!');
    await knex("carros").update({ status: false }).where({ id })

    return true;
};

module.exports = {
    create, update, findAll, find, remove
};
