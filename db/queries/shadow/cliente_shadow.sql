-- Tabela dos clientes
DROP TABLE IF EXISTS client_vdb CASCADE;
CREATE TABLE client_vdb (
	idCli SERIAL PRIMARY KEY,
	role INT DEFAULT 0,  -- 0 nada, 1 usuário, 2 moderador, 3 admin geral
	username VARCHAR(60) NOT NULL UNIQUE,
	password VARCHAR(150) NOT NULL,
	onBike BOOLEAN DEFAULT FALSE, -- ONBIKE = ESTÁ OU NÃO COM UMA BIKE
	situation BOOLEAN DEFAULT TRUE, -- SITUATION = PODE OU NAO PEGAR BIKES
	regDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de informaçãoes do clientes
DROP TABLE IF EXISTS info_client CASCADE;
CREATE TABLE info_client (
	idCli INT REFERENCES client_vdb(idCli) ON DELETE CASCADE,
	fullName VARCHAR(80) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(15) NOT NULL,
	profession VARCHAR(30),
	sex CHAR,
	birthDate DATE
);

-- Tabela de histórico de cliente
DROP TABLE IF EXISTS client_history CASCADE;
CREATE TABLE client_history (
	idLog SERIAL PRIMARY KEY,
	idCli INT REFERENCES client_vdb(idCli) ON DELETE CASCADE,
	regDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	info VARCHAR(200)
);


-- functions

DROP FUNCTION IF EXISTS createClient(client_vdb.role%TYPE,client_vdb.username%TYPE,client_vdb.password%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION createClient(client_vdb.role%TYPE,client_vdb.username%TYPE,client_vdb.password%TYPE)  -- nome da função
RETURNS VOID AS $$
BEGIN
	INSERT INTO client_vdb (role,username,password) VALUES ($1,$2,$3);
END;
$$ LANGUAGE plpgsql; --linguagem SQL

DROP FUNCTION IF EXISTS upd_cli(client_vdb.idCli%TYPE,client_vdb.role%TYPE,client_vdb.username%TYPE,client_vdb.password%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION upd_cli(client_vdb.idCli%TYPE, client_vdb.role%TYPE,client_vdb.username%TYPE,client_vdb.password%TYPE)
RETURNS VOID AS $$
BEGIN
	UPDATE client_vdb SET
		role = $2,
		username = $3,
		password = $4
	WHERE idCli = $1;
END;
$$ LANGUAGE plpgsql;	

DROP FUNCTION IF EXISTS getClients() CASCADE;
CREATE OR REPLACE FUNCTION getClients()
RETURNS SETOF client_vdb AS $$
BEGIN
	RETURN QUERY SELECT * FROM client_vdb;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getClient(client_vdb.idCli%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getClient(client_vdb.idCli%TYPE)
RETURNS SETOF client_vdb AS $$
BEGIN
	RETURN QUERY SELECT * FROM client_vdb WHERE idCli = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS userNameAssign(client_vdb.username%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION userNameAssign(client_vdb.username%TYPE)
RETURNS BOOLEAN AS $$
DECLARE
	un_temp client_vdb.username%TYPE;
BEGIN
	SELECT username INTO un_temp FROM client_vdb WHERE username = $1;
	IF un_temp IS NOT NULL THEN
	RETURN FALSE;
	ELSE
	RETURN TRUE;
	END IF;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getClientByUserName(client_vdb.name%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getClientByUserName(client_vdb.username%TYPE)
RETURNS SETOF client_vdb AS $$
BEGIN
	RETURN QUERY SELECT * FROM client_vdb WHERE username = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getClientLogin(client_vdb.username.%TYPE,client_vdb.password%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getClientLogin(client_vdb.username.%TYPE,client_vdb.password%TYPE)
RETURNS SETOF client_vdb AS $$
BEGIN
	RETURN QUERY SELECT * FROM client_vdb WHERE username = $1 AND password = $2;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delClients() CASCADE;
CREATE OR REPLACE FUNCTION delClientS()
RETURNS VOID AS $$
BEGIN
	DELETE FROM client_vdb;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS delClient(client_vdb.idCli%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION delClient(client_vdb.idCli%TYPE)
RETURNS VOID AS $$
BEGIN
	DELETE FROM client_vdb WHERE idCli = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS changeSit(client_vdb.idCli%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION changeSit(client_vdb.idCli%TYPE)
RETURNS VOID AS $$
BEGIN
    UPDATE client_vdb SET
    	situation = (situation = FALSE)
    WHERE idCli = $1;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS changeOnBike(client_vdb.idCli%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION changeOnBike(client_vdb.idCli%TYPE)
RETURNS VOID AS $$
BEGIN
    UPDATE client_vdb SET
    	onBike = (onBike = FALSE)
    WHERE idCli = $1;
END;
$$ LANGUAGE plpgsql;	

DROP FUNCTION IF EXISTS upd_info_cli(info_client.idCli%TYPE,info_client.fullName%TYPE,info_client.email%TYPE,info_client.phone%TYPE,info_client.profession%TYPE,info_client.sex%TYPE,info_client.birthDate%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION upd_info_cli(info_client.idCli%TYPE,info_client.fullName%TYPE,info_client.email%TYPE,info_client.phone%TYPE,info_client.profession%TYPE,info_client.sex%TYPE,info_client.birthDate%TYPE)
RETURNS VOID AS $$
DECLARE
	temp_row info_client%ROWTYPE;
BEGIN
	SELECT * INTO temp_row FROM info_client WHERE idCli = $1;
	IF temp_row IS NULL THEN
		INSERT INTO info_client values ($1,$2,$3,$4,$5,$6,$7);
	ELSE
		UPDATE info_client SET
			fullName = $2,
			email = $3,
			phone = $4,
			profession = $5,
			sex = $6,
			birthDate = $7
		WHERE idCli = $1;
	END IF;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getInfosCli() CASCADE;
CREATE OR REPLACE FUNCTION getInfosCli()
RETURNS SETOF info_client AS $$
BEGIN
	RETURN QUERY SELECT * FROM info_client;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getInfoCli(client_vdb.idCli%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getInfoCli(client_vdb.idCli%TYPE)
RETURNS SETOF info_client AS $$
BEGIN
	RETURN QUERY SELECT * FROM info_client WHERE idCli = $1;
END;
$$ LANGUAGE plpgsql;

-- add histórico
DROP FUNCTION IF EXISTS add_history_cli(client_history.idCli%TYPE,client_history.info%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION add_history_cli(client_history.idCli%TYPE,client_history.info%TYPE)
RETURNS VOID AS $$
BEGIN
	INSERT INTO client_history (idCli, info) VALUES ($1, $2);
END;
$$ LANGUAGE plpgsql;	

DROP FUNCTION IF EXISTS getHistsCli() CASCADE;
CREATE OR REPLACE FUNCTION getHistsCli()
RETURNS SETOF client_history AS $$
BEGIN
	RETURN QUERY SELECT * FROM client_history;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getHistCli(client_history.idCli%TYPE) CASCADE;
CREATE OR REPLACE FUNCTION getHistCli(client_history.idCli%TYPE)
RETURNS SETOF client_history AS $$
BEGIN
	RETURN QUERY SELECT * FROM client_history WHERE idCli = $1;
END;
$$ LANGUAGE plpgsql;

-- trigger 
DROP FUNCTION IF EXISTS clientReg() CASCADE;
CREATE OR REPLACE FUNCTION clientReg() -- nome da função
RETURNS TRIGGER AS $clientReg$
DECLARE
	texto VARCHAR;
BEGIN
	IF (TG_OP = 'INSERT') THEN
		texto := 'Its Alive! - ';
		CASE NEW.role
			WHEN 1 THEN
				texto := texto || 'Usuario';
			WHEN 2 THEN
				texto := texto || 'Moderador';
			WHEN 3 THEN
				texto := texto || 'Administrador';
			ELSE
				texto := texto || 'MISSINGNO';
		END CASE;
		PERFORM add_history_cli(NEW.idCli,texto || ' criado'); --ação
		RETURN NEW;
	ELSEIF (TG_OP = 'UPDATE') THEN
		IF (NEW.situation) AND (OLD.situation IS NOT NULL) THEN
				PERFORM add_history_cli(OLD.idCli,'Situação - Foi liberado no sistema');
		ELSE
				PERFORM add_history_cli(OLD.idCli, 'Situação - Foi bloqueado no sistema');
		END IF;
		IF (OLD.role <> NEW.role) THEN
			CASE NEW.role
				WHEN 1 THEN
					PERFORM add_history_cli(OLD.idCli,'Hierarquia - Passou a ser usuario');
				WHEN 2 THEN
					PERFORM add_history_cli(OLD.idCli,'Hierarquia - Passou a ser moderador');
				WHEN 3 THEN
					PERFORM add_history_cli(OLD.idCli,'Hierarquia - Passou a ser administrador');
				ELSE
					PERFORM add_history_cli(OLD.idCli,'Hierarquia - Passou a ser MISSINGNO');
			END CASE;
		END IF;
		IF (OLD.password <> NEW.password) AND (OLD.password IS NOT NULL) AND (NEW.password IS NOT NULL) THEN
			PERFORM add_history_cli(OLD.idCli,'Acesso - Senha alterada');
		END IF;
		IF (OLD.username <> NEW.username) AND (OLD.username IS NOT NULL) AND (NEW.username IS NOT NULL) THEN
			PERFORM add_history_cli(OLD.idCli,'Acesso - nome de usuário alterado de ' || OLD.username || ' para ' || NEW.username);
		END IF;
		RETURN NEW;
	END IF;
	RETURN NULL;
END;
$clientReg$ LANGUAGE PLPGSQL; --linguagem SQL

DROP TRIGGER IF EXISTS client_log ON client_vdb CASCADE;
CREATE TRIGGER client_log 
AFTER INSERT OR UPDATE ON client_vdb
FOR EACH ROW EXECUTE PROCEDURE clientReg();

DROP FUNCTION IF EXISTS infoRegCli() CASCADE;
CREATE OR REPLACE FUNCTION infoRegCli() -- nome da função
RETURNS TRIGGER AS $infoRegCli$
BEGIN
	IF (TG_OP = 'INSERT') THEN
		PERFORM add_history_cli(NEW.idCli,'Cadastrou informações ao seu perfil');
	ELSEIF (TG_OP = 'UPDATE') THEN
		PERFORM add_history_cli(OLD.idCli,'Atualizou as informações de seu perfil');
	END IF;
	RETURN NEW;
END;
$infoRegCli$ LANGUAGE PLPGSQL; --linguagem PLPGSQL

DROP TRIGGER IF EXISTS info_log ON info_client CASCADE;
CREATE TRIGGER info_log_cli AFTER -- BEFORE ou AFTER
INSERT OR UPDATE ON info_client -- exclua os eventos que você não quer
FOR EACH ROW EXECUTE PROCEDURE infoRegCli();
-- STATEMENT ou ROW

/*DROP FUNCTION IF EXISTS client_sd_reg();
CREATE FUNCTION client_sd_reg() RETURNS trigger AS $client_shadow$
    BEGIN
    
    	RETURN OLD;
    END;
$client_shadow$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS client_shadow ON client_vdb;
CREATE TRIGGER client_shadow BEFORE DELETE ON client_vdb
FOR EACH ROW EXECUTE PROCEDURE client_sd_reg();*/


-- AREA DE TESTES


-- CLIENTE

-- SELECT createClient(role,name,password);

-- SELECT createClient(0,'r2','anarquia88');
-- SELECT createClient(0,'unhearty','anolandi55');
-- SELECT createClient(2,'kingrow','camilaqjin99');
-- SELECT createClient(3,'dipteran','siqueira73');
-- SELECT createClient(2,'pauxi','allefcurin43');
-- SELECT createClient(3,'underaid','killingin88');
-- SELECT createClient(0,'cardiophrenia','coracao22');
-- SELECT createClient(1,'armaria','qqussi44');

-- SELECT * FROM getClients();
-- SELECT * FROM getClient(idCli);

-- SELECT upd_cli(idCli,role,name,password);

-- SELECT upd_cli(16,2,'marrome','note123');

-- SELECT changeSit(idCli);
-- SELECT changeOnBike(idCli);


-- INFO CLIENTE

-- SELECT upd_info_cli(idCli,fullName,email,phone,profession,sex,birthDate);
-- SELECT * FROM getInfosCli();
-- SELECT * FROM getInfoCli(idCli);

-- SELECT upd_info_cli(1,'Filonai Genot','fulc@treste.com','66665555','ouvinte','M','02-05-1991');
-- SELECT upd_info_cli(2,'Finn Genot','finnlc@teste.com','66665555','heroi','M','02-05-1991');
-- SELECT upd_info_cli(3,'Fanho Lance','fanho@teste.com','65467855','outsider','M','02-07-1999');
-- SELECT upd_info_cli(4,'Arere Umoki','aretw0@teste2.com','99768684','insider','M','25-05-1994');
-- SELECT upd_info_cli(5,'Blossom Mahaley','koil@cabot.co.uk','30777804','toastmastery','M','2012-05-26');
-- SELECT upd_info_cli(6,'Debbie Willhelm','aldermanlike@histamine.org','68119266','thrips','F','2016-06-17');
-- SELECT upd_info_cli(7,'Shalanda Battenhouse','gastroscope@unenkindled.net','71110539','acuesthesia','F','2016-04-18');
-- SELECT upd_info_cli(8,'Cristine Marzinske','pharyngopneustal@cleavability.co.uk','86460736','episiotomy','M','2016-12-27');

-- SELECT upd_info_cli(1,'Arthur Aleksandro','aretw0@hotmail.com','99768606','desenvoledor','M','25-05-1994');


-- HISTORY CLIENT

-- SELECT add_history_cli(idCli,texto);
-- SELECT * FROM getHistsCli();
-- SELECT * FROM getHistCli(idCli);