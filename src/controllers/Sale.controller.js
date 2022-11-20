const SaleService = require("../services/Sale.Service");

async function create(req, res) {
    try {
        const sale = await SaleService.create(req.body);
        return res.status(201).json(sale);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}

async function update(req, res) {
    const { id } = req.params;
    try {
        const sale = await SaleService.update(id, req.body);
        return res.status(200).json(sale);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}

async function findAll(req, res) {
    try {
        const sales = await SaleService.findAll();
        return res.status(200).json(sales);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
}
async function find(req, res) {
    const { id } = req.params;
    try {
        const sale = await SaleService.find(id);
        return res.status(200).json(sale);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}

async function remove(req, res) {
    const { id } = req.params;
    try {
        await SaleService.remove(id);
        return res.status(204).send();
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}


async function findSumAll(req, res) {
    try {
        const sales = await SaleService.findSumAll();
        return res.status(200).json(sales);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { create, update, findAll, find, remove, findSumAll }