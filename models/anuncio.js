//=====================
//   PACKAGE IMPORTS
//=====================
const mongoose = require('mongoose');


const anuncioSchema = new mongoose.Schema({
    nomeProduto: {
        type: String,
        required: true
    },
    precoProduto: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true,
    },
    loja: {
        type: mongoose.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    avaliacaoTotal: {
        type: Number,
        required: true
    },
    qtdAvaliados: {
        type: Number,
        required: true,
    },
    comentarios: [{
        autor: {
            type: String,
            required: true
        },
        texto: {
            type: String,
            required: true
        }
    }],
    deleted: {
        type: Boolean,
        required: true
    }
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);


//===================
//   MODEL EXPORTS
//===================
module.exports = Anuncio;