var connector = require('./connector');

var db = connector.db;
var queryResult = connector.queryResult;

// add query functions

function getBikes(req, res, next) {
  db.func('getBikes')
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
    console.log(" função getlogs de bikes chamada");
  db.func('getHistsBike')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna o histórico de todas as bikes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getLog(req, res, next) {
    console.log(" função getlogs de bikes chamada");
  var bkID = parseInt(req.params.id);
  db.func('getHistBike', bkID, queryResult.many)
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
  db.func('createBike',
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
/*function createBike(req, res, next) {
  db.func('createBike',req.body.name)
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
function updateBike(req, res, next) {
  req.body.id = parseInt(req.body.id);
  db.func('upd_bike',req.body)
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
/*function updateBike(req, res, next) {
  db.func('upd_bike',[parseInt(req.bod.id),req.body.name])
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
}*/

function updateStation(req, res, next) {
  req.param.idbk = parseInt(req.param.idbk);
  req.param.idst = parseInt(req.param.idst);
  req.param.nslt = parseInt(req.param.nslt);
  db.func('upd_bikeSt',req.params)
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

/*function updateStation(req, res, next) {
  db.func('upd_bikeSt',[parseInt(req.param.idbk),parseInt(req.param.idst),parseInt(req.param.nslt)])
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
}*/

function removeBikes(req, res, next) {
  var bkID = parseInt(req.params.id);
  db.func('delBikes',bkID, queryResult.none)
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
  db.func('delBike')
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
  db.func('changeBikeState',bkID, queryResult.none)
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
