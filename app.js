// ==================================
// pegando os pacotes que precisamos
// ==================================

var express = require("express");
var cors = require("cors");
var app = express();
var bodyparser = require("body-parser");
var morgan = require("morgan");
var dotenv = require("dotenv");
var jwt = require("jsonwebtoken"); // usado pra criar, assinar e verificar tokens

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
  var err = new Error("Not Found");
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
