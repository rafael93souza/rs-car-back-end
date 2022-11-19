const express = require('express');
const route = express();
const Admin = require("../controllers/Admin.controller");
const Login = require("../controllers/Login.controller");
const Seller = require("../controllers/Seller.controller");
const validationSchema = require('../middlewares/validationSchema');
const verifyToken = require('../middlewares/verifyToken');
const { schemaRegisterAdmin, schemaLoginAdmin } = require('../schemas/schemaAdmin');
const { schemaRegisterSeller } = require('../schemas/schemaSeller');


route.post("/admin", validationSchema(schemaRegisterAdmin), Admin.create);
route.post("/login", validationSchema(schemaLoginAdmin), Login.login);

route.use(verifyToken);
route.get("/admin", Admin.getAdmin)
route.post("/vendedor", validationSchema(schemaRegisterSeller), Seller.create)

module.exports = route;