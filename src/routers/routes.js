const express = require('express');
const route = express();
const Admin = require("../controllers/Admin.controller");
const validationSchema = require('../middlewares/validationSchema');
const schemaRegisterAdmin = require('../schemas/schemaRegisterAdmin');


route.post("/admin", validationSchema(schemaRegisterAdmin), Admin.create);

module.exports = route;