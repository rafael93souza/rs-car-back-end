const AdminService = require('../services/Admin.service');

async function create(req, res) {
    try {
        const administrator = await AdminService.create(req.body);
        return res.status(201).json(administrator);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}

module.exports = { create }