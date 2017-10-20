var connector = require('./connector');
var response = require('../response');

var db = connector.db;
var queryResult = connector.queryResult;

// add query functions

function login(req, res, next) {
    db.func('getClientLogin',[req.body.username,req.body.password], queryResult.one)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Login de usuario ' + req.body.username + ' efetuado'));
        })
        .catch(function (err) {
            res.status(401)
                .json(response.failure(err, 'Usuário ou password inválidos'));
        });
}

function signup(req, res, next) {
    db.func('signUpClient',
        [req.body.username,req.body.password,req.body.fullname,req.body.email,req.body.phone,
            req.body.profession,req.body.sex,req.body.birthdate],queryResult.any)
        .then(function () {
            res.status(200)
                .json(response.success({}, 'Um usuário cadastrado'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function getUsers(req, res, next) {
  db.func('getClients',undefined,queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou todos os usuários'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function getValUsers(req, res, next) {
    db.func('getValCli',undefined,queryResult.many)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o id e nome de usuários válidos'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function getUserNames(req, res, next) {
    db.func('getClientsUserName', undefined, queryResult.many)
        .then(function (data) {
            res.status(200)
                .json(response.success(data, 'Retornou o nome de todos os usuários'));
        })
        .catch(function (err) {
            res.status(500).json(response.failure(err));
        });
}

function getUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getClient', userID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou um usuário'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function getInfos(req, res, next) {
  db.func('getInfosCli',undefined, queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou as informações de todos os usuários'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function getInfo(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getInfoCli', userID, queryResult.one)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou as informações de um usuário'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function getLogs(req, res, next) {
  db.func('getHistsCli',null, queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou o histórico de todos os usuários'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function getLog(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('getHistCli',[userID,null], queryResult.many)
    .then(function (data) {
      res.status(200)
        .json(response.success(data, 'Retornou o histórico de um usuário'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function createUser(req, res, next) {
  db.func('createClient',
    [parseInt(req.body.role),req.body.username,req.body.password],queryResult.one)
    .then(function () {
      res.status(200)
        .json(response.success({}, 'Um usuário inserido'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}
function updateUser(req, res, next) {
    // PADRONIZAR ID PARA IDCLI PARA DAR MATCH COM O BANCO
  db.func('upd_cli',[parseInt(req.body.idcli),parseInt(req.body.role),req.body.username,req.body.password],queryResult.one)
    .then(function () {
      res.status(200)
        .json(response.success({}, 'Atualizou um usuário'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function updateUserInfo(req, res, next) {
  db.func('upd_info_cli',[parseInt(req.body.id),parseInt(req.body.role),req.body.username,req.body.password],queryResult.one)
    .then(function () {
      res.status(200)
        .json(response.success({}, 'Atualizou as informações de um usuário'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function removeUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('delClient',userID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json(response.success({}, 'Removeu um usuário'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function removeUsers(req, res, next) {
  db.func('delClients',undefined,queryResult.one)
    .then(function (result) {
      res.status(200)
        .json(response.success({}, 'Removeu '+result.rowCount+' usuários'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
    });
}

function changeSit(req, res, next) {
  var userID = parseInt(req.params.id);
  db.func('changeSit',userID, queryResult.one)
    .then(function (result) {
      res.status(200)
        .json(response.success({}, 'Mudou a situação de um usuário'));
    })
    .catch(function (err) {
        res.status(500).json(response.failure(err));
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
