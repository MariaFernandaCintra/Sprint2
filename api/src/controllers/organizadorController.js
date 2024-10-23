const connect = require("../db/connect");
let organizadorId = 1;

module.exports = class organizadorController {
  static async createOrganizador(req, res) {
    const { telefone, email, password, name } = req.body;

    if (!telefone || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res.status(400).json({
        error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Verifica se já existe um usuário com o mesmo CPF
    const query = `INSERT INTO organizador (telefone, password, email, name) VALUES(
      '${telefone}', 
      '${password}', 
      '${email}', 
      '${name}')`;

    // Executando a query criada
    try {
      connect.query(query, function (err) {
        if (err) {
          console.log(err);
          console.log(err.code);
          if (err.code === "ER_DUP_ENTRY") {
            // tratamento do erro de uma duplicidade de email
            return res.status(400).json({
              error: "O email já está vinculado a outro organizador!",
            });
          } else {
            return res.status(400).json({ error: "Erro interno do servidor!" });
          }
        } else {
          return res
            .status(201)
            .json({ message: "Usuário de organizador criado com sucesso" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor!" });
    }
  }

  static async getAllOrganizadores(req, res) {
    const query = `SELECT * FROM organizador`;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor!" });
        }
        return res
          .status(200)
          .json({ message: "Lista de organizadores", organizadores: results });
      });
    } catch (error) {
      console.error("Error ao execultar consulta: ", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
  //UPDATE
  static async updateOrganizador(req, res) {
    //Desestrutura e recupera dados enviados via corpo de requisição
    const { id, telefone, email, senha, nome } = req.body;

    //Validar se os todos os campos foram preenchidos
    if (!telefone || !email || !senha || !nome|| !id) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos!!" });
    }
    const query = `UPDATE organizador SET nome=?, email=?, senha=?, telefone=? WHERE id_organizador=?`;
    const values = [nome, email, senha, telefone, id];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUR_ENTRY") {
            return res
              .status(400)
              .json({ error: "Email já cadastrado por outro organizador" });
          } else {
            console.error(err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Organizador não encontrado" });
        }
        return res
          .status(200)
          .json({ message: "O organizador foi atualizador" });
      });
    } catch (error) {
      console.error("error ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  //DELETE
  static async deleteOrganizador(req, res) {
    const organizadorId = req.params.id;
    const query = `DELETE FROM organizador WHERE id_organizador=? `;
    const values = [organizadorId];

    try{
      connect.query(query, values, function(err,results){
        if(err){
          console.error(err);
          return res.status(500).json({error:"Erro interno do servidor"});
        }

        if(results.affectedRows === 0){
          return res.status(404).json({error:"Orgaizador não encontrado"});
        }
        return res.status(200).json({message:"Organizador excluido com sucesso"});
      })
    }
    catch(error){
      console.error(error);
      return res.status(500).json({error:"Erro interno no servidor"});
    }
  }
};
