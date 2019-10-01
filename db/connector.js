/**
 * Created by silva on 09/10/17.
 */
var promise = require("bluebird");

var options = {
  promiseLib: promise
};

var pgp = require("pg-promise")(options);

const { DB_DATABASE, DB_HOST, DB_PASS, DB_PORT, DB_USER } = process.env;

var connectionString = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
var db = pgp(connectionString);

var queryResult = {
  one: 1,
  many: 2,
  none: 4,
  any: 6
};
// add query functions

module.exports = {
  db: db,
  queryResult: queryResult
};
