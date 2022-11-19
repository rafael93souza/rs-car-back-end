const CarsService = require("../services/Cars.Service");

async function create(req, res) {
    try {
        const car = await CarsService.create(req.body);
        return res.status(201).json(car);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    const { id } = req.params
    try {
        const car = await CarsService.update(id, req.body);
        return res.status(200).json(car);
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}

async function findAll(req, res) {
    try {
        const cars = await CarsService.findAll();
        return res.status(200).json(cars);
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
        const car = await CarsService.find(id);
        return res.status(200).json(car);
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
        await CarsService.remove(id);
        return res.status(204).send();
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Internal server Error!' });
    }
}


module.exports = { create, update, findAll, find, remove }