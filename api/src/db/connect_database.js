/*o único propósito deste arquivo é servir como uma função que conecta a api ao bando de dados, ou seja,
 sempre que algum arquivo .js precisar de acesso ao banco de dados, ele chamará este arquivo em seu código.
 Isto é possível graças ao "module.exports".*/

//requere a biblioteca "mysql2" instalada via npm
const mysql = require('mysql2');

//função que permite a conexão da api com o banco de dados para consultas e manipulação de dados das tabelas.
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'alunods',
    password: 'senai@604',
    database: 'reservas_salas'
})

//exporta
module.exports = pool;