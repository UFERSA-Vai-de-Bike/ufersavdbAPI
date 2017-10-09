var express = require('express');
var router = express.Router();

var db = require('../db/transactions');

router.get('/', db.getCountOutLogs);
router.get('/log', db.getOutLogs);
router.get('/logBike/:id', db.getOutLogBike);
router.get('/logSt/:id', db.getOutLogStation);
router.get('/logCli/:id', db.getOutLogCli);

router.post('/', db.doLoan);

module.exports = router;