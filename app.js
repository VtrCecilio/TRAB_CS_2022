//= ====================
//    PACKAGE IMPORTS
//= ====================
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

const methodOverride = require('method-override');

const store = new MongoDBStore({
  uri: process.env.DATABASEURL,
  collection: 'sessions',
});

//= ===========================
//   Routes & Assists IMPORTS
//= ===========================
//const ResponsesRoutes = require('./routes/responses');
//const AdminRoutes = require('./routes/admin');
//const ErrorsRoutes = require('./routes/errors');
const authRoutes = require('./routes/auth');
const painelRoutes = require('./routes/painel');

const Middlewares = require('./routes/middlewares');

//= =====================
//    DATABASE IMPORTS
//= =====================
const User = require('./models/user');


//= ========================
//   SETTINGS AND USAGES
//= ========================
app.set('view engine', 'ejs');
app.set('views', 'views');
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());

app.use(session({
  secret: 'trabcs2022',
  resave: false,
  saveUninitialized: false,
  store,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(express.static('./public'));

//= =======================
//   MIDDLEWARES GERAIS
//= =======================
app.use((req, res, next) => {  
  if (req.user) {
    res.locals.currentUser = {
      username: req.user.username,
      nome: req.user.nome,
      tipo: req.user.tipo,
      email: req.user.email,
      rua: req.user.rua,
      bairro: req.user.bairro,
      numero: req.user.numero,
      adicionais: req.user.adicionais,
      cpf: req.user.cpf,
      cnpj: req.user.cnpj
    };
  }
  console.log(res.locals.currentUser);
  res.locals.message = req.flash('message');
  return next();
});

//app.use('/painel', Middlewares.isLoggedIn);

//= ==================
//   ROUTES USAGES
//= ==================
app.use('/painel', painelRoutes);
app.use('/', authRoutes);

app.use('*', (req, res) => {
    res.status(404).send("Erro 404. Página não encontrada!");
});

//= ===========================================
//   Server Listener && DataBase Connection
//= ===========================================
mongoose.connect(
  process.env.DATABASEURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
).then(async () => {
  console.log('===============================');
  console.log('       Connected to DataBase');
  console.log('===============================');
  console.log()

  app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log('===============================');
    console.log('!!!!!!!Servidor Bootado!!!!!!!!');
    console.log('===============================');
  });
}).catch((e) => {
  console.log('         Error/DataBase:');
  console.log(e);
});
