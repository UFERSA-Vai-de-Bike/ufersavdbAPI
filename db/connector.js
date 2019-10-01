/**
 * Created by silva on 09/10/17.
 */
const promise = require("bluebird");
const options = {
  promiseLib: promise
};

const pgp = require("pg-promise")(options);

const { DB_DATABASE, DB_HOST, DB_PASS, DB_PORT, DB_USER } = process.env;

const connectionString = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const db = pgp(connectionString);

const queryResult = {
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
