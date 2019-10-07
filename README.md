# ufersavdbAPI [![Build Status](https://travis-ci.org/UFERSA-Vai-de-Bike/ufersavdbAPI.svg?branch=master)](https://travis-ci.org/UFERSA-Vai-de-Bike/ufersavdbAPI)

    
    
Aplicação Javascript que utiliza NodeJs e ExpressJs. Serve de backend para o projeto e para o sistema de bicicletas compartilhadas "UFERSA Vai de Bike."



# Contribuindo

Ao contribuir com este repositório pedimos a gentileza de discutir primeiro a mudança que você deseja fazer via _issue_, e-mail ou qualquer outro método com os proprietários deste repositório antes de fazer uma alteração.

Note que temos um código de conduta. Por favor, siga-o em todas as suas interações com o projeto.

## Código de Conduta

### Nosso compromisso

No interesse de promover um ambiente aberto e acolhedor, nós, como colaboradores e mantenedores, comprometemo-nos a tornar a participação em nosso projeto e em nossa comunidade uma experiência livre de assédio para todos, independentemente da idade, tamanho do corpo, deficiência, etnia, identidade e expressão de gênero, nível de experiência, nacionalidade, aparência pessoal, raça, religião ou identidade e orientação sexual.

### Nossos padrões

Exemplos de comportamento que contribuem para criar um ambiente positivo incluem:

- A utilização de linguagem acolhedora e inclusiva;
- O respeito com pontos de vista e experiências diferentes;
- A receptividade em relação às críticas construtivas;
- O foco no que é melhor para a comunidade;
- A empatia para com outros membros da comunidade.

Exemplos de comportamento inaceitável pelos participantes incluem:

- A utilização de linguagem ou imagens sexualizadas e atenção sexual indesejada ou avanços;
- _Trolling_, insultos e/ou comentários depreciativos e ataques pessoais ou políticos;
- O assédio público ou privado;
- A publicação de informações privadas de outras pessoas, como endereço físico ou eletrônico, sem permissão explícita;
- Outra conduta que poderia razoavelmente ser considerada inadequada em um ambiente profissional.

### Nossas Responsabilidades

Os mantenedores do projeto são responsáveis por esclarecer os padrões de comportamento aceitável e devem tomar as medidas corretivas apropriadas e justas em resposta a quaisquer casos de comportamento inaceitável.

Além disso, têm o direito e a responsabilidade de remover, editar ou rejeitar comentários, _commits_, códigos, edições do wiki, questões e outras contribuições que não estejam alinhadas a este Código de Conduta, ou banir temporariamente ou permanentemente qualquer colaborador por outros comportamentos que julgarem inapropriado, ameaçador, ofensivo ou prejudicial.

### Escopo

Este Código de Conduta se aplica, tanto nos espaços do projeto, quanto nos espaços públicos em que um indivíduo está representando o projeto ou sua comunidade. Exemplos de representação de um projeto ou comunidade incluem o uso de um endereço de e-mail oficial do projeto, postagem por meio de uma conta oficial de mídia social ou a atuação como um representante nomeado em um evento on-line ou off-line. A representação de um projeto pode ser definida e esclarecida pelos mantenedores do projeto.

### Aplicação

Instâncias de comportamento abusivo, ofensivo ou inaceitável podem ser relatadas entrando em contato com a equipe do projeto em ufersavaidebike@gmail.com. Todas as reclamações serão analisadas e investigadas e resultarão em uma resposta considerada necessária e apropriada às circunstâncias. A equipe do projeto é obrigada a manter a confidencialidade em relação ao relator de um incidente. Mais detalhes sobre políticas específicas de execução podem ser postados separadamente.

Os mantenedores do projeto que não seguem ou aplicam o Código de Conduta de boa fé podem enfrentar repercussões temporárias ou permanentes, conforme determinado por outros membros da liderança do projeto.

### Atribuição

Este Código de Conduta é adaptado do Pacto do Colaborador, versão 1.4, disponível em http://contributor-covenant.org/version/1/4

### Documentação
Este projeto utiliza Swagger para gerar a sua documentação e também como ferramenta de auxílio para utilização dos endpoints. 
A interface do Swagger está disponível em http://localhost:3000/api-docs

## Iniciando o Projeto

Para iniciar o projeto, basta definir um arquivo .env na pasta raíz, semelhante ao arquivo .env-example. Contendo as variáveis para conexão ao banco da aplicação, etc.

Em seguida basta rodar o comando `npm start`. Caso prefira se basear no .env-example basta rodar um `npm run copy-env`.

## Requisitos

### Requisitos

`npm version: `

`node version: `

`nodemon version: 1.19.3`

## Referências

[Designing a RESTful API with Node and Postgres](https://mherman.org/blog/designing-a-restful-api-with-node-and-postgres/)