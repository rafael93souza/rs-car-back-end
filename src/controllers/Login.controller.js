const LoginService = require('../services/Login.service');

async function login(req, res) {
    try {
        const token = await LoginService.login(req.body);
        return res.status(200).json(token);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }

};

module.exports = { login };
