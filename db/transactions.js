var connector = require('./connector');
var response = require('../response');

var db = connector.db;
var queryResult = connector.queryResult;




// add query functions

function getCountAllLogs(req, res, next) {
    db.func('getCountAllLogs',undefined,queryResult.one)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o total de transações'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function getAllLogs(req, res, next) {
    db.func('getvdbLogs',undefined,queryResult.any)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou todas as transações'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function getLogBk(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('getvdbLogsBk', bkID, queryResult.any)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornouou as transações de uma bike'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function getLogSt(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getvdbLogsSt', stID, queryResult.any)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou as transações de uma estação'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function getLogCli(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getvdbLogsCli', userID, queryResult.any)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou as transações de um usuário'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}
function getBikeOfCli(req, res, next) {
  var bkId = parseInt(req.params.id);
  db.func('getBikeOfCli', bkId, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retorna a bike de um usuário'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function getCountSt(req, res, next) {
    db.func('getCountAllLogsSt',parseInt(req.params.id),queryResult.one)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o total de transações de uma estação'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function getCountBk(req, res, next) {
    db.func('getCountAllLogsBk',parseInt(req.params.id),queryResult.one)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o total de transações de uma bicicleta'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function getCountCli(req, res, next) {
    db.func('getCountAllLogsCli',parseInt(req.params.id),queryResult.one)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o total de transações de um cliente'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function doLoan(req, res, next) {
  db.func('open_vdb_log',[parseInt(req.params.cli),parseInt(req.params.bk),parseInt(req.params.st),
      parseInt(req.params.sl)],queryResult.one)
    .then(function () {
      res.status(200)
        .json(response.success({}, 'Uma bike foi entregue'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function doReturn(req, res, next) {
  db.func('close_vdb_log',[parseInt(req.params.cli),parseInt(req.params.bk),parseInt(req.params.st),
      parseInt(req.params.sl)],queryResult.one)
    .then(function () {
        res.status(200).json(response.success({}, 'Uma bike foi devolvida'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}


module.exports = {
    getCountAllLogs: getCountAllLogs, // feito
    getAllLogs: getAllLogs, // feito
    getLogBk: getLogBk, // feito
    getLogSt: getLogSt, // feito
    getLogCli: getLogCli, // feito
    getBikeOfCli: getBikeOfCli,
    getCountBk: getCountBk,
    getCountSt: getCountSt,
    getCountCli: getCountCli,
	doLoan: doLoan, // feito
    doReturn: doReturn // feito
};
