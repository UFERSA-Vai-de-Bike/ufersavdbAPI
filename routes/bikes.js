var express = require('express');
var router = express.Router();

var db = require('..db/bikes');

router.get('/', db.getBikes);
router.get('/:id', db.getBike);
router.post('/', db.createBike);
router.put('/:id', db.updateBike);
router.delete('/:id', db.removeBike);

module.exports = router;