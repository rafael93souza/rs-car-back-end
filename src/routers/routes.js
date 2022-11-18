const express = require('express');
const route = express();

route.get("/", (req, res) => {
    return res.send("ok")
})
module.exports = route;