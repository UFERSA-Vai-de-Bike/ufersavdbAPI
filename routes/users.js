var express = require('express');
var router = express.Router();

var db = require('../db/users');

router.get('/', db.getUsers);
router.get('/:id', db.getUser);
router.get('/sit/:id', db.changeSit);

router.get('/info/', db.getInfos);
router.get('/info/:id', db.getInfo);
router.get('/log/', db.getLogs);
router.get('/log/:id', db.getLog);


router.post('/', db.createUser);
router.put('/:id', db.updateUser);
router.post('/info/:id', db.updateUserInfo);
router.delete('/:id', db.removeUser);
router.delete('/', db.removeUsers);



module.exports = router;