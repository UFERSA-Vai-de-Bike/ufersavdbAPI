/**
 * Created by silva on 09/10/17.
 */
const promise = require('bluebird');
const options = {
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgresql://postgres:admin@localhost:5432/ufersa_vdb_1';
const db = pgp(connectionString);

const queryResult =  {
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