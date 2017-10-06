var express = require('express');
var router = express.Router();

var db = require('../db/users');

/* GET users listing. */
router.get('/', db.getUsers);
router.get('/:id', db.getUser);
router.post('/', db.createUser);
router.put('/:id', db.updateUser);
router.delete('/:id', db.removeUser);

module.exports = router;