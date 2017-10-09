var express = require('express');
var router = express.Router();

var db = require('../db/users');

router.get('/',present);


router.post('/login',db.login);

function present(req, res, next) {
	res.send('UFERSA Vai de Bike API');
}

module.exports = router;