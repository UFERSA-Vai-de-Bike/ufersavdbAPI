var promise = require('bluebird');
var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgresql://postgres:admin@localhost:5432/ufersavdb_1';
var db = pgp(connectionString);

// add query functions

/*

-- SELECT createBike(name);
-- SELECT * FROM getBike(idBike);
-- SELECT * FROM getBikes();

-- SELECT changeBikeState(idBike);
-- SELECT changeOnRide(idBike);

-- SELECT upd_bike(idBike,name);
-- SELECT upd_bikeSt(idBike,idStation);

-- SELECT add_history_bike(idBike,texto)
-- SELECT * FROM getHistsBike();
-- SELECT * FROM getHistBike(idBike);

*/

module.exports = {
  getBikes: getBikes,
  getBike: getBike,
  getLogs: getLogs,
  getLog: getLog,
  changeState: changeState,
  updateStation: updateStation,
  createBike: createBike,
  updateBike: updateBike,
  removeBike: removeBike
};
