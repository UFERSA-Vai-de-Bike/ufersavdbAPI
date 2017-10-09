var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgresql://postgres:admin@localhost:5432/ufersa_vdb_1';
var db = pgp(connectionString);

// add query functions

var queryResult =  {
    one: 1,
    many: 2,
    none: 4,
    any: 6
}
/*
-- SELECT createClient(role,name,senha);
-- SELECT * FROM getClients();
-- SELECT * FROM getClient(idCli);

-- SELECT changeSit(idCli);

-- INFO CLIENTE

-- SELECT upd_info_cli(idCli,fullName,email,contato,ocupacao,sexo,dataNasc);
-- SELECT * FROM getInfosCli();
-- SELECT * FROM getInfoCli(idCli);

-- HISTORY CLIENT

-- SELECT add_history_cli(idCli,texto);
-- SELECT * FROM getHistsCli();
-- SELECT * FROM getHistCli(idCli);

*/

function getUsers(req, res, next) {

  db.func('getClients')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorna todos os usuários'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getClient', userID, queryResult.one)
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
}

function createUser(req, res, next) {
  req.body.role = parseInt(req.body.role);
  db.func('createUser',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Um usuário inserido'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function updateUser(req, res, next) {
  db.none('update users set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// function removeUser(req, res, next) {
//   var userID = parseInt(req.params.id);
//   db.result('delete from users where id = $1', userID)
//     .then(function (result) {
//       /* jshint ignore:start */
//       res.status(200)
//         .json({
//           status: 'success',
//           message: `Removed ${result.rowCount} user`
//         });
//       /* jshint ignore:end */
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  // changeSit: changeSit,
  // getInfos: getInfos,
  // getInfo: getInfo,
  // getLogs: getLogs,
  // getLog: getLog,
  createUser: createUser,
  updateUser: updateUser/*,
  updateUserInfo: updateUserInfo,
  removeUser: removeUser*/
};