-- TABELA DAS ESTAÇÕES
DROP TABLE IF EXISTS bike_station CASCADE;
CREATE TABLE bike_station (
	idStation SERIAL PRIMARY KEY,
	name VARCHAR(35) NOT NULL UNIQUE,
	password VARCHAR(150) NOT NULL,
	regDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	lat FLOAT DEFAULT -5.206798, 
	lon FLOAT DEFAULT -37.323969,
	state BOOLEAN DEFAULT FALSE
);

-- Tabela dos slots de cada estação
DROP TABLE IF EXISTS station_slot CASCADE;
CREATE TABLE station_slot (
	idStation INT REFERENCES bike_station(idStation) ON DELETE CASCADE,
	slot INT DEFAULT 0,
	state BOOLEAN DEFAULT FALSE, -- F = não funcional / T - funcional
	bike BOOLEAN DEFAULT FALSE, -- F = não tem bike / T - tem bike
	regDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP	
);

-- TABELA DO HISTÓRICO DA ESTAÇÃO
DROP TABLE IF EXISTS station_history CASCADE;
CREATE TABLE station_history (
	idLog SERIAL PRIMARY KEY,
	idStation INT REFERENCES bike_station(idStation) ON DELETE CASCADE,
	regDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	info VARCHAR(200),
	label CHAR DEFAULT 'U' -- U - UNKNOW / D - DADOS / L - DEV-EMP
);

-- FUNCTIONS

DROP FUNCTION IF EXISTS createBikeStation(bike_station.name%TYPE,bike_station.password%TYPE);
CREATE FUNCTION createBikeStation(bike_station.name%TYPE,bike_station.password%TYPE) -- nome da função
RETURNS VOID AS $$
BEGIN
	INSERT INTO bike_station (name, password) VALUES ($1,$2); --ação
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS changeStationState(bike_station.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION changeStationState(bike_station.idStation%TYPE)
RETURNS VOID AS $$
BEGIN
    UPDATE bike_station SET
    	state = (state = FALSE)
    WHERE idStation = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS upd_bike_station(bike_station.idStation%TYPE,bike_station.name%TYPE,bike_station.password%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION upd_bike_station(bike_station.idStation%TYPE,bike_station.name%TYPE,bike_station.password%TYPE)
RETURNS VOID AS $$
BEGIN
	UPDATE bike_station SET
		name = $2,
		password = $3
	WHERE idStation = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS assignslot(bike_station.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION assignslot(bike_station.idStation%TYPE)
RETURNS VOID AS $$
DECLARE
	slots_temp INT;
BEGIN
	SELECT COUNT(*) INTO slots_temp FROM station_slot WHERE idStation = $1;
	IF (slots_temp = 0) THEN
		INSERT INTO station_slot (idStation, slot) VALUES ($1,1);
	ELSE
		INSERT INTO station_slot (idStation, slot) VALUES ($1,slots_temp + 1);
	END IF;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS deassignslot(bike_station.idStation%TYPE,station_slot.slot%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION deassignslot(bike_station.idStation%TYPE,station_slot.slot%TYPE)
RETURNS VOID AS $$
DECLARE
	slot_temp station_slot%ROWTYPE;
	slots_temp INT;
BEGIN
	SELECT COUNT(*) INTO slots_temp FROM station_slot WHERE idStation = $1;
	SELECT * INTO slot_temp FROM station_slot WHERE idStation = $1 AND slot = $2;
	IF slot_temp IS NULL THEN
		RAISE EXCEPTION 'O slot de nº % não existe!',$2
			USING HINT = 'Por favor escolha um dos '|| slots_temp ||' slots existentes';
	ELSEIF slot_temp.bike THEN
		RAISE EXCEPTION 'O slot de nº % sendo utilizado!',$2
			USING HINT = 'Por favor escolha um slot vazio';
	END IF;
	DELETE FROM station_slot WHERE slot = slots_temp AND idStation = $1 AND slot = $2;
	UPDATE station_slot SET
		slot = slot - 1
	WHERE idStation = $1 AND slot > $2;
	IF $2 < slots_temp THEN
		PERFORM add_history_station($1,'Slots - Slots reordenados','D');
	END IF;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS upd_station_pos(bike_station.idStation%TYPE,bike_station.lat%TYPE,bike_station.lon%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION upd_station_pos(bike_station.idStation%TYPE,bike_station.lat%TYPE,bike_station.lon%TYPE)
RETURNS VOID AS $$
BEGIN
	UPDATE bike_station SET
		lat = $2,
		lon = $3
	WHERE idStation = $1;
END;
$$ LANGUAGE plpgsql;	

DROP FUNCTION IF EXISTS getStations() CASCADE;
CREATE OR REPLACE FUNCTION getStations()
RETURNS SETOF bike_station AS $$
BEGIN
	RETURN QUERY SELECT * FROM bike_station;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getStation(bike_station.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getStation(bike_station.idStation%TYPE)
RETURNS SETOF bike_station AS $$
BEGIN
	RETURN QUERY SELECT * FROM bike_station WHERE idStation = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getValSts() CASCADE;
CREATE OR REPLACE FUNCTION getValSts()
RETURNS SETOF bike_station AS $$
BEGIN
	RETURN QUERY SELECT * FROM bike_station WHERE state = TRUE;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getStsName() CASCADE;
CREATE OR REPLACE FUNCTION getStsName()
RETURNS SETOF bike_station.name%TYPE AS $$
BEGIN
	RETURN QUERY SELECT name FROM bike_station;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delStations() CASCADE;
CREATE OR REPLACE FUNCTION delStations()
RETURNS VOID AS $$
BEGIN
	DELETE FROM bike_station;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delStation(bike_station.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION delStation(bike_station.idStation%TYPE)
RETURNS VOID AS $$
BEGIN
	DELETE FROM bike_station WHERE idStation = $1;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS changeSlotUse(station_slot.idStation%TYPE,station_slot.slot%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION changeSlotUse(station_slot.idStation%TYPE,station_slot.slot%TYPE)
RETURNS VOID AS $$
BEGIN
    UPDATE station_slot SET
    	bike = (bike = FALSE)
    WHERE idStation = $1 AND slot = $2;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS changeSlotState(station_slot.idStation%TYPE,station_slot.slot%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION changeSlotState(station_slot.idStation%TYPE,station_slot.slot%TYPE)
RETURNS VOID AS $$
BEGIN
    UPDATE station_slot SET
    	state = (state = FALSE)
    WHERE idStation = $1 AND slot = $2;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getSlots(station_slot.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getSlots(station_slot.idStation%TYPE)
RETURNS SETOF station_slot AS $$
BEGIN
	RETURN QUERY SELECT * FROM station_slot WHERE idStation = $1;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS add_history_station(station_history.idStation%TYPE,station_history.info%TYPE,CHAR) CASCADE;
CREATE OR REPLACE FUNCTION add_history_station(station_history.idStation%TYPE,station_history.info%TYPE,CHAR)
RETURNS VOID AS $$
BEGIN
	INSERT INTO station_history (idStation, info,label) VALUES ($1, $2, $3);
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getHistsStation(CHAR) CASCADE;
CREATE OR REPLACE FUNCTION getHistsStation(CHAR)
RETURNS SETOF station_history AS $$
BEGIN
	IF $1 IS NOT NULL THEN
		RETURN QUERY SELECT * FROM station_history WHERE label = $1;
	END IF;
	RETURN QUERY SELECT * FROM station_history;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getHistStation(station_history.idStation%TYPE,CHAR) CASCADE;
CREATE OR REPLACE FUNCTION getHistStation(station_history.idStation%TYPE,CHAR)
RETURNS SETOF station_history AS $$
BEGIN
	IF $2 IS NOT NULL THEN
		RETURN QUERY SELECT * FROM station_history WHERE idStation = $1 AND label = $2;
	END IF;
	RETURN QUERY SELECT * FROM station_history WHERE idStation = $1;
END;
$$ LANGUAGE plpgsql;

-- trigger
DROP FUNCTION IF EXISTS stationReg() CASCADE; 
CREATE OR REPLACE FUNCTION stationReg() -- nome da função
RETURNS TRIGGER AS $stationReg$
BEGIN
	IF (TG_OP = 'INSERT') THEN
		PERFORM add_history_station(NEW.idStation,'Its Alive! - Estação criada','D'); --ação
		RETURN NEW;
	ELSEIF (TG_OP = 'UPDATE') THEN
		IF (OLD.state <> NEW.state) AND (NEW.state IS NOT NULL) AND (OLD.state IS NOT NULL) THEN
			IF (NEW.state) THEN
				PERFORM add_history_station(OLD.idStation,'Situação - Ativa','D');
			ELSE
				PERFORM add_history_station(OLD.idStation, 'Situação - Inativa','D');
			END IF;
		END IF;
		IF (OLD.name <> NEW.name) AND (NEW.name IS NOT NULL) AND (OLD.name IS NOT NULL) THEN
			PERFORM add_history_station(OLD.idStation,'Informações - Nome alterado de ' || OLD.name || ' para ' || NEW.name,'D');
		END IF;
		IF (OLD.password <> NEW.password) AND (NEW.password IS NOT NULL) AND (OLD.password IS NOT NULL) THEN
			PERFORM add_history_station(OLD.idStation,'Informações - password alterada','D');
		END IF;
		RETURN NEW;
	END IF;
	RETURN NULL;
END;
$stationReg$ LANGUAGE PLPGSQL; --linguagem SQL

DROP TRIGGER IF EXISTS station_log ON bike_station CASCADE; 
CREATE TRIGGER station_log 
AFTER INSERT OR UPDATE ON bike_station
FOR EACH ROW EXECUTE PROCEDURE stationReg();


DROP FUNCTION IF EXISTS slotReg() CASCADE; 
CREATE OR REPLACE FUNCTION slotReg() -- nome da função
RETURNS TRIGGER AS $slotReg$
BEGIN
	IF (TG_OP = 'DELETE') THEN
		PERFORM add_history_station(OLD.idStation,'Slots - ' || OLD.slot || 'º slot excluído','D');
	ELSEIF (TG_OP = 'INSERT') THEN
		PERFORM add_history_station(NEW.idStation,'Slots - ' || NEW.slot || 'º slot adicionado','D'); --ação
		RETURN NEW;
	ELSEIF (TG_OP = 'UPDATE') THEN
		IF (OLD.state <> NEW.state) AND (NEW.state IS NOT NULL) THEN
			IF (NEW.state) THEN
				PERFORM add_history_station(OLD.idStation,'Slots - '|| OLD.slot ||'º slot ativado','D');
			ELSE
				PERFORM add_history_station(OLD.idStation, 'Slots - '|| OLD.slot || 'º slot desativado','D');
			END IF;
		END IF;
		RETURN NEW;
	END IF;
	RETURN NULL;
END;
$slotReg$ LANGUAGE PLPGSQL; --linguagem SQL

DROP TRIGGER IF EXISTS slot_log ON station_slot CASCADE; 
CREATE TRIGGER slot_log 
AFTER INSERT OR UPDATE OR DELETE ON station_slot
FOR EACH ROW EXECUTE PROCEDURE slotReg();



-- AREA DE TESTES


-- BIKE STATION

-- SELECT createBikeStation(name, password)

SELECT createBikeStation('Aliada','xEqGAG');
SELECT createBikeStation('Olimpia','hbHevxu');
SELECT createBikeStation('Sang','hdCdj0ae');
SELECT createBikeStation('Milda','e8FADM4nzxf');

SELECT changeStationState(1);
SELECT changeStationState(2);
SELECT changeStationState(3);
SELECT changeStationState(4);

SELECT assignslot(1);
SELECT assignslot(1);
SELECT assignslot(1);
SELECT assignslot(1);
SELECT assignslot(2);
SELECT assignslot(2);
SELECT assignslot(2);
SELECT assignslot(2);
SELECT assignslot(3);
SELECT assignslot(3);
SELECT assignslot(3);
SELECT assignslot(3);
SELECT assignslot(4);
SELECT assignslot(4);
SELECT assignslot(4);
SELECT assignslot(4);

SELECT changeSlotState(1,1);
SELECT changeSlotState(1,2);
SELECT changeSlotState(1,3);
SELECT changeSlotState(1,4);

SELECT changeSlotState(2,1);
SELECT changeSlotState(2,2);
SELECT changeSlotState(2,3);
SELECT changeSlotState(2,4);

SELECT changeSlotState(3,1);
SELECT changeSlotState(3,2);
SELECT changeSlotState(3,3);
SELECT changeSlotState(3,4);

SELECT changeSlotState(4,1);
SELECT changeSlotState(4,2);
SELECT changeSlotState(4,3);
SELECT changeSlotState(4,4);


-- SELECT changeStationState(idStation);
-- SELECT upd_bike_station(idStation,name,password);

-- SELECT upd_station_pos(idStation,lat,lon); -- hoje nao rodrigo

-- SELECT * FROM getStation(idStation);
-- SELECT * FROM getStations();


-- STATION SLOT

-- SELECT getSlots(idStation);
-- SELECT assigslot(idStation);
-- SELECT deassigslot(idStation);
-- SELECT changeSlotState(idStation,slot);
-- SELECT changeSlotUse(idStation,slot);

-- STATION HISTORY

-- SELECT add_history_station(idStation,texto);

-- SELECT * FROM getHistsStation();
-- SELECT * FROM getHistStation(idStation);