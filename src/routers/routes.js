const express = require('express');
const route = express();
const Admin = require("../controllers/Admin.controller");
const Login = require("../controllers/Login.controller");
const validationSchema = require('../middlewares/validationSchema');
const { schemaRegisterAdmin, schemaLoginAdmin } = require('../schemas/schemaAdmin');

route.post("/admin", validationSchema(schemaRegisterAdmin), Admin.create);
route.post("/login", validationSchema(schemaLoginAdmin), Login.login);

module.exports = route;