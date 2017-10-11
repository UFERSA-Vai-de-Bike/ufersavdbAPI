var express = require('express');
var router = express.Router();

var db = require('../db/transactions');

router.get('/log', db.getOutLogs);
router.get('/logBike/:id', db.getOutLogBike);
router.get('/logSt/:id', db.getOutLogStation);
router.get('/logCli/:id', db.getOutLogCli);

router.get('/', db.getCountOutLogs);

router.post('/', db.doLoan);

module.exports = router;