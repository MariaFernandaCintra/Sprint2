const connect_database = require("../db/connect_database");

module.exports = class usuario_controller {
  static async cadastrar_usuario(req, res) {
    const { nome_usuario, email, senha, check_senha } = req.body;

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
    } else {
      const query = `INSERT INTO usuario (senha, email, nome_usuario) VALUES( 
                '${senha}', 
                '${email}', 
                '${nome_usuario}');`;
      try {
        connect_database.query(query, function (err, results) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({
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
  static async login_usuario(req, res){
    const {email, senha} = req.body;

    if ( !email || !senha) {
      return res
        .status(400)
        .json({ error: " Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: " Email inválido. Deve conter @" });
    }
    let query = `SELECT * FROM usuario WHERE email=? AND senha=?;`
    const login_check = [email, senha];
    
    try{
        connect_database.query(query, login_check, function(err, results){ 
           if(err){
            console.error(err);
            console.log(err.code);
            return res.status(500).json({
                error: " Erro interno do servidor :("
            });
           } 
           if(results.length === 0){
            return res.status(400).json({
              error: " credenciais inválidas"
            });
           }
          //  const usuario = results[0];

          //  if(usuario.senha != senha) {
          //   return res.status(400).json({
          //     error: " A senha informada está incorreta"
          //   });

          //  }
          //  return res.status(200);

          return res.status(200).json({
            message: "Login efetuado."
          });
        });
        // query = `SELECT * FROM usuario WHERE email=? AND senha=?;`
        // const senha_check = [email, senha];
        // connect_database.query(query, senha_check, function(err, results){
        //   if(err){
        //     console.error(err);
        //     console.log(err.code);
        //     return res.status(500).json({
        //         error: " Erro interno do servidor :("
        //     });
        //   }
        //   if(results.length === 0){
        //     return res.status(400).json({
        //       error: " A senha informada está incorreta"
        //     });
        //   }
         
        // });
    }
    catch(error){
      console.error(error);
      res.status(500).json({error: " Erro interno do servidor"});
    }
  }
  static async alterar_senha_usuario(req, res) {

    const {id, senha, nova_senha} = req.body;

    if(!id, !senha, !nova_senha){
      res.status(400).json({error: " todos os campos devem ser preenchidos"})
    }

    let query = `SELECT * FROM usuario WHERE id = ?;`

    try{
      connect_database.query(query, id, function(err, results){
        if(err){
          console.error(err);
          console.log(err.code);
          return res.status(500).json({
              error: " Erro interno do servidor :("
          });
         } 
        if(results.senha !== senha){
          return res.status(400).json({error: " senha incorreta"});
        }
        else {
          query = `UPDATE usuario SET senha = ? WHERE id_usuario = ?;`;

          connect_database.query(query, nova_senha && id, function(err, results){
            if(err){
              console.error(err);
              console.log(err.code);
              return res.status(500).json({
                  error: " Erro interno do servidor :("
              });
             }
             return res.status(200).json({message: " Senha alterada com sucesso"});
          });
        }
      })
    }
    catch(error){
      console.error(error);
      res.status(500).json({error: " Erro interno do servidor"});
    }
  }
  static async deletar_conta_usuario(req, res){
    const id = req.params.id;
    const query = `DELETE FROM usuario WHERE id = ?;`
    try{
      connect_database.query(query, id, function(err, results){
        if(err){
          console.error(err);
          console.log(err.code);
          return res.status(500).json({
            error: " Erro interno do servidor :("
          });
        }
        if(results.affectedRows === 0){
          return res.status(404).json({
            error:" Usuário não encontrado"
          });
        }
        return res.status(200).json({
          message:" Usuário excluído com sucesso"
        });
      });
    }
    catch(error){
      console.error(error);
      res.status(500).json({error: " Erro interno do servidor"});
    }
  }
  
  static async get_todos_usuario(req, res){
    const query = `SELECT * FROM USUARIO;`;
    try{
      connect_database.query(query, function(err, results){
        if(err){
          console.error(err);
          console.log(err.code);
          return res.status(500).json({
            error: " Erro interno do servidor :("
          });
        }
        else{
          res.status(200).json({message: " Lista de todos os usuários:", usuarios: results});
        }
      });
    }
    catch(error){
      console.error(error);
      res.status(500).json({error: " Erro interno do servidor"});
    }
  }
};


