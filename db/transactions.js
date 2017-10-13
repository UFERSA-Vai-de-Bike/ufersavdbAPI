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
    var finished = null;
    var text = '';
    if (typeof req.params.fin !== 'undefined') {
        if (req.params.fin) {
            finished = true;
            text = ' concluídas';
        } else {
            finished = false;
            text = ' não concluídas';
        }
    }
    db.func('getCountAllLogs',finished,queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorna a quantidade de transações' + text
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getCountAllLogsCond(req, res, next) {
    var finished = parseInt(req.params.fin);
    var text = '';
    if (finished === 1) {
        finished = true;
        text = ' concluídas';
    } else if (finished === 0) {
        finished = false;
        text = ' não concluídas';
    } else
        finished = null;
    db.func('getCountAllLogs',finished,queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorna a quantidade de transações' + text
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
                    message: 'Retorna todas as transações'
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
          message: 'Retorna as transações de uma bike'
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
          message: 'Retorna as transações de uma estação'
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
          message: 'Retorna as transações de um usuário'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getCountSt(req, res, next) {
    var finished = null;
    var text = ' ';
    if (typeof req.params.fin !== 'undefined') {
        if (req.params.fin) {
            finished = true;
            text = ' concluídas ';
        } else {
            finished = false;
            text = ' não concluídas ';
        }
    }
    db.func('getCountAllLogsSt',[parseInt(req.params.id),finished],queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorna a quantidade de transações' + text + 'de uma estação'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getCountBk(req, res, next) {
    var finished = null;
    var text = '';
    if (typeof req.params.fin !== 'undefined') {
        if (req.params.fin) {
            finished = true;
            text = ' concluídas ';
        } else {
            finished = false;
            text = ' não concluídas ';
        }
    }
    db.func('getCountAllLogsBk',[parseInt(req.params.id),finished],queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorna a quantidade de transações' + text + 'de uma bicicleta'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getCountCli(req, res, next) {
    var finished = null;
    var text = '';
    if (typeof req.params.fin !== 'undefined') {
        if (req.params.fin) {
            finished = true;
            text = ' concluídas ';
        } else {
            finished = false;
            text = ' não concluídas ';
        }
    }
    db.func('getCountAllLogsCli',[parseInt(req.params.id),finished],queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorna a quantidade de transações' + text + 'de um cliente'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function doLoan(req, res, next) {
  db.func('open_vdb_log',[parseInt(req.params.cli),parseInt(req.params.idbk),parseInt(req.params.st),
      parseInt(req.params.sl)],queryResult.none)
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
      parseInt(req.params.sl)],queryResult.none)
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
    getCountAllLogsCond: getCountAllLogsCond,
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