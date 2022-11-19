const jwt = require('jsonwebtoken');
const knex = require("../connections/database");

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Não autorizado' })
    }
    const token = authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_PASS);
        const adminExists = await knex("administrador").where({ id });
        if (!adminExists.length) {
            return res.status(401).json({ message: 'Não autorizado' })
        }
        const { senha, ...admin } = adminExists[0]
        req.admin = admin
        next()
    } catch (error) {
        if (error.message === "jwt expired") {
            return res.status(401).json({ message: "Sua sessão expirou, faça o login novamente!" })
        }
        return res.status(401).json({ message: error.message })
    }
}
module.exports = verifyToken;