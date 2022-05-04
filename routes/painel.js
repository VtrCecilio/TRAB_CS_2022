const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Report = require('../models/report');
const Anuncio = require('../models/anuncio');
const Middlewares = require('./middlewares');


router.get('/', Middlewares.isLoggedIn, async (req, res) => {
    
    try {
        if(req.user.tipo){
            const anuncios = await Anuncio.find({deleted: false}).populate({path: 'loja'});

            console.log(anuncios);

            return res.render("painel/pCliente", {anuncios});
        } else {
            const anuncios = await Anuncio.find({loja: req.user._id, deleted: false}); 
    
            return res.render("painel/pLojista", {anuncios});
        }   
    } catch (e) {
        console.log(e);
        return res.status(500).send("Erro interno ao carregar Painel de usuário!");
    }
});


router.get('/fale-conosco', Middlewares.isLoggedIn, (req, res) => {
    return res.render("painel/faleConosco");
});


router.get('/editar-perfil', Middlewares.isLoggedIn, (req, res) => {
    return res.render("painel/editarPerfil");
});


router.get('/novo-anuncio', Middlewares.isLoggedIn, (req, res) => {
    return res.render("painel/novoAnuncio");
});


router.get('/visualizar-anuncio/:id', Middlewares.isLoggedIn, async (req, res) => {
    try {
        const anuncio = await Anuncio.findOne({_id: req.params.id}).populate({path: 'loja'});

        console.log(anuncio);

        return res.render("painel/visualizarAnuncio", {anuncio});
    } catch (e) {
        console.log(e.message);
        return res.status(500).send('Erro interno ao gerar visualização de anúncio!');
    }
});

router.post('/postar-comentario/:id', Middlewares.isLoggedIn, async (req, res) => {
    try {
        const anuncio = await Anuncio.findOne({_id: req.params.id});

        const comentario = {
            autor: req.user._id,
            texto: req.body.comentario
        }

        anuncio.comentarios.push(comentario);
        await anuncio.save();

        req.flash("message", "Mensagem enviada com sucesso!!!");
        return res.redirect(`/painel/visualizar-anuncio/${req.params.id}`);
    } catch (e) {
        console.log(e.message);
        return res.status(500).send("Erro interno ao postar comentário!");
    }
});

router.post('/fale-conosco', Middlewares.isLoggedIn, async (req, res) => {
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


router.post('/editar-perfil', Middlewares.isLoggedIn, async (req, res) => {
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


router.post('/novo-anuncio', Middlewares.isLoggedIn, async (req, res) => {

    try {
        const created = await Anuncio.create({
            ...req.body,
            deleted: false,
            loja: req.user._id,
            qtdAvaliados: 0,
            avaliacaoTotal: 0
        });

        req.flash("message", `Novo anúncio criado com sucesso!`);
        return res.redirect(`/painel`);
    } catch (e) {
        console.log(e.message);
        return res.status(500).send("Erro interno ao criar novo anúncio!");
    }
});


router.post('/delete-anuncio/:id', Middlewares.isLoggedIn, async (req, res) => {
    try {
        const anuncio = await Anuncio.findOne({_id: req.params.id, loja: req.user._id});

        anuncio.deleted = true;
        await anuncio.save();


        req.flash("message", `Anúncio deletado com sucesso!`);
        return res.redirect(`/painel`);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Erro interno ao deletar anúncio!");
    }
});

module.exports = router;