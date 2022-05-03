const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Middlewares = require('./middlewares');

router.get('/logout', (req, res) => {
    req.logout();
    return res.redirect("/");
});


router.use((req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect("/painel");
    }else{
        next();
    }
});

router.get('/', (req, res) => {
    return res.render("auth/loginEscolha");
});

router.get('/login-cliente', (req, res) => {
    return res.render("auth/loginCliente");
});

router.get('/login-lojista', (req, res) => {
    return res.render("auth/loginLojista");
});

router.get('/cadastro-lojista', (req, res) => {
    return res.render("auth/createLojista")
});

router.get('/cadastro-cliente', (req, res) => {
    return res.render("auth/createCliente")
});

router.post('/cadastro-cliente', async (req, res) => {
    let NewCliente;
    //const errors = validationResult(req);

    //if (!errors.isEmpty()) {
    //    return res.render(
    //        "admin/painelAdminsNovo",
    //        { Admin: req.body.AdminField, message: errors.array() }
    //    );
    //}

    try {
        NewCliente = await User.register(
            new User({ 
                username: req.body.username, 
                nome: req.body.nome, 
                email: req.body.email,
                rua: req.body.rua,
                bairro: req.body.bairro,
                cpf: req.body.cpf,
                tipo: true,
                numero: req.body.numero}),
            req.body.password
        );
    } catch (e) {
        console.log(e.message);
        return res.status(500).send('Erro interno ao criar Cliente!');
    }

    console.log("===============================");
    console.log("        Cliente Criado");
    console.log("      Nome Cliente: " + NewCliente.username);
    console.log("===============================");
    //req.flash("message", "Admin: " + NewAdmin.username + " foi cadastrado com sucesso!");
    return res.redirect("/");
});

router.post('/cadastro-lojista', async (req, res) => {
    let NewLojista;
    //const errors = validationResult(req);

    //if (!errors.isEmpty()) {
    //    return res.render(
    //        "admin/painelAdminsNovo",
    //        { Admin: req.body.AdminField, message: errors.array() }
    //    );
    //}

    try {
        NewLojista = await User.register(
            new User({ 
                username: req.body.username, 
                nome: req.body.nome, 
                email: req.body.email,
                rua: req.body.rua,
                bairro: req.body.bairro,
                cnpj: req.body.cnpj,
                tipo: false,
                numero: req.body.numero}),
            req.body.password
        );
    } catch (e) {
        console.log(e.message);
        return res.status(500).send('Erro interno ao criar Lojista!');
    }

    console.log("===============================");
    console.log("        Lojista Criado");
    console.log("      Nome Lojista: " + NewLojista.username);
    console.log("===============================");
    //req.flash("message", "Admin: " + NewAdmin.username + " foi cadastrado com sucesso!");
    return res.redirect("/");
});

router.post('/login', Middlewares.authenticateLogin, (req, res) => {

});


module.exports = router;