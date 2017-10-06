var express = require('express');
var router = express.Router();

var db = require('..db/stations');

router.get('/', db.getStations);
router.get('/:id', db.getStation);
router.post('/', db.createStation);
router.put('/:id', db.updateStation);
router.delete('/:id', db.removeStation);

module.exports = router;