var express = require('express');
var router = express.Router();

var db = require('../db/bikes');



router.get('/log', db.getBikeLogs);
router.get('/log/:id', db.getBikeLog);
router.get('/stationup/:idbk&:idst&:nslt', db.updateStation);
router.get('/station/:id', db.getBikesSt);
router.get('/station/on/:id', db.getBikesOnSt);
router.get('/station/off/:id', db.getBikesOffSt);
router.get('/state/:id', db.changeState);


router.get('/', db.getBikes);
router.get('/:id', db.getBike);
// router.get('/n/:name', db.getBikesByName);

router.post('/', db.createBike);
router.put('/:id', db.updateBike);
router.delete('/', db.removeBikes);
router.delete('/:id', db.removeBike);

module.exports = router;
