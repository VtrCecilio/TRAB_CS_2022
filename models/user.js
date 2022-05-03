//=====================
//   PACKAGE IMPORTS
//=====================
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");



//=====================
//   MONGOOSE SCHEMA
//=====================
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: Boolean,
        required: true
    },
    cnpj: {
        type: String,
    },
    cpf: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    numero: {
        type: String,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    bairro: {
        type: String,
        required: true
    },
    anuncios: [{
        type: mongoose.Types.ObjectId,
        ref: "Anuncio"
    }],
});

UserSchema.plugin(passportLocalMongoose);



//===================
//   MODEL EXPORTS
//===================
module.exports = mongoose.model("User", UserSchema);