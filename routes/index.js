const express = require('express');
const router = express.Router();

router.get('/',present);

function present(req, res, next) {
	res.send('UFERSA Vai de Bike API');
}

module.exports = router;