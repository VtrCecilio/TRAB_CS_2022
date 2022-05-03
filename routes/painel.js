const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Report = require('../models/report');
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

router.post('/fale-conosco', async (req, res) => {
    try {
        const created = await Report.create({ username: req.user.username, message: req.body.report.message });

        console.log("==================================");
        console.log("        Mensagem de Contato criada");
        console.log("      Feitor: " + req.user.username);
        console.log("===============================");
        req.flash("message", "Mensagem enviada com sucesso!!!");
        return res.redirect("/painel");
    } catch (e) {
        console.log(e);
        return res.status(500).send('Erro interno ao criar Mensagem de contato!');
    }

});

router.post('/editar-perfil', async (req, res) => {
    //const errors = validationResult(req);

    //if (!errors.isEmpty()) {
        //return res.render("painel/editarPerfil", { user: req.body.userField, username: req.params.username, message: errors.array() });
    //}

    try {
        const user = await User.findOne({ username: req.user.username });

        user.nome = req.body.nome;
        user.rua = req.body.rua;
        user.bairro = req.body.bairro;
        user.email = req.body.email;
        user.numero = req.body.numero;
        user.adicionais = req.body.adicionais;

        await user.save();

        console.log(user);
        console.log(req.user);

        if (!user) {
            return res.status(404).send("Erro 404. Página não encontrada!");
        }

        //MELHORAR ESTA ATUALIZAÇÃO POSTERIORMENTE

        console.log("===============================");
        console.log("        Usuário Atualizado");
        console.log("      nome: " + user.nome);
        console.log("===============================");

        req.flash("message", "Suas informações pessoais foram atualizadas com sucesso!");

        return res.redirect("/painel");

    } catch (e) {
        console.log(e.message);
        return res.status(500).send("Erro interno ao atualizar perfil!");
    }
});


module.exports = router;