const connector = require('./connector');
const response = require('../response');

const db = connector.db;
const queryResult = connector.queryResult;

// add query functions

function getBikes(req, res, next) {
  return db.func('getBikes',undefined,queryResult.any)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as bikes'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function getOnRideBikes(req, res, next) {
  return db.func('getOnRideBikes',undefined,queryResult.any)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as bikes cedidas'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}
function getBikesName(req, res, next) {
    return db.func('getBksName',undefined,queryResult.any)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o nome de todas as bikes'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}
function getValBks(req, res, next) {
    return db.func('getOpBikes',undefined,queryResult.any)
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
  return db.func('getBike', bkID, queryResult.one)
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
  return db.func('getBikesSt',parseInt(req.params.id),queryResult.any)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as bikes da estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}
function getBikesOnSt(req, res, next) {
  return db.func('getBikesOnSt',parseInt(req.params.id),queryResult.any)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as bikes que estão na estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}
function getBikesOffSt(req, res, next) {
  return db.func('getBikesOffSt',parseInt(req.params.id),queryResult.any)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as bikes que sairam da estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function getLogs(req, res, next) {
    return db.func('getHistsBike', null, queryResult.any)
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
  return db.func('getHistBike', [bkID,null], queryResult.any)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou o histórico de uma bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function createBike(req, res, next) {
  return db.func('createBike',req.body.name,queryResult.one)
    .then(function () {
      res.status(200).json(response.success({}, 'Uma bike inserida'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function updateBike(req, res, next) {
  return db.func('upd_bike',[parseInt(req.body.idbike),req.body.name,req.body.state],queryResult.any)
    .then(function () {
      res.status(200).json(response.success({}, 'Atualizou uma bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function updateStation(req, res, next) {
  return db.func('upd_bikeSt',[parseInt(req.params.bk),parseInt(req.params.st),parseInt(req.params.sl)],queryResult.one)
    .then(function () {
      res.status(200).json(response.success({}, 'Atualizou a estação de uma bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function removeBike(req, res, next) {
  var bkID = parseInt(req.params.id);
  return db.func('delBike',bkID, queryResult.one)
    .then(function (result) {
      res.status(200).json(response.success({}, 'Removeu uma bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function removeBikes(req, res, next) {
  return db.func('delBikes',undefined,queryResult.one)
    .then(function (result) {
      res.status(200).json(response.success({}, 'Removeu '+result.rowCount+' bikes'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function changeState(req, res, next) {
  var bkID = parseInt(req.params.id);
  return db.func('changeBikeState',bkID, queryResult.one)
    .then(function (result) {
      res.status(200).json(response.success({}, 'Mudou o estado de 1 bike'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

module.exports = {
    getBikes: getBikes, // feito
    getOnRideBikes: getOnRideBikes, // feito
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
