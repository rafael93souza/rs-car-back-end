const SellerService = require("../services/Seller.Service");

async function create(req, res) {
    try {
        const seller = await SellerService.create(req.body);
        return res.status(201).json(seller);
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
        const seller = await SellerService.update(id, req.body);
        return res.status(200).json(seller);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}
async function findAll(req, res) {
    try {
        const sellers = await SellerService.findAll();
        return res.status(200).json(sellers);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}
async function find(req, res) {
    const { id } = req.params;
    try {
        const seller = await SellerService.find(id);
        return res.status(200).json(seller);
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
        await SellerService.remove(id);
        return res.status(204).send();
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}

module.exports = { create, update, findAll, find, remove }