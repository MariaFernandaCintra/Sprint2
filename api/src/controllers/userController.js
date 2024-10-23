const connect = require('../db/connect');
module.exports = class userController {
  static async createUser(req, res) {
    const { email, senha, nome } = req.body;

    if (!email || !senha || !nome) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }
    else{
    // Construção da query INSERT 
    const query = `INSERT INTO usuario (senha, email, nome) VALUES( 
      '${senha}', 
      '${email}', 
      '${nome}')`;

    // Executando a query criada
    try{
      connect.query(query, function(err){
        if(err){
          console.log(err)
          console.log(err.code)
          if(err.code === 'ER_DUP_ENTRY') {  // tratamento do erro de uma duplicidade de email
            return res.status(400).json({error: "O email já está vinculado a outro usuario!",});
          } 
          else{
            return res.status(400).json({error: "Erro interno do servidor!",});
          }
        }
        else{
          return res
          .status(201)
          .json({ message: "Usuário criado com sucesso"});
        }
      });
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Erro interno do servidor!"})
    }
    }
  }
  static async getAllUsers(req, res) {
    const query = `SELECT * FROM usuario`;

    try {
      connect.query(query, function(err,results){
        if(err){
          console.log(err);
          return res.status(500).json({error: "Erro interno do servidor!"})
        }
        return res.status(200).json({message:"Lista de usuários", users: results})
      })
    }
    catch(error){
      console.error("Error ao execultar consulta: ", error)
      return res.status(500).json({error: "Erro interno do servidor"});
    }
  }


//UPDATE
  static async updateUser(req, res) {
    //Desestrutura e recupera dados enviados via corpo de requisição
    const { email, senha, nome} = req.body;

    //Validar se os todos os campos foram preenchidos
    if (!email || !senha || !nome) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!!" });
    }
    const query = `UPDATE usuario SET nome=?, email=?, senha=?, cpf=? WHERE id_usuario=?`;
    const values = [nome, email, senha];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUR_ENTRY") {
            return res
              .status(400)
              .json({ error: "Email já cadastrado por outro usuario" });
          } else {
            console.error(err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuario não encontrado" });
        }
        return res
          .status(200)
          .json({ message: "O usuario foi atualizado" });
      });
    }
    catch (error) {
      console.error("error ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  //DELETE
  static async deleteUser(req, res) {
    const usuarioId = req.params.id_usuario;
    const query = `DELETE FROM usuario WHERE id=? `;
    const values = [usuarioId];

    try{
      connect.query(query, values, function(err,results){
        if(err){
          console.error(err);
          return res.status(500).json({error:"Erro interno do servidor"});
        }

        if(results.affectedRows === 0){
          return res.status(404).json({error:"Usuário não encontrado"});
        }
        return res.status(200).json({message:"Usuário excluido com sucesso"});
      })
    }
    catch(error){
      console.error(error);
      return res.status(500).json({error:"Erro interno no servidor"});
    }

  }
};
