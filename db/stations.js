var connector = require('./connector');
var response = require('../response');

var db = connector.db;
var queryResult = connector.queryResult;


function getStations(req, res, next) {
  db.func('getStations',undefined,queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todas as estações'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function getStationsName(req, res, next) {
    db.func('getStsName',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o nome de todas as estações'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}
function getValSts(req, res, next) {
    db.func('getValSts',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou as estações válidas'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function getStation(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getStation', stID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou uma estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function getStationLogs(req, res, next) {
  db.func('getHistsStation',null,queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou o histórico de todas as estações'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function getStationLog(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getHistStation', [stID,null], queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou o histórico de uma estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function createStation(req, res, next) {
  db.func('createBikeStation',[req.body.name,req.body.password,req.body.lat,req.body.lon])
    .then(function () {
      res.status(200)
        .json(response.success({}, 'Uma estação inserida'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function updateStation(req, res, next) {
  db.func('upd_bike_station',[parseInt(req.bod.id),req.body.name,req.body.password,req.body.lat,req.body.lon],queryResult.one)
    .then(function () {
      res.status(200)
        .json(response.success({}, 'Atualizou uma estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function removeStations(req, res, next) {
  db.func('delStations',undefined, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json(response.success({}, 'Removeu 1 estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function removeStation(req, res, next) {
    var stID = parseInt(req.params.id);
  db.func('delStation',stID,queryResult.one)
    .then(function (result) {
      res.status(200)
        .json(response.success({}, 'Removeu '+result.rowCount+' estações'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function changeStationState(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('changeStationState',stID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json(response.success({}, 'Mudou o estado de 1 estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}
function assignSlot(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('assignSlot',stID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json(response.success({}, 'Adicionou 1 slot a uma estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}
function deassignSlot(req, res, next) {
  var stID = parseInt(req.params.st);
  var sl = parseInt(req.params.sl);
  db.func('deassignSlot',[stID,sl], queryResult.one)
    .then(function (result) {
      res.status(200)
        .json(response.success({}, 'Removeu o '+ sl +'º slot de uma estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
    });
}

function changeSlotState(req, res, next) {
    var stID = parseInt(req.params.st);
    var sl = parseInt(req.params.sl);
    db.func('changeSlotState',[stID,sl], queryResult.one)
        .then(function (result) {
            res.status(200)
                .json(response.success({}, 'Alterou o estado do '+ sl +'º slot de uma estação'));
        })
        .catch(function (err) {
          res.status(500).json(response.failure(err));
        });
}

function getSlots(req, res, next) {
  var stID = parseInt(req.params.id);
  db.func('getSlots',stID, queryResult.many)
    .then(function (result) {
      res.status(200)
        .json(response.success(result, 'Retornou os slots de uma estação'));
    })
    .catch(function (err) {
      res.status(500).json(response.failure(err));
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
