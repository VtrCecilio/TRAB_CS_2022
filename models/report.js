//=====================
//   PACKAGE IMPORTS
//=====================
const mongoose = require("mongoose");

//=====================
//   MONGOOSE SCHEMA
//=====================
const ReportSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    date: {
        type: String,
    }

});


//===================
//   MODEL EXPORTS
//===================
module.exports = mongoose.model("Report", ReportSchema);