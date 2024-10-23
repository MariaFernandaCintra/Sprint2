const express = require("express"); //Importa o express

const test_connect = require('./db/test_connect')

//Define uma classe para organizar a lógica de aplicação
class AppController {
  constructor() {
    //Cria uma nova instância do Express dentro da classe
    this.express = express();
    //Chama o método middlewares para configurar os middlewares
    this.middlewares();
    //Chama o método routes para definir as rotas da Api
    this.routes();
    test_connect();
  }

  middlewares() {
    //Permitir que a aplicação receba dados em formato JSON nas requisições
    this.express.use(express.json());
  }
  
  //Rotas da API
  routes() {
    const apiRoutes = require("./routes/apiRoutes"); //URL base
    this.express.use("/Agenda-Senai/api/v1/", apiRoutes);
  }
}

//Exportando a instância de Express configurada, para que seja acessada em outros aquivos
module.exports = new AppController().express;
