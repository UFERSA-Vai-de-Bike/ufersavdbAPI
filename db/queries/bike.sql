-- Tabela das bike

-- TABELA DAS BIKES
DROP TABLE IF EXISTS bike CASCADE;
CREATE TABLE bike (
	idBike SERIAL PRIMARY KEY,
	idStation INT REFERENCES bike_station(idStation),
	name VARCHAR(30) NOT NULL UNIQUE,
	regDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	lat FLOAT DEFAULT -5.206798, 
	lon FLOAT DEFAULT -37.323969,
	slot INT DEFAULT 0,
	state BOOLEAN DEFAULT FALSE, -- OPERACIONAL OU NÃO
	onRide BOOLEAN DEFAULT FALSE
);

-- TABELA DO HISTÓRICO DAS BICICLETAS
DROP TABLE IF EXISTS bike_history CASCADE;
CREATE TABLE bike_history (
	idLog SERIAL PRIMARY KEY,
	idBike INT REFERENCES bike(idBike) ON DELETE CASCADE,
	regDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	info VARCHAR(200),
	label CHAR DEFAULT 'U'
);


-- FUNCTIONS
-- FEITO
DROP FUNCTION IF EXISTS createBike(bike.name%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION createBike(bike.name%TYPE) -- nome da função
RETURNS VOID AS $$
BEGIN
	INSERT INTO bike (name) VALUES ($1);
END;
$$ LANGUAGE plpgsql; --linguagem SQL

-- FEITO
DROP FUNCTION IF EXISTS changeBikeState(bike.idBike%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION changeBikeState(bike.idBike%TYPE)
RETURNS VOID AS $$
BEGIN
    UPDATE bike SET
    	state = (state = FALSE)
    WHERE idBike = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delBikes() CASCADE;
CREATE OR REPLACE FUNCTION delBikes()
RETURNS VOID AS $$
BEGIN
	DELETE FROM bike;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delBike(bike.idBike%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION delBike(bike.idBike%TYPE)
RETURNS VOID AS $$
BEGIN
	DELETE FROM bike WHERE idBike = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS upd_bike(bike.idBike%TYPE,VARCHAR(30)) CASCADE;
CREATE OR REPLACE FUNCTION upd_bike(bike.idBike%TYPE, VARCHAR(30))
RETURNS VOID AS $$
BEGIN
	UPDATE bike SET
		name = $2
	WHERE idBike = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS upd_bikeSt(bike.idBike%TYPE,bike.idStation%TYPE,bike.slot%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION upd_bikeSt(bike.idBike%TYPE,bike.idStation%TYPE,bike.slot%TYPE)
RETURNS VOID AS $$
DECLARE
	bk_temp bike%ROWTYPE;
BEGIN
	SELECT * INTO bk_temp FROM bike WHERE idBike = $1;
	IF bk_temp IS NULL THEN
		RAISE EXCEPTION 'Não existe essa bicicleta' USING HINT = 'Tente adicionar essa bicicleta';
	END IF;
	PERFORM changeSlotUse($2,$3);
	UPDATE bike SET
		idStation = $2,
		slot = $3,
		state = TRUE
	WHERE idBike = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS upd_bikeIn(bike.idBike%TYPE,bike.idStation%TYPE,bike.slot%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION upd_bikeIn(bike.idBike%TYPE,bike.idStation%TYPE,bike.slot%TYPE)
RETURNS VOID AS $$
BEGIN
	UPDATE bike SET
		idStation = $2,
		slot = $3,
		onRide = FALSE
	WHERE idBike = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS upd_bikeOut(bike.idBike%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION upd_bikeOut(bike.idBike%TYPE)
RETURNS VOID AS $$
BEGIN
    UPDATE bike SET
    	onRide = TRUE
    WHERE idBike = $1;
END;
$$ LANGUAGE plpgsql;



DROP FUNCTION IF EXISTS upd_bike_pos(bike.idBike%TYPE,bike.lat%TYPE,bike.lon%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION upd_bike_pos(bike.idBike%TYPE,bike.lat%TYPE,bike.lon%TYPE)
RETURNS VOID AS $$
BEGIN
	UPDATE bike SET
		lat = $2,
		lon = $3
	WHERE idBike = $1;
END;
$$ LANGUAGE plpgsql;	

DROP FUNCTION IF EXISTS getBikes() CASCADE;
CREATE OR REPLACE FUNCTION getBikes()
RETURNS SETOF bike AS $$
BEGIN
	RETURN QUERY SELECT * FROM bike;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getBksName() CASCADE;
CREATE OR REPLACE FUNCTION getBksName()
RETURNS SETOF bike.name%TYPE AS $$
BEGIN
	RETURN QUERY SELECT name FROM bike;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getBike(bike.idBike%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getBike(bike.idBike%TYPE)
RETURNS SETOF bike AS $$
BEGIN
	RETURN QUERY SELECT * FROM bike WHERE idBike = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getOpBikes() CASCADE;
CREATE OR REPLACE FUNCTION getOpBikes()
RETURNS SETOF bike AS $$
BEGIN
	RETURN QUERY SELECT * FROM bike WHERE state = TRUE AND onRide = FALSE;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getBikesOnSt(bike.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getBikesOnSt(INT)
RETURNS SETOF bike AS $$
BEGIN
	RETURN QUERY SELECT * FROM bike WHERE idStation = $1 AND onRide = FALSE;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getBikesOffSt(bike.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getBikesOffSt(bike.idStation%TYPE)
RETURNS SETOF bike AS $$
BEGIN
	RETURN QUERY SELECT * FROM bike WHERE idStation = $1 AND onRide = TRUE;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS getBikesSt(bike.idStation%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getBikesSt(bike.idStation%TYPE)
RETURNS SETOF bike AS $$
BEGIN
	RETURN QUERY SELECT * FROM bike WHERE idStation = $1;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION IF EXISTS add_history_bike(bike_history.idBike%TYPE,bike_history.info%TYPE,bike_history.label%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION add_history_bike(bike_history.idBike%TYPE,bike_history.info%TYPE,bike_history.label%TYPE)
RETURNS VOID AS $$
BEGIN
	INSERT INTO bike_history (idBike, info, label) VALUES ($1, $2, $3);
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getHistsBike(CHAR) CASCADE;
CREATE OR REPLACE FUNCTION getHistsBike(CHAR)
RETURNS SETOF bike_history AS $$
BEGIN
	IF $1 IS NOT NULL THEN
		RETURN QUERY SELECT * FROM bike_history WHERE label = $1;
	END IF;
	RETURN QUERY SELECT * FROM bike_history;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getHistBike(bike_history.idBike%TYPE,CHAR) CASCADE;
CREATE OR REPLACE FUNCTION getHistBike(bike_history.idBike%TYPE,CHAR)
RETURNS SETOF bike_history AS $$
BEGIN
	IF $2 IS NOT NULL THEN
		RETURN QUERY SELECT * FROM bike_history WHERE idBike = $1 AND label = $2;
	END IF;
	RETURN QUERY SELECT * FROM bike_history WHERE idBike = $1;
END;
$$ LANGUAGE plpgsql;

-- trigger
DROP FUNCTION IF EXISTS bikeReg() CASCADE; 
CREATE OR REPLACE FUNCTION bikeReg() -- nome da função
RETURNS TRIGGER AS $bikeReg$
DECLARE 
	namest_old bike_station.name%TYPE;
	namest_new bike_station.name%TYPE;
BEGIN
	IF (TG_OP = 'INSERT') THEN
		PERFORM add_history_bike(NEW.idBike,'Its Alive! - Bicicleta criada','D'); --ação
		RETURN NEW;
	ELSEIF (TG_OP = 'UPDATE') THEN
		SELECT name INTO namest_old FROM bike_station WHERE idStation = OLD.idStation;
		SELECT name INTO namest_new FROM bike_station WHERE idStation = NEW.idStation;
		IF (OLD.idStation is NULL) AND (NEW.idStation IS NOT NULL) THEN
			PERFORM add_history_bike(OLD.idBike,'Vai de Bike - Vinculada ao sistema na estação ' || namest_new,'L');
			PERFORM add_history_station(NEW.idStation,'Vai de Bike - Bicicleta ' || OLD.name ||' vinculada ao sistema no ' || NEW.slot || 'º slot','L');
		ELSEIF (OLD.idStation is NOT NULL) AND (NEW.idStation is NULL) THEN
			IF (OLD.onRide = FALSE) AND (NEW.onRide IS NULL) AND (NEW.slot IS NULL) THEN
				PERFORM add_history_bike(OLD.idBike,'Vai de Bike - Desvinculada do sistema no '|| OLD.slot || 'º slot da estação ' || namest_old,'L');
				PERFORM add_history_station(OLD.idStation,'Vai de Bike - Bicicleta ' || OLD.name ||' desvinculada do sistema no ' || OLD.slot || 'º slot','L');
			ELSEIF (OLD.onRide) AND (NEW.onRide IS NULL) AND (NEW.slot IS NULL) THEN
				PERFORM add_history_bike(OLD.idBike,'Vai de Bike - Desvinculada do sistema após sair do '|| OLD.slot ||'º slot da estação ' || namest_old,'L');
				PERFORM add_history_station(OLD.idStation,'Vai de Bike - Bicicleta ' || OLD.name ||' desvinculada do sistema após sair do ' || OLD.slot || 'º slot','L');
 			END IF;
 		ELSEIF OLD.idStation <> NEW.idStation THEN
			PERFORM add_history_bike(OLD.idBike,'Vai de Bike - Mudança do '|| OLD.slot||'º da estação ' || namest_old ||' para '|| NEW.slot||'º slot da estação ' || namest_new,'L');
		END IF;
		IF (OLD.state <> NEW.state) AND (NEW.state IS NOT NULL) THEN
			IF (NEW.state) THEN
				PERFORM add_history_bike(OLD.idBike,'Situação - Ativa','D');
			ELSE
				PERFORM add_history_bike(OLD.idBike, 'Situação - Inativa','D');
			END IF;
		END IF;
		IF (OLD.name <> NEW.name) AND (OLD.name IS NOT NULL) AND (NEW.name IS NOT NULL) THEN
			PERFORM add_history_bike(OLD.idBike,'Informações - Nome alterado de ' || OLD.name || ' para ' || NEW.name,'D');
		END IF;
		RETURN NEW;
	END IF;
END;
$bikeReg$ LANGUAGE PLPGSQL; --linguagem SQL

DROP TRIGGER IF EXISTS bike_log ON bike CASCADE;
CREATE TRIGGER bike_log 
AFTER INSERT OR UPDATE ON bike
FOR EACH ROW EXECUTE PROCEDURE bikeReg();



--- AREA DE TESTES

-- BIKES

-- SELECT createBike(name);

SELECT createBike('Eugena');
SELECT createBike('Leanne');
SELECT createBike('Tawana');
SELECT createBike('Bernardina');
SELECT createBike('Loraine');
SELECT createBike('Robena');
SELECT createBike('Zandra');
SELECT createBike('Jenise');

SELECT upd_bikeSt(1,1,1);
SELECT upd_bikeSt(2,1,2);
SELECT upd_bikeSt(3,2,1);
SELECT upd_bikeSt(4,2,2);
SELECT upd_bikeSt(5,3,1);
SELECT upd_bikeSt(6,3,2);
SELECT upd_bikeSt(7,4,1);
SELECT upd_bikeSt(8,4,2);


-- SELECT * FROM getBike(idBike);
-- SELECT * FROM getBikes();

-- SELECT changeBikeState(idBike);
-- SELECT changeOnRide(idBike);

-- SELECT upd_bike(idBike,name);
-- SELECT upd_bikeSt(idBike,idStation);

-- SELECT upd_bike_pos(idBike,lat,lon); -- hoje não rodrigo

-- BIKE_HISTORY

-- SELECT add_history_bike(idBike,texto)
-- SELECT * FROM getHistsBike();
-- SELECT * FROM getHistBike(idBike);