# Com o Docker

O próposito deste wiki é para lhe ajudar em casa você queria suar esse projeto junto o docker para 
subir um container do banco de dados ao inves de usar na maquina local.


### Requerimentos

- Docker

# Uso com postgresql

- `$ docker run --name vaidebike-db -e POSTGRES_PASSWORD=123 -p 5432:5432 -d postgres`
