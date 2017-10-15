var connector = require('./connector');

var db = connector.db;
var queryResult = connector.queryResult;




// add query functions


/*function getCountAllLogs(req, res, next) {
 db.func('getCountAllLogs',null,queryResult.one)
 .then(function (data) {
 res.status(200)
 .json({
 status: 'success',
 data: data,
 message: 'Retorna a quantidade de transações'
 });
 })
 .catch(function (err) {
 return next(err);
 });
 }*/

function getCountAllLogs(req, res, next) {
    db.func('getCountAllLogs',undefined,queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retornou o total de transações'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getAllLogs(req, res, next) {
    db.func('getvdbLogs',undefined,queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorou todas as transações'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getLogBk(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('getvdbLogsBk', bkID, queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornaou as transações de uma bike'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getLogSt(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getvdbLogsSt', stID, queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou as transações de uma estação'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getLogCli(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getvdbLogsCli', userID, queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou as transações de um usuário'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getCountSt(req, res, next) {
    db.func('getCountAllLogsSt',parseInt(req.params.id),queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retornou o total de transações de uma estação'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getCountBk(req, res, next) {
    db.func('getCountAllLogsBk',parseInt(req.params.id),queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorna o total de transações de uma bicicleta'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getCountCli(req, res, next) {
    db.func('getCountAllLogsCli',parseInt(req.params.id),queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retornou o total de transações de um cliente'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function doLoan(req, res, next) {
  db.func('open_vdb_log',[parseInt(req.params.cli),parseInt(req.params.idbk),parseInt(req.params.st),
      parseInt(req.params.sl)],queryResult.one)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Uma bike foi entregue'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function doReturn(req, res, next) {
  db.func('close_vdb_log',[parseInt(req.params.cli),parseInt(req.params.idbk),parseInt(req.params.st),
      parseInt(req.params.sl)],queryResult.one)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Uma bike foi devolvida'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
    getCountAllLogs: getCountAllLogs, // feito
    getAllLogs: getAllLogs, // feito
    getLogBk: getLogBk, // feito
    getLogSt: getLogSt, // feito
    getLogCli: getLogCli, // feito
    getCountBk: getCountBk,
    getCountSt: getCountSt,
    getCountCli: getCountCli,
	doLoan: doLoan, // feito
    doReturn: doReturn // feito
};
