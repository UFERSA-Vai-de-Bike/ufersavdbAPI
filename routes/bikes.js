var express = require('express');
var router = express.Router();

var db = require('../db/bikes');



router.get('/log', db.getBikeLogs);
router.get('/log/:id', db.getBikeLog);
router.get('/station_up/:bk&:st&:sl', db.updateStation);
router.get('/station_on/:id', db.getBikesOnSt);
router.get('/station_off/:id', db.getBikesOffSt);
router.get('/station/:id', db.getBikesSt);
router.get('/sit/:id', db.changeState);


router.get('/', db.getBikes);
router.get('/n', db.getBikesName);
router.get('/val', db.getValBks);
router.get('/:id', db.getBike);

router.post('/', db.createBike);
router.put('/:id', db.updateBike);
router.delete('/', db.removeBikes);
router.delete('/:id', db.removeBike);

module.exports = router;
