var express = require('express');
var router = express.Router();

var db = require('../db/bikes');

router.get('/', db.getBikes);
router.get('/:id', db.getBike);
router.get('/log', db.getLogs);
router.get('/log/:id', db.getLog);
router.get('/state/:id', db.changeState);
router.get('/station/:idb&:ids&:ns', db.updateStation);


router.post('/', db.createBike);
router.put('/:id', db.updateBike);
//router.delete('/:id', db.removeBike);

module.exports = router;
