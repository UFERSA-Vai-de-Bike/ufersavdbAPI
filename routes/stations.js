const express = require('express');
const router = express.Router();

const db = require('../db/stations');

/* A ORDEM DA DECLARAÇÃO IMPORTA
 *
 * NÃO FAÇA:
 * get('/:id,.....);
 * get('/log/,.....);
 *
 * FAÇA:
 * get('/log/,.....);
 * get('/:id,.....);
 * */

router.get('/sit/:id', db.changeStationState);

router.get('/log', db.getStationLogs);
router.get('/log/:id', db.getStationLog);


router.get('/slots/:id', db.getSlots);
router.get('/slot_assign/:id', db.assignSlot);
router.get('/slot_deassign/:st&:sl', db.deassignSlot);
router.get('/slot_state/:st&:sl', db.changeSlotState);

router.get('/', db.getStations);
router.get('/n', db.getStationsName);
router.get('/val', db.getValSts);
router.get('/:id', db.getStation);

router.post('/', db.createStation);
router.put('/', db.updateStation);
router.delete('/', db.removeStations);
router.delete('/:id', db.removeStation);

module.exports = router;
