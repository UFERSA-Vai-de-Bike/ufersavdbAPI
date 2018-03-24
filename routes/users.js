var express = require('express');
var router = express.Router();

var db = require('../db/users');

/* A ORDEM DA DECLARAÇÃO IMPORTA
*
* NÃO FAÇA:
* get('/:id,.....);
* get('/log/,.....);
*
* FAÇA:
* get('/log/,.....);
* get('/:id,.....);
* */

router.get('/sit/:id', db.changeSit);

router.get('/log', db.getUsersLog);
router.get('/log/:id', db.getUserLog);

router.get('/info', db.getInfos);
router.get('/info/:id', db.getInfo);
router.post('/info', db.updateUserInfo);

router.get('/', db.getUsers);
router.get('/val', db.getValUsers);
router.get('/n', db.getUserNames);
router.get('/:id', db.getUser);

router.post('/', db.createUser);
router.post('/login',db.login);
router.post('/signup',db.signup);
router.put('/', db.updateUser);
router.delete('/', db.removeUsers);
router.delete('/:id', db.removeUser);


module.exports = router;
