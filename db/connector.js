/**
 * Created by silva on 09/10/17.
 */
var promise = require('bluebird');
var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgresql://postgres:admin@localhost:5432/ufersa_vdb_1';
var db = pgp(connectionString);

var queryResult =  {
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