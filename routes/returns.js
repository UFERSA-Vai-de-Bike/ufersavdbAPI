var express = require('express');
var router = express.Router();

var db = require('..db/returns');

router.get('/', db.getReturns);
router.get('/:id', db.getReturn);
router.post('/', db.createReturn);

module.exports = router;