var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgresql://postgres:admin@localhost:5432/ufersavdb_1';
var db = pgp(connectionString);

// add query functions

/*

-- SELECT createBikeStation(name, senha)
-- SELECT changeStationState(idStation);
-- SELECT upd_bike_station(idStation,name,senha);

-- SELECT upd_station_pos(idStation,lat,lon); -- hoje nao rodrigo

-- SELECT * FROM getStation(idStation);
-- SELECT * FROM getStations();


-- STATION SLOT

-- SELECT getSlots(idStation);
-- SELECT assignSlot(idStation);
-- SELECT deassignSlot(idStation);
-- SELECT changeSlotState(idStation,nSlot,idBike);

-- STATION HISTORY

-- SELECT add_history_station(idStation,texto);

-- SELECT * FROM getHistsStation();
-- SELECT * FROM getHistStation(idStation);

*/

module.exports = {
  getStations: getStations,
  getStation: getStation,
  changeState: changeState,
  getLogs: getLogs,
  getLog: getLog,
  assignSlot: assignSlot,
  deassignSlot: deassignSlot,
  getSlots: getSlots,
  createStation: createStation,
  updateStation: updateStation/*,
  removeStation: removeStation*/
};