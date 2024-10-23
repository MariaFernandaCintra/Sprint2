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
    const { email, senha} = req.body;

    if ( !email || !senha) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }
    let query = `SELECT * FROM usuario WHERE email=?`
    const email_check = [email];
    const senha_check = [senha];
    try{
        connect_database.query(query, email_check, function(err, results){ //"results" é um booleano, então ele retornará "true" ou "false"
           if(err){
            console.error(err);
            console.log(err.code);
            return res.status(500).json({
                error: "Erro interno do servidor :("
            });
           } 
           if(!results){
            return res.status(400).json({
              error: "O email informado está incorreto ou não se encontra cadastrado no sistema"
            });
           }
           return res.status(200);
        });
        query = `SELECT * FROM usuario WHERE email=?, senha=?`
        connect_database.query(query,email_check, senha_check, function(err, results){
          if(err){
            console.error(err);
            console.log(err.code);
            return res.status(500).json({
                error: "Erro interno do servidor :("
            });
          }
          if(!results){
            return res.status(400).json({
              error: "A senha informada está incorreta"
            });
          }
          return 
        });
    }
    catch(error){
      console.error(error);
      res.status(500).json({error: "Erro interno do servidor"});
    }
  }
};


