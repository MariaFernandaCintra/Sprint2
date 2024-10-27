/*Este arquivo testa a conexão com o banco de dados, mostrando no terminal (ao mesmo tempo que a api é rodada) se foi um sucesso ou mostrando o erro caso fracasso.*/

const connect_database = require("./connect_database");

module.exports = function testConnect() {
  try {

    //usamos um "SELECT" como forma de mandar uma mensagem
    const query = `SELECT 'Conexão bem-sucedida' AS Mensagem`;
    connect_database.query(query, function (err) {
      if (err) {
        console.log("Conexão não realizada", err);
        return;
      }
      console.log("Conexão realizada com Mysql");
    });
  } catch (error) {
    console.error("Erro a executar a consulta:", error);
  }
};