<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-03/master/.github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Gympoint
</h3>



## :rocket: Gym Point
> App para controle de academia, agendamento de alunos, dos administradores, planos, controle de frequencia.



### App de Academia com controle total sobre:

- Controle e cadastro dos Clientes/Administrador.
- Cadastro dos usuarios.
- Criação de planos personalizados, com tempo e valor.
- Matricula do aluno cadastrado, com algum plano, criando um controle automatico de tempo restante do aluno, e se esta ativo ou não.
- Listagem de todos os alunos, e alunos matriculados na academia.
- Envio de e-mail para o aluno quando ele for matriculado, passando as informações do plano matriculado.
- Opção do cliente enviar suas duvidas, e receber as respostas do Instrutor da academia direto por sua pagina, e sempre que receber uma resposta, recebera um e-mail com a pergunta, e a resposta que obteve.

## API desenvolvida com as tecnologias:

- NodeJs.
- Express.
- Postgres.
- MongoDB.
- RedisDB.
- Nodemailer.
- Entre outros...


## Instalação

Adicionando Repositorios:

```sh
yarn
```

> Precisamos instalar o Postgres, o MongoDb, e o redis

Rodando as migration para cria o banco:

```js
yarn sequelize db:migrate

```

> crie na raiz o arquivo .env e replique os dados do .envExemple, preenchendo com os dados dos seus DB.

Iniciando o app:

```sh
yarn dev
yarn queue
```

### Adicionando Variaveis
 


## Criado por:

Fernando Santos – [@Fernando](https://www.linkedin.com/in/fernando-santos-686632122/) – fernandorato.0@hotmail.com

Faz Parte do bootcamp GoStack 9 da [RocketSeat](https://rocketseat.com.br/bootcamp)



## Contributing

1. Faça o _fork_ do projeto 
2. Crie uma _branch_ para sua modificação (`git checkout -b feature/gobarber`)
3. Faça o _commit_ (`git commit -am 'Add some feature'`)
4. _Push_ (`git push origin feature/gobarber`)
5. Crie um novo _Pull Request_

