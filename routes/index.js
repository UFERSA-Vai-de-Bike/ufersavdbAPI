var express = require('express');
var router = express.Router();

router.get('/',present);

function present(req, res, next) {
	res.send('UFERSA Vai de Bike API');
}

module.exports = router;