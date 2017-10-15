var connector = require('./connector');

var db = connector.db;
var queryResult = connector.queryResult;

// add query functions

function getBikes(req, res, next) {
  db.func('getBikes',undefined,queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna todas as bikes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getBikesName(req, res, next) {
    db.func('getBksName',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorna o nome de todas as bikes'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function getValBks(req, res, next) {
    db.func('getValBks',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorna o id e nome de bicicletas válidas'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getBike(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('getBike', bkID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna uma bike'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

/*function getUserByUserName(req, res, next) {
    db.func('getClientByUserName', req.params.name, queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retorna um usuário'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}*/

function getBikesSt(req, res, next) {
  db.func('getBikesSt',parseInt(req.params.id),queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna todas as bikes da estação'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getBikesOnSt(req, res, next) {
  db.func('getBikesOnSt',parseInt(req.params.id),queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna todas as bikes que estão na estação'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getBikesOffSt(req, res, next) {
  db.func('getBikesOffSt',parseInt(req.params.id),queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna todas as bikes que sairam da estação'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getLogs(req, res, next) {
    db.func('getHistsBike', null, queryResult.many)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message:  'Retorna o histórico de todas as bikes'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}


function getLog(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('getHistBike', [bkID,null], queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna o histórico de uma bike'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createBike(req, res, next) {
  db.func('createBike',req.body.name,queryResult.one)
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

function updateBike(req, res, next) {
  db.func('upd_bike',[parseInt(req.bod.id),req.body.name],queryResult.one)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Atualizou uma bike'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateStation(req, res, next) {
  db.func('upd_bikeSt',[parseInt(req.param.bk),parseInt(req.param.st),parseInt(req.param.sl)],queryResult.one)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Atualizou uma bike'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeBikes(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('delBikes',bkID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removeu 1 bike'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeBike(req, res, next) {
  db.func('delBike',undefined,queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removeu ${result.rowCount} bikes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function changeState(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('changeBikeState',bkID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Mudou o estado de 1 bike'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
    getBikes: getBikes, // feito
    getBikesName: getBikesName,// feito
    getValBks: getValBks,
    getBike: getBike, // feito
    getBikesSt: getBikesSt, // feito
    getBikesOnSt: getBikesOnSt, // feito
    getBikesOffSt: getBikesOffSt, // feito
    getBikeLogs: getLogs, // feito
    getBikeLog: getLog, // feito
    changeState: changeState, // feito
    updateStation: updateStation, // feito
    createBike: createBike, // feito
    updateBike: updateBike, // feito
    removeBikes: removeBikes, // feito
    removeBike: removeBike // feito
};
