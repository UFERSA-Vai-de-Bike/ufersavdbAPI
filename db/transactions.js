var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgresql://postgres:admin@localhost:5432/ufersavdb_1';
var db = pgp(connectionString);


// add query functions

/*
-- SELECT add_out_log(idStation,idBike,idCli,nSlot);
-- SELECT * FROM getCountOutLogs();
-- SELECT * FROM getOutLogs();
-- SELECT * FROM getOutLogBike(idBike);
-- SELECT * FROM getOutLogCli(idCli);
-- SELECT * FROM getOutLogStation(idStation);
-- SELECT add_in_log(idStation,idBike,idCli,nSlot);
-- SELECT getCountInLogs();
-- SELECT * FROM getInLogs();
-- SELECT * FROM getInLogBike(idBike);
-- SELECT * FROM getInLogCli(idCli);
-- SELECT * FROM getInLogStation(idStation);
*/


module.exports = {
	getCountOutLogs: getCountOutLogs,
	getOutLogs: getOutLogs,
	getOutLogBike: getOutLogBike,
	getOutLogStation: getOutLogStation,
	getOutLogCli: getOutLogCli,
	doLoan: doLoan,
	getCountInLogs: getCountInLogs,
	getInLogs: getInLogs,
	getInLogBike: getInLogBike,
	getInLogStation: getInLogStation,
	getInLogCli: getInLogCli,
	doReturn: doReturn
};