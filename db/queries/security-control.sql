-- FAZER DEPOIS - IMPORTANTE PARA O ACOMPANHAMENTO

-- Tabela black list
/*CREATE TABLE bl_vdb (
	idCli INT references client_vdb (idCli),
	idOutLog INT references out_log_vdb (idLog),
	idInLog INT references in_log_vdb (idLog),
	dateReg DATE NOT NULL,
	penalty INT DEFAULT 30, -- 30 DIAS DE PENALIDADE
	info VARCHAR(200)
);*/

/*CREATE TABLE warning_calls (
	idLog SERIAL PRIMARY KEY,
	title VARCHAR(20),
	info VARCHAR(200),
	idAuthor INT references client_vdb (idCli),
	author VARCHAR(30),
	dateReg DATE,
	dateUp DATE, -- ultima atualização
	state INT -- chamada aberta 1, em atendimento 2, em espera 3, concluido/fechado 0
);*/

/*CREATE TABLE warning_call_notes ( -- anotações do antendente
	idLog INT REFERENCES warning_calls (idLog),
	note VARCHAR(200),
	author VARCHAR(20),
	dateReg DATE
);*/