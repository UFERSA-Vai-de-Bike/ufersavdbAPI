DROP TABLE IF EXISTS vdb_log CASCADE;
CREATE TABLE vdb_log (
	idLog SERIAL PRIMARY KEY,
	idCli INT REFERENCES client_vdb(idCli),
	idBike INT REFERENCES bike (idBike),
	idStationOut INT REFERENCES bike_station(idStation),
	slotOut INT,
	idStationIn INT REFERENCES bike_station(idStation),
	slotIn INT,
	state BOOLEAN DEFAULT FALSE, -- FALSE = NÃO RECEBIDO
	regOutDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	regInDate TIMESTAMP
);

-- FUNCTIONS

DROP FUNCTION IF EXISTS open_vdb_log(vdb_log.idCli%TYPE,vdb_log.idBike%TYPE,bike_station.idStation%TYPE,station_slot.slot%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION open_vdb_log(vdb_log.idCli%TYPE,vdb_log.idBike%TYPE,bike_station.idStation%TYPE,station_slot.slot%TYPE)
RETURNS VOID AS $$
DECLARE
	cli_temp client_vdb%ROWTYPE;
	bk_temp bike%ROWTYPE;
	st_temp bike_station%ROWTYPE;
BEGIN
	SELECT * INTO cli_temp FROM client_vdb WHERE idCli = $1;
	SELECT * INTO bk_temp FROM bike WHERE idBike = $2;
	SELECT * INTO st_temp FROM bike_station WHERE idStation = 3;
	IF (cli_temp IS NOT NULL) AND (bk_temp IS NOT NULL) AND (st_temp IS NOT NULL) AND (cli_temp.state) AND (cli_temp.onBike = FALSE) AND (bk_temp.state) AND (st_temp.state) THEN
		INSERT INTO vdb_log (idCli,idBike,idStationOut,slotOut) VALUES ($1,$2,$3,$4);
	ELSE
		RAISE EXCEPTION 'Não foi possível realizar um empréstimo' USING HINT = 'Por favor, cheque os dados que estão sendo enviados';
	END IF;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS close_vdb_log(client_vdb.idCli%TYPE,bike.idBike%TYPE,bike_station.idStation%TYPE,station_slot.slot%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION close_vdb_log(client_vdb.idCli%TYPE,bike.idBike%TYPE,bike_station.idStation%TYPE,station_slot.slot%TYPE)
RETURNS VOID AS $$
DECLARE
	out_log vdb_log.idLog%TYPE;
BEGIN
	SELECT idLog INTO out_log FROM vdb_log WHERE idCli = $1 AND idBike = $2 AND state = FALSE;
	IF out_log IS NOT NULL THEN
		UPDATE vdb_log SET
			idStationIn = $3,
			slotIn = $4,
			state = TRUE,
			regInDate = CURRENT_TIMESTAMP
		WHERE idLog = out_log;
	ELSE
		RAISE EXCEPTION 'Não foi possível realizar uma devolução' USING HINT = 'Por favor, cheque os dados que estão sendo enviados';
	END IF;
END;
$$ LANGUAGE plpgsql;

DROP TYPE IF EXISTS dup_result CASCADE;
CREATE TYPE dup_result AS (total BIGINT, now BIGINT);
DROP FUNCTION IF EXISTS getCountAllLogs() CASCADE;
CREATE OR REPLACE FUNCTION getCountAllLogs()
RETURNS dup_result AS $$
DECLARE
	res dup_result%ROWTYPE;
BEGIN
	SELECT COUNT(*) INTO res.total FROM vdb_log;
	SELECT COUNT(*) INTO res.now FROM vdb_log WHERE state = FALSE;
	RETURN res;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getvdbLogs() CASCADE;
CREATE OR REPLACE FUNCTION getvdbLogs()
RETURNS TABLE(name_cli client_vdb.username%TYPE,name_bk bike.name%TYPE,reg_out vdb_log.regOutDate%TYPE,name_stOut bike_station.name%TYPE,slotOut station_slot.slot%TYPE,reg_in vdb_log.regInDate%TYPE,name_stIn bike_station.name%TYPE,slotIn station_slot.slot%TYPE,state vdb_log.state%TYPE) AS $$
BEGIN
	RETURN QUERY
	SELECT  cli.username,bk.name,log.regOutDate, st1.name, log.slotOut,log.regInDate,st2.name,log.slotIn,log.state
	FROM vdb_log AS log, client_vdb AS cli,bike AS bk,bike_station AS st1, bike_station AS st2
	WHERE log.idStationOut = st1.idStation AND log.idStationIn = st2.idStation AND log.idBike = bk.idBike AND log.idCli = cli.idCli;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS getvdbLogsSt(bike_station.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getvdbLogsSt(bike_station.idStation%TYPE)
RETURNS TABLE(name_cli client_vdb.username%TYPE,name_bk bike.name%TYPE,reg_out vdb_log.regOutDate%TYPE,name_stOut bike_station.name%TYPE,slotOut station_slot.slot%TYPE,reg_in vdb_log.regInDate%TYPE,name_stIn bike_station.name%TYPE,slotIn station_slot.slot%TYPE,state vdb_log.state%TYPE) AS $$
BEGIN
	RETURN QUERY
	SELECT  cli.username,bk.name,log.regOutDate, st1.name, log.slotOut,log.regInDate,st2.name,log.slotIn,log.state
	FROM vdb_log AS log, client_vdb AS cli,bike AS bk,bike_station AS st1, bike_station AS st2
	WHERE log.idStationOut = $1 OR log.idStationIn = $1 AND log.idStationOut = st1.idStation AND log.idStationIn = st2.idStation AND log.idBike = bk.idBike AND log.idCli = cli.idCli;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getvdbLogsBk(bike.idBike%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getvdbLogsBk(bike.idBike%TYPE)
RETURNS TABLE(name_cli client_vdb.username%TYPE,name_bk bike.name%TYPE,reg_out vdb_log.regOutDate%TYPE,name_stOut bike_station.name%TYPE,slotOut station_slot.slot%TYPE,reg_in vdb_log.regInDate%TYPE,name_stIn bike_station.name%TYPE,slotIn station_slot.slot%TYPE,state vdb_log.state%TYPE) AS $$
BEGIN
	RETURN QUERY
	SELECT  cli.username,bk.name,log.regOutDate, st1.name, log.slotOut,log.regInDate,st2.name,log.slotIn,log.state
	FROM vdb_log AS log, client_vdb AS cli,bike AS bk,bike_station AS st1, bike_station AS st2
	WHERE log.idBike = $1 AND log.idStationOut = st1.idStation AND log.idStationIn = st2.idStation AND log.idBike = bk.idBike AND log.idCli = cli.idCli;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getvdbLogsCli(client_vdb.idCli%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getvdbLogsCli(client_vdb.idCli%TYPE)
RETURNS TABLE(name_cli client_vdb.username%TYPE,name_bk bike.name%TYPE,reg_out vdb_log.regOutDate%TYPE,name_stOut bike_station.name%TYPE,slotOut station_slot.slot%TYPE,reg_in vdb_log.regInDate%TYPE,name_stIn bike_station.name%TYPE,slotIn station_slot.slot%TYPE,state vdb_log.state%TYPE) AS $$
BEGIN
	RETURN QUERY
	SELECT  cli.username,bk.name,log.regOutDate, st1.name, log.slotOut,log.regInDate,st2.name,log.slotIn,log.state
	FROM vdb_log AS log, client_vdb AS cli,bike AS bk,bike_station AS st1, bike_station AS st2
	WHERE log.idCli = $1 AND log.idStationOut = st1.idStation AND log.idStationIn = st2.idStation AND log.idBike = bk.idBike AND log.idCli = cli.idCli;
END;
$$ LANGUAGE plpgsql;

DROP TYPE IF EXISTS dup_resultST CASCADE;
CREATE TYPE dup_resultST AS (totalOut BIGINT, totalIn BIGINT, now BIGINT);
DROP FUNCTION IF EXISTS getCountAllLogsSt(bike_station.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getCountAllLogsSt(bike_station.idStation%TYPE)
RETURNS dup_resultST AS $$
DECLARE
	res dup_resultST%ROWTYPE;
BEGIN
	SELECT COUNT(*) INTO res.totalOut FROM vdb_log WHERE idStationOut = $1;
	SELECT COUNT(*) INTO res.totalIn FROM vdb_log WHERE idStationIn = $1;
	SELECT COUNT(*) INTO res.now FROM vdb_log WHERE idStationOut = $1 AND state = FALSE;
	RETURN res;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getCountAllLogsCli(client_vdb.idCli%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getCountAllLogsCli(client_vdb.idCli%TYPE)
RETURNS BIGINT AS $$
DECLARE
	total BIGINT;
BEGIN
	SELECT COUNT(*) INTO total FROM vdb_log WHERE idCli = $1;
	RETURN total;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getCountAllLogsBk(bike.idBike%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getCountAllLogsBk(bike.idBike%TYPE)
RETURNS BIGINT AS $$
DECLARE
	total BIGINT;
BEGIN
	SELECT COUNT(*) INTO total FROM vdb_log WHERE idBike = $1;
	RETURN total;
END;
$$ LANGUAGE plpgsql;


-- TRIGGER'S
DROP FUNCTION IF EXISTS LogReg() CASCADE;
CREATE OR REPLACE FUNCTION LogReg() -- nome da função
RETURNS TRIGGER AS $inLogReg$
DECLARE
	name_bike bike.name%TYPE;
	name_st bike_station.name%TYPE;
	name_cli client_vdb.username%TYPE;
BEGIN
	SELECT name INTO name_bike FROM bikes WHERE idBike = NEW.idBike;
	SELECT username INTO name_cli FROM client_vdb WHERE idCli = NEW.idCli;
	IF (TG_OP = 'INSERT') THEN
		PERFORM changeOnBike(NEW.idCli);
		PERFORM upd_bikeOut(NEW.idBike);
		PERFORM changeSlotUse(NEW.idStationOut,NEW.slotOut);
		SELECT name INTO name_st FROM bike_station WHERE idStation = NEW.idStationOut;
		PERFORM add_history_cli(NEW.idCli,'Vai de bike - Retirou a bicicleta ' || name_bike || ' do ' || NEW.slotOut || 'º slot da estação ' || name_st,'L');
		PERFORM add_history_bike(NEW.idBike,'Vai de bike - Retirada do ' || NEW.slotOut ||  'º slot da estação ' || name_st || ' pelo usuário ' || name_cli,'L');
		PERFORM add_history_station(NEW.idStationOut,'Vai de bike - Bicicleta ' || name_bike || ' retirada do ' || NEW.slotOut || 'º slot pelo usuário ' || name_cli,'L');
		RETURN NEW;
	ELSEIF (TG_OP = 'UPDATE') THEN
		PERFORM changeOnBike(OLD.idCli);
		PERFORM upd_bikeIn(OLD.idBike,NEW.idStationIn,NEW.slotIn);
		PERFORM changeSlotUse(NEW.idStationIn,NEW.slotIn);
		SELECT name INTO name_st FROM bike_station WHERE idStation = NEW.idStationIn;
		PERFORM add_history_cli(OLD.idCli,'Vai de bike - Entregou a bicicleta ' || name_bike || ' no ' || NEW.slotIn || 'º slot da estação ' || name_st,'L');
		PERFORM add_history_bike(OLD.idBike,'Vai de bike - Entregue no ' || NEW.slotIn ||  'º slot da estação ' || name_st || ' pelo usuário ' || name_cli,'L');
		PERFORM add_history_station(NEW.idStationIn,'Vai de bike - Bicicleta ' || name_bike || ' entregue no ' || NEW.slotIn || 'º slot pelo usuário ' || name_cli,'L');
		RETURN NEW;
	END IF;
END;
$inLogReg$ LANGUAGE PLPGSQL; --linguagem SQL

DROP TRIGGER IF EXISTS log_vdb ON vdb_log CASCADE;
CREATE TRIGGER log_vdb 
AFTER INSERT OR UPDATE ON vdb_log
FOR EACH ROW EXECUTE PROCEDURE LogReg();


-- AREA DE TESTES

-- SELECT add_in_log();
-- SELECT add_out_log();

-- SELECT getCountOutLogs();
-- SELECT * FROM getOutLogs();
-- SELECT * FROM getOutLogBike(idBike);
-- SELECT * FROM getOutLogCli(idCli);
-- SELECT * FROM getOutLogStation(idStation);

-- SELECT getCountInLogs();
-- SELECT * FROM getInLogs();
-- SELECT * FROM getInLogBike(idBike);
-- SELECT * FROM getInLogCli(idCli);
-- SELECT * FROM getInLogStation(idStation);