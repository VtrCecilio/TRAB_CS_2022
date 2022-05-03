//=====================
//   PACKAGE IMPORTS
//=====================
const mongoose = require('mongoose');


const anuncioSchema = new mongoose.Schema({
    nomeItem: {
        type: String,
        required: true
    },
    valorItem: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true,
    },
    loja: {
        type: mongoose.Types.ObjectId,
        ref: 'Lojista', 
        required: true
    },
    comentarios: [{
        autor: {
            type: mongoose.Types.ObjectId,
            ref: 'Cliente',
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