# Projeto do de seleção - Sistema para os gestores de uma concessionária

## RS CAR - Back-end

Aplicação com o objetivo de disponibilizar aos administradores de uma consessionária possa gerir e controlar o seu negócio. 

- [video de apresentação](https://youtu.be/dL-XaH6k4Jk)

## Requisitos

- NodeJs v16.15.1
- Banco de dados PostgresSQL


## Tecnologias usadas

- NodeJs
- Express
- Knex
- Dotenv
- Joi
- JWT - Json Web Token
- Bcrypt
- Cors
- Nodemon
- Pg

## Funcionalidades

<details>
<summary>CRUD para vendedores</summary>
- Lista todos<br/>
- Buscar um vendedor <br/>
- Editar um vendedor <br/>
- Deletar um vendedor (soft delete)
<br/>
</details>

<details>
<summary>CRUD para Vendas</summary>
- Lista todas as vendas<br/>
- Buscar uma venda <br/>
- Editar uma venda <br/>
- Deletar uma venda (soft delete)
<br/>
</details>

<details>
<summary> CRUD para carros</summary>
- Lista todos os carros<br/>
- Buscar um carros <br/>
- Editar um carros <br/>
- Deletar um carro (soft delete)
<br/>
</details>
<br/>
- Middleware de autenticação do administrador <br/>
- Rotas protegidas<br/>
- Schema de validação do corpo da requisição

## Rodando localmente

#### clone o repositório

Usando chave ssh

```bash
git@github.com:rafael93souza/rs-car-back-end.git
```

Sem chave ssh

```bash
https://github.com/rafael93souza/rs-car-back-end.git
```

### Entrar na pasta

```bash
cd rs-car-back-end
```

Instalar as dependencias

```bash
npm install
```

Start na aplicação

```bash
npm run dev
```

A API roda na port

```bash
http://localhost:3000/
```

Observação: O banco de dados precisa esta rodando;

Você pode usar o banco de dados localmente intalado em sua máquina.

## Banco de dados

Na raiz do projeto existe um arquivo de nome `dump.sql` que contem as query para gerar o bando de tados e suas tabelas.
Só copiar para a ferramenta que você utiliza para manipular banco de dados Postgres
Exemplo de ferramentas:
PgAdimin 4
Beekeeper Studio

Ao gerar o banco de dados e popular ele, será criado um usuário administrador que tera os seguintes dados:

- nome: Admin
- email: admin@email.com
- senha: 123456

Apenas o usuário cadastrado no sistema conseguirá ter acesso as rotas protegidas.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

- Renomei o arquivo `.env.exemple` para `.env`

- Altere os valores das variáveis para os valores que você usa no banco de dados que esta instalado na sua máquina

```bash
PORT=

DB_PORT=
DB_HOST=
DB_USER=
DB_PASS=
DATABASE=
JWT_PASS=

```

## Documentação da API

Após feito os primeiros passos de entar na pasta, instalar as dempendências, e rodar a aplicação.
Acesse a pasta collection e nela encontrará a collection com todas as rotas e os dados configurados em json para importar no insomia:


## Autor
- [@rafael93souza](https://github.com/rafael93souza)
