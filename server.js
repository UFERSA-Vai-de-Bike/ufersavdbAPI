// ==================================
// pegando os pacotes que precisamos
// ==================================

var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var morgan = require('morgan');

var jwt =  require('jsonwebtoken'); // usado pra criar, assinar e verificar tokens
var config = require('./config'); // pegando o arquivo de configuração

// ==================================
// configuração =====================
// ==================================

var port = process.env.port || 8080;
app.set('superSecret', config.secret);

// usando bodyparser para podermos pegar info de POST e parâmetros URL
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


// usando morgan para fazer log das requisições no console
app.use(morgan('dev'));

// ==================================
// rotas ============================
// ==================================
// rota basica
app.get('/', function(req, res) {
	res.send('Olá! A API esta no http://localhost:' + port + '/api');
});

// ROTAS DA API -------------
// chegaremos la


// ==================================
// iniciando o servidor
// ==================================
app.listen(port);

console.log('A magia acontece em http://localhost:' + port);
