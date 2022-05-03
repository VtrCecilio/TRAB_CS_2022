const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Middlewares = require('./middlewares');

router.get('/', (req, res) => {
    return res.render("painel/pCliente");
});

router.get('/fale-conosco', (req, res) => {
    return res.render("painel/faleConosco");
});

router.get('/editar-perfil', (req, res) => {
    return res.render("painel/editarPerfil");
});



module.exports = router;