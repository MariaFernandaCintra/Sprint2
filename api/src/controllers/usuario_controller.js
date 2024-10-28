//requere a função de se conectar no banco de dados para ser usada neste arquivo
const connect_database = require("../db/connect_database");

//criação e exportação da classe "usuario_controller" contendo as funções que manipulam os perfis dos usuários no banco de dados.
module.exports = class usuario_controller {
  //função que armazena os dados de um novo usuário no banco de dados.
  static async cadastrar_usuario(req, res) {
    //requere os dados que virão do arquivo app.js
    const { nome_usuario, email, senha, check_senha } = req.body;

    //filtragem de dados
    if (!nome_usuario || !email || !senha || !check_senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else if (senha !== check_senha) {
      return res
        .status(400)
        .json({ error: "as senhas não coincidem (não estão iguais)" });
    }
    //fim da filtragem

    //query que insere os dados obtidos na tabela "usuario" como um registro
    else {
      const query = `INSERT INTO usuario (senha, email, nome_usuario) VALUES( 
                '${senha}', 
                '${email}', 
                '${nome_usuario}');`;
      try {
        //'try' evita que a api pare de funcionar caso ocorra um erro, fazendo as filtragens necessárias para erros do tipo "err" ou "error";
        connect_database.query(query, function (err, results) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              //"ER_DUP_ENTRY" é um erro do banco de dados que ocorre quando se tenta inserir um dado igual à outro já armazenado, o que não se pode ao serem do tipo UNIQUE (único);
              return res.status(400).json({
                error: "O email já está vinculado a outro usuário x(",
              });
            } else {
              return res
                .status(500)
                .json({ error: "Erro interno do servidor :(" });
            }
          } else {
            return res
              .status(201)
              .json({ message: "Cadastro realizado com sucesso." });
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  }

  //função que permite o acesso do usuário ao sistema, inserindo suas credenciais.
  //por questões de segurança, caso o usuário digite o email ou a senha errados, será informado a ele apenas que suas credenciais estão incorretas, sem especificar qual delas.
  static async login_usuario(req, res) {
    const { email, senha } = req.body;

    //filtragem de dados
    if (!email || !senha) {
      return res
        .status(400)
        .json({ error: " Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: " Email inválido. Deve conter @" });
    }
    //fim da filtragem

    let query = `SELECT * FROM usuario WHERE email=? AND senha=?;`;
    const login_check = [email, senha];

    try {
      //pergunta ao banco de dados se há um usuário com este email e senha e, se houver, retorna-o no parâmetro "results" como um array.
      connect_database.query(query, login_check, function (err, results) {
        if (err) {
          console.error(err);
          console.log(err.code);
          return res.status(500).json({
            error: " Erro interno do servidor :(",
          });
        }
        if (results.length === 0) {
          //se o array "results" estiver vazio, significa que não há um usuário com estas credenciais.
          return res.status(400).json({
            error: " credenciais inválidas",
          });
        }

        return res.status(200).json({
          message: "Login efetuado.",
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: " Erro interno do servidor" });
    }
  }

  //função que altera a senha do usuário caso o mesmo o desejar.
  static async alterar_senha_usuario(req, res) {
    const { id, senha, nova_senha } = req.body;

    //filtragem de dados
    if ((!id, !senha, !nova_senha)) {
      res.status(400).json({ error: " todos os campos devem ser preenchidos" });
    }
    //fim da filtragem

    let query = `SELECT * FROM usuario WHERE id_usuario = ?;`;

    try {
      //encontra a senha atual do usuário pelo seu id e descobre se a senha que ele digitou coincide
      connect_database.query(query, [id], function (err, results) {
        if (err) {
          console.error(err);
          console.log(err.code);
          return res.status(500).json({
            error: " Erro interno do servidor :(",
          });
        }
        if (results[0].senha !== senha) {
          return res
            .status(400)
            .json({
              error: " senha incorreta"
            });
        } else {
          //substitui (atualiza) a senha do usuário pela nova senha digitada por ele.
          query = `UPDATE usuario SET senha = ? WHERE id_usuario = ?;`;

          connect_database.query(
            query,
            [nova_senha ,id],
            function (err, results) {
              if (err) {
                console.error(err);
                console.log(err.code);
                return res.status(500).json({
                  error: " Erro interno do servidor :(",
                });
              }
              return res
                .status(200)
                .json({ message: " Senha alterada com sucesso" });
            }
          );
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: " Erro interno do servidor" });
    }
  }

  //remove a conta de um usuário através de um id.
  static async deletar_conta_usuario(req, res) {
    const id = req.params.id;
    const query = `DELETE FROM usuario WHERE id_usuario = ?;`;
    try {
      connect_database.query(query, [id], function (err, results) {
        if (err) {
          console.error(err);
          console.log(err.code);
          return res.status(500).json({
            error: " Erro interno do servidor :("
          });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({
            error: " Usuário não encontrado"
          });
        } else {
          return res.status(200).json({
            message: " Usuário excluído com sucesso"
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: " Erro interno do servidor" });
    }
  }

  //lista todos os usuários cadastrados.
  static async get_todos_usuario(req, res) {
    const query = `SELECT * FROM USUARIO;`;
    try {
      connect_database.query(query, function (err, results) {
        if (err) {
          console.error(err);
          console.log(err.code);
          return res.status(500).json({
            error: " Erro interno do servidor :(",
          });
        } else {
          res
            .status(200)
            .json({
              message: " Lista de todos os usuários:",
              usuarios: results,
            });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: " Erro interno do servidor" });
    }
  }
};
