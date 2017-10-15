/*
USERID: ufersa_vdb
SENHA: bikesharing18
*/

-- CRIAÇÃO DO BANCO DE DADOS
/*DROP DATABASE IF EXISTS ufersa_vdb_1;
CREATE DATABASE ufersa_vdb_1;*/

 -- simular algum funcionamento

-- abre 4 empréstimos
SELECT open_vdb_log(1,1,1,1);
SELECT open_vdb_log(2,3,2,1);
SELECT open_vdb_log(3,2,1,2);
SELECT open_vdb_log(4,4,2,2);

-- fecha os primeiros 2
SELECT close_vdb_log(1,1,2,1);
SELECT close_vdb_log(2,3,1,1);

-- SELECT * FROM getCountAllLogs();
-- SELECT * FROM vdb_log WHERE state = FALSE;


-- SELECT * from getClients();
-- SELECT * from getInfosCli();