const SaleService = require("../services/Sale.Service");

async function create(req, res) {
    try {
        const sale = await SaleService.create(req.body);
        return res.status(201).json(sale);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
}
module.exports = { create }