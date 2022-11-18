const knex = require('../connections/database');
const bcrypt = require('bcrypt');
const errors = require('../utils/errorsBase');
const jwt = require("jsonwebtoken");

async function login(data) {
    const { email, senha } = data;
    const admin = await knex('administrador').where('email', email).first();
    if (!admin) {
        throw errors(403, 'E-mail ou senha incorretos!');
    }
    const encrypted = await bcrypt.compare(senha, admin.senha);
    if (!encrypted) {
        throw errors(403, 'E-mail ou senha incorretos!');
    }
    const { id, nome } = admin;

    const token = jwt.sign({ id, nome, email },
        process.env.JWT_PASS,
        { algorithm: 'HS256', expiresIn: '2d' });

    return { admin: { id, nome, email }, token };
};

module.exports = {
    login
};
