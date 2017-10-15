var connector = require('./connector');

var db = connector.db;
var queryResult = connector.queryResult;

// add query functions

function login(req, res, next) {
    db.func('getClientLogin',[req.body.username,req.body.password], queryResult.one)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Login de usuario ' + req.body.username + ' efetuado'
                });
        })
        .catch(function (err) {
            res.status(401)
                .json({
                    status: 'not authorized',
                    data: err,
                    message: 'Usuário ou senha inválidos'
                })
        });
}

function signup(req, res, next) {
    db.func('signUpClient',
        [req.body.username,req.body.password,req.body.fullname,req.body.email,req.body.phone,
            req.body.profession,req.body.sex,req.body.birthdate],queryResult.one)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Um usuário cadastrado'
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

function getUsers(req, res, next) {
  db.func('getClients',undefined,queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou todos os usuários'
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

function getValUsers(req, res, next) {
    db.func('getValCli',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retornou o id e nome de usuários válidos'
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

function getUserNames(req, res, next) {
    db.func('getClientsUserName', undefined, queryResult.many)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retornou o nome de todos os usuários'
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

function getUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getClient', userID, queryResult.one)
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
}

function getInfos(req, res, next) {
  db.func('getInfosCli',undefined, queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou as informações de todos os usuários'
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

function getInfo(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getInfoCli', userID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou as informações de um usuário'
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

function getLogs(req, res, next) {
  db.func('getHistsCli',null, queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou o histórico de todos os usuários'
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

function getLog(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getHistCli',[userID,null], queryResult.many)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retornou o histórico de um usuário'
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

function createUser(req, res, next) {
  db.func('createClient',
    [parseInt(req.body.role),req.body.username,req.body.senha],queryResult.one)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Um usuário inserido'
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
function updateUser(req, res, next) {
  db.func('upd_cli',[parseInt(req.body.id),parseInt(req.body.role),req.body.username,req.body.senha],queryResult.one)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Atualizou um usuário'
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

function updateUserInfo(req, res, next) {
  db.func('upd_info_cli',[parseInt(req.body.id),parseInt(req.body.role),req.body.username,req.body.senha],queryResult.one)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Atualizou as informações de um usuário'
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

function removeUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('delClients',userID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removeu um usuário'
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

function removeUsers(req, res, next) {
  db.func('delClients',undefined,queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removeu ${result.rowCount} usuários'
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

function changeSit(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('changeSit',userID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Mudou a situação de um usuário'
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
    login: login, // feito
    signup: signup, // feito
  getUsers: getUsers, // feito
    getValUsers: getValUsers, // feito
  getUser: getUser, // feito
    getUserNames: getUserNames, // feito
  changeSit: changeSit, // feito
  getInfos: getInfos, // feito
  getInfo: getInfo, // feito
  getUsersLog: getLogs, // feito
  getUserLog: getLog, // feito
  createUser: createUser, // feito
  updateUser: updateUser, // feito
  updateUserInfo: updateUserInfo, // feito
  removeUser: removeUser, // feito
  removeUsers: removeUsers // feito
};
