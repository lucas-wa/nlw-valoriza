import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "reflect-metadata";
import { router } from "./routes";
import cors from "cors";
// JS importa aruivos index automaticamente
import "./database";
const app = express();

// Habilita que outras fontes, externas ou front end, possam acessar sua API
app.use(cors());

// Prepara express para receber json
app.use(express.json());

app.use(router);
//
// Middlewares para erros tem 4 parametros
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    // Verifica se é um erro tratado pela aplicação
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message
      });
    }

    // Se não é tratado
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
);

app.listen(3000, () => console.log("Server ir running"));

/*


  GET => Buscar uma informação na API
  POST => Inserir (Criar) uma informação na nossa API
  PUT => Alterar uma informação
  DELETE => Remover um dado
  PATCH => Alterar uma informação específica (só um dadod de um conjunto de um usuário por exemplo)

  No express

  app.method("recurso ou rota", function (req, res) {
    //Request => Informações entrando
    //Responde => Informações saindo
  });
 */

/*
  Tipos de parâmetros:
  * Routes Params => Fazem parte da rota (URL) https://localhost3000/produtos/984948897897878

  * Query Params => Fazem parte de uma query  (usados para filtros de pesquisa por exemplo, não são obrigatórios como os Route params) https://localhost3000/produtos?name=teclado&description=tecladobom

  * Body Params =>  Vem no corpo de uma requisição (um objeto para inserir um produto por exemplo)
*/

/*
  Existem 3 formas de impĺementar banco de dados em seu projeto:

  - Usar o próprio driver do banco de dados como MongoDB, MySQL, etc... Pegar o que é nativo do banco de dados e utiliza-lo. (Usar um SQL mais puro)
  - Query builders: como o Next.js, permite escrever queries de forma mais fácil (menos puro).
  - ORMs: Objects Relational Map, mapeiamento entre entidade e  o objeto (são frameworks ou bibliotecas que pegam um código e transforma em uma forma que o banco de dados entende, além de ser automatizado), como o Sequelize, TypeORM para Typescript, Prisma.
  
  A melhor forma é a que atende ao seu projeto.

  Nesse app usaremos TypeORM com SQLite
 */

// app.get("/test", (request, response) => {
//   // Recomendado usar return, pois, dependendo do formato da resposta, ele pode não ser retornado
//   return response.send("Olá Mundo!!");
// });

// app.post("/test-post", (request, response) => {
//   // Erro. não da pra acessar uma url com method post pelo browser. Por isso se usa o Insomnia e o Postman
//   return response.send("Olá Método POST");
// });
