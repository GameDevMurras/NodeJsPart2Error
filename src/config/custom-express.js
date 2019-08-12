require('marko/node-require').install();
require('marko/express');

const templates = require("../app/views/templates");

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use('/estatico', express.static('src/app/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

const sessaoAutenticacao = require("./sessao-autenticacao");
sessaoAutenticacao(app);

const rotas = require('../app/rotas/rotas');
rotas(app);

app.use(function(req, res, next)
{
  res.status(404).marko(templates.base.err404);
  next();
});

app.use(function(error, req, res, next)
{
 console.log(`Erro: ${error}`);
  res.status(500).marko(templates.base.err500);
  next();
});

module.exports = app;