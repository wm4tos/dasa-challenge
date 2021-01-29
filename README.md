# Challenge Dasa

## Descrição
Esse é um teste técnico realizado para o processo seletivo da [Dasa](https://dasa.gupy.io/).

## Explicação Arquitetural
* Decidi usar o NestJS pois sei que faz parte da stack da Dasa :)
* Optei por usar uma arquitetura baseada em módulos, pois assim fica mais fácil acoplar e desacoplar coisas.
* Minha maior preocupação foi seguir o princípio KISS. Eu decidi fazer EXATAMENTE o que vocês pediram, para evitar complicar a aplicação desnecessariamente.

## Requisitos
É necessário ter o [docker](https://docs.docker.com/get-docker/) e o [docker-compose](https://docs.docker.com/compose/install/) instalados na sua máquina.

## Como rodar o projeto?
* Renomeie o arquivo `example.env` para `.env`.
* Rode o comando `npm run docker:build` para gerar uma imagem do docker.
* Rode o comando `npm run docker:run` para subir o container em tempo real.

## Como rodar os testes
### Se já tiver buildado a imagem do docker
* Rode o comando `npm run test`.

### Se ainda não tiver buildado a imagem do docker, rode o comando
* Rode o comando `npm install` para instalar as dependências do projeto.
* Rode o comando `npm run test`.

## Alguma dúvida ou sugestão?
Você pode me mandar um [e-mail](mailto:wrickee@gmail.com) ou me chamar no [LinkedIn](https://www.linkedin.com/in/wricke)!