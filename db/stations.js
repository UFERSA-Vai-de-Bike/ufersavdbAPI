var connector = require('./connector');

var db = connector.db;
var queryResult = connector.queryResult;


function getStations(req, res, next) {
  db.func('getStations',undefined,queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: "Retornou todas as estações"
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
}

function getStationsName(req, res, next) {
    db.func('getStsName',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: "Retornou o nome de todas as estações"
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
}
function getValSts(req, res, next) {
    db.func('getValSts',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retornou as estações válidas'
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
}

function getStation(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getStation', stID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou uma estação'
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

function getStationLogs(req, res, next) {
  db.func('getHistsStation',null,queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou o histórico de todas as estações'
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
}

function getStationLog(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getHistStation', [stID,null], queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou o histórico de uma estação'
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
}

function createStation(req, res, next) {
  db.func('createBikeStation',[req.body.name,req.body.senha])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Uma estação inserida'
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
}

function updateStation(req, res, next) {
  db.func('upd_bike_station',[parseInt(req.bod.id),req.body.name,req.body.senha],queryResult.one)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Atualizou uma estação'
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
}

function removeStations(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('delStations',stID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removeu 1 estação'
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
}

function removeStation(req, res, next) {
  db.func('delStation',undefined,queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removeu ${result.rowCount} estações'
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
}

function changeStationState(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('changeStationState',stID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Mudou o estado de 1 estação'
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
}
function assignSlot(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('assignSlot',stID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Adicionou 1 slot a uma estação'
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
}
function deassignSlot(req, res, next) {
  var stID = parseInt(req.params.st);
  var sl = parseInt(req.params.sl);
  db.func('deassignSlot',[stID,sl], queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removeu o '+ sl +'º slot de uma estação'
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
}

function changeSlotState(req, res, next) {
    var stID = parseInt(req.params.st);
    var sl = parseInt(req.params.sl);
    db.func('changeSlotState',[stID,sl], queryResult.one)
        .then(function (result) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Alterou o estado do '+ sl +'º slot de uma estação'
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
}

function getSlots(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getSlots',stID, queryResult.many)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
            data: result,
          message: 'Retornou os slots de uma estação'
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
}

module.exports = {
  getStations: getStations, // feito
    getStationsName: getStationsName, // feito
    getValSts: getValSts,
  getStation: getStation, // feito
  changeStationState: changeStationState, // feito
  getStationLogs: getStationLogs, // feito mas não funciona
  getStationLog: getStationLog, // feito
  assignSlot: assignSlot, // feito
  deassignSlot: deassignSlot, // feito
    changeSlotState: changeSlotState, // feito
  getSlots: getSlots, // feito
  createStation: createStation, // feito
  updateStation: updateStation, // feito
  removeStations: removeStations, // feito
  removeStation: removeStation // feito
};
