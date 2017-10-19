var connector = require('./connector');
var response = require('../response');

var db = connector.db;
var queryResult = connector.queryResult;

// add query functions

function getBikes(req, res, next) {
  db.func('getBikes',undefined,queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as bikes'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}
function getBikesName(req, res, next) {
    db.func('getBksName',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o nome de todas as bikes'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}
function getValBks(req, res, next) {
    db.func('getValBks',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o ID e o nome de bicicletas válidas'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function getBike(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('getBike', bkID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou uma bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

/*function getUserByUserName(req, res, next) {
    db.func('getClientByUserName', req.params.name, queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retornou um usuário'
                });
        })
        .catch(function (err) {
            res.status(500)
                .json({
                    status: 'internal server error',
                    data: err,
                    message: 'Erro no servidor'
                })
        });
}*/

function getBikesSt(req, res, next) {
  db.func('getBikesSt',parseInt(req.params.id),queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as bikes da estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}
function getBikesOnSt(req, res, next) {
  db.func('getBikesOnSt',parseInt(req.params.id),queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as bikes que estão na estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}
function getBikesOffSt(req, res, next) {
  db.func('getBikesOffSt',parseInt(req.params.id),queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as bikes que sairam da estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function getLogs(req, res, next) {
    db.func('getHistsBike', null, queryResult.many)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o histórico de todas as bikes'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}


function getLog(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('getHistBike', [bkID,null], queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou o histórico de uma bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function createBike(req, res, next) {
  db.func('createBike',req.body.name,queryResult.one)
    .then(function () {
      res.status(200).json(response.success({}, 'Uma bike inserida'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function updateBike(req, res, next) {
  db.func('upd_bike',[parseInt(req.bod.id),req.body.name],queryResult.one)
    .then(function () {
      res.status(200).json(response.success({}, 'Atualizou uma bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function updateStation(req, res, next) {
  db.func('upd_bikeSt',[parseInt(req.param.bk),parseInt(req.param.st),parseInt(req.param.sl)],queryResult.one)
    .then(function () {
      res.status(200).json(response.success({}, 'Atualizou uma bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function removeBike(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('delBike',bkID, queryResult.one)
    .then(function (result) {
      res.status(200).json(response.success({}, 'Removeu 1 bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function removeBikes(req, res, next) {
  db.func('delBikes',undefined,queryResult.one)
    .then(function (result) {
      res.status(200).json(response.success({}, 'Removeu '+result.rowCount+' bikes'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function changeState(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('changeBikeState',bkID, queryResult.one)
    .then(function (result) {
      res.status(200).json(response.success({}, 'Mudou o estado de 1 bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
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
