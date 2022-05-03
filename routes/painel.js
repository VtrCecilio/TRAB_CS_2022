const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Middlewares = require('./middlewares');

router.get('/', (req, res) => {
    return res.render("painel/pCliente");
});


module.exports = router;