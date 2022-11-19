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

module.exports = { create }