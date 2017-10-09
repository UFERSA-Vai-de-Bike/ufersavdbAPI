var express = require('express');
var router = express.Router();

var db = require('../db/transactions');

router.get('/', db.getCountInLogs);
router.get('/log', db.getInLogs);
router.get('/logBk/:id', db.getInLogBike);
router.get('/logSt/:id', db.getInLogStation);
router.get('/logCli/:id', db.getInLogCli);

router.post('/', db.doReturn);

module.exports = router;