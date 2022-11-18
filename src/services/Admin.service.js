const knex = require('../connections/database');
const errors = require('../utils/errorsBase');
const bcrypt = require("bcrypt");

async function create(data) {
    const admExists = await knex('administrador').where('email', data.email).first();
    if (admExists) {
        throw errors(409, 'E-mail já cadastrado no sistema!');
    }
    const passwordIncrypted = await bcrypt.hash(data.senha, 10);
    const admData = { ...data, senha: passwordIncrypted };
    const createdAdm = await knex('administrador').insert(admData).returning(['id', 'nome', 'email']);
    return createdAdm;
};

module.exports = {
    create,
};
