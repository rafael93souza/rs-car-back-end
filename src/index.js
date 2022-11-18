require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const routes = require("./routers/routes");

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.info(`App rodando na porta ${PORT}`))