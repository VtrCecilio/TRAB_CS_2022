//=====================
//    PACKAGE IMPORTS
//=====================
const passport = require("passport");


//=========================
//    CONTROLLER EXPORTS
//=========================
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/");
    }
}

exports.isLoggedInAtMenu = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/painel");
    } else {
        return next();
    }
}


exports.authenticateLogin = passport.authenticate("local", {
    successRedirect: "/painel",
    failureRedirect: "/"
});

