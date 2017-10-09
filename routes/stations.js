var express = require('express');
var router = express.Router();

var db = require('../db/stations');

router.get('/', db.getStations);
router.get('/:id', db.getStation);
router.get('/state/:id', db.changeState);
router.get('/log/', db.getLogs);
router.get('/log/:id', db.getLog);

router.get('/slot_assign/:id', db.assignSlot);
router.get('/slot_deassign/:id', db.deassignSlot);
router.get('/slots/:id', db.getSlots);


router.post('/', db.createStation);
router.put('/:id', db.updateStation);

//router.delete('/:id', db.removeStation);



module.exports = router;
