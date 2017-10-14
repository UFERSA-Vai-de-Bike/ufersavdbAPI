var express = require('express');
var router = express.Router();

var db = require('../db/transactions');

router.get('/bk/:id', db.getLogBk);
router.get('/amount/bk/:id', db.getCountBk);
router.get('/st/:id', db.getLogSt);
router.get('/amount/st/:id', db.getCountSt);
router.get('/cli/:id', db.getLogCli);
router.get('/amount/cli/:id', db.getCountCli);

router.get('/loan/:cli&:bk&:st&:sl', db.doLoan);
router.get('/return/:cli&:bk&:st&:sl', db.doReturn);

router.get('/', db.getAllLogs);
router.get('/amount', db.getCountAllLogs);



module.exports = router;
