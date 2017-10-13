var express = require('express');
var router = express.Router();

var db = require('../db/transactions');

router.get('/bk/:id', db.getLogBk);
router.get('/amount/bk/:id&:fin', db.getCountBk);
router.get('/st/:id', db.getLogSt);
router.get('/amount/st/:id&:fin', db.getCountSt);
router.get('/cli/:id', db.getLogCli);
router.get('/amount/cli/:id&:fin', db.getCountCli);

router.get('/loan/:cli&:bk&:st&:sl', db.doLoan);
router.get('/return/:cli&:bk&:st&:sl', db.doReturn);

router.get('/', db.getAllLogs);
// router.get('/amount', db.getCountAllLogs);
router.get('/amount/:fin', db.getCountAllLogs);



module.exports = router;