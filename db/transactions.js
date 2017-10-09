var connector = require('./connector');

var db = connector.db;
var queryResult = connector.queryResult;




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

function getCountOutLogs(req, res, next) {
  db.func('getCountOutLogs')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna a quantidade de empréstimos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getOutLogs(req, res, next) {
  db.func('getOutLogs')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna todos os empréstimos'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getOutLogBike(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('getOutLogBike', bkID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna os empréstimos de uma bike'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getOutLogStation(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getOutLogCli', stID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna os empréstimos de uma estação'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getOutLogCli(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getOutLogStation', userID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna os empréstimos de um usuário'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getCountInLogs(req, res, next) {
  db.func('getCountInLogs')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna a quantidade de devoluções'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getInLogs(req, res, next) {
  db.func('getInLogs')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna todas as devoluções'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getInLogBike(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('getInLogBike', bkID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna as devoluções de uma bike'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getInLogStation(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getInLogCli', stID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna as devoluções de uma estação'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getInLogCli(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getInLogStation', userID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna as devoluções de um usuário'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


/*function doLoan(req, res, next) {
  db.func('add_out_log',[parseInt(req.body.idst),parseInt(req.body.idbk),parseInt(req.body.nslt)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Uma bike inserida'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}*/

function doLoan(req, res, next) {
	req.body.idst = parseInt(req.body.idst);
	req.body.idbk = parseInt(req.body.idbk);
	req.body.nslt = parseInt(req.body.nslt);
  db.func('add_out_log',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Uma bike inserida'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/*function doReturn(req, res, next) {
  db.func('add_in_log',[parseInt(req.body.idst),parseInt(req.body.idbk),parseInt(req.body.nslt)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Uma bike inserida'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}*/

function doReturn(req, res, next) {
	req.body.idst = parseInt(req.body.idst);
	req.body.idbk = parseInt(req.body.idbk);
	req.body.nslt = parseInt(req.body.nslt);
  db.func('add_in_log',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Uma bike inserida'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
	getCountOutLogs: getCountOutLogs, // feito
	getOutLogs: getOutLogs, // feito
	getOutLogBike: getOutLogBike, // feito
	getOutLogStation: getOutLogStation, // feito
	getOutLogCli: getOutLogCli, // feito
	doLoan: doLoan, // feito
	getCountInLogs: getCountInLogs, // feito
	getInLogs: getInLogs, // feito
	getInLogBike: getInLogBike, // feito
	getInLogStation: getInLogStation, // feito
	getInLogCli: getInLogCli, // feito
	doReturn: doReturn // feito
};