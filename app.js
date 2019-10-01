// ==================================
// pegando os pacotes que precisamos
// ==================================
const express = require('express');
const cors = require('cors')
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const dotenv = require("dotenv");

// ==================================
// importando dependencias para o swagger
// ==================================
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// ==================================
// configurando swagger
// ==================================

const options = {
  swaggerDefinition: {
    info: {
      title: 'UFERSA Vai de Bike API',
      version: '1.0.0',
      description: 'Autogenerated docs with Swagger',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// ==================================
// configuração =====================
// ==================================
// importa o dot .env definido no root da aplicacão
dotenv.config();

// usando bodyparser para podermos pegar info de POST e parâmetros URL
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// usando morgan para fazer log das requisições no console
app.use(morgan("dev"));

app.use(cors());
// ==================================
// rotas ============================
// ==================================
var index = require("./routes/index");
var users = require("./routes/users");
var stations = require("./routes/stations");
var bikes = require("./routes/bikes");
var transactions = require("./routes/transactions");

app.use("/api", index);
app.use("/api/users", users);
app.use("/api/stations", stations);
app.use("/api/bikes", bikes);
app.use("/api/transactions", transactions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

// erro de desenvolvimento
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.code || 500).json({
      status: "error",
      message: err
    });
  });
}

// error de produção
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    status: "error",
    message: err.message
  });
});

module.exports = app;
