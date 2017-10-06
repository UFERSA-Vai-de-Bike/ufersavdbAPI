var express = require('express');
var router = express.Router();

var db = require('..db/loans');

router.get('/', db.getLoans);
router.get('/:id', db.getLoan);
router.post('/', db.createLoan);

module.exports = router;