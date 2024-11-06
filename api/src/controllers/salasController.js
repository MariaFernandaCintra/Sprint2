const connect_database = require("../db/connect_database");

module.exports = class salasController{
    //create
    static async createSalas (req, res){
        const {descricao_sala, nome_sala, capacidade} = req.body;

        if (!descricao_sala || !nome_sala || !capacidade) {
            return res.status(400).json({error: "Todos os campos devem ser preenchidos!"});
        }

        const query = `INSERT INTO salas (descricao_sala, nome_sala, capacidade) VALUES (?, ?, ?)`;
        const values = [descricao_sala, nome_sala, capacidade];

        try{
            connect_database.query(query, values, (err) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({error: "Erro ao criar sala!"});

                }
                return res.status(201).json({message: "Sala criada com sucesso!"});
            })
        } catch (error){
            console.log("Erro ao executar consulta: ", error);
            return res.status(500).json({error: "Error interno do servidor!"});
        }



    }

    //get
    static async getAllSalas(req, res){
        const query = `SELECT * FROM salas`;

        try{
            connect_database.query(query, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({error: "Erro ao buscar sala!"});
                }
                return res.status(200).json({message:"salas listadas com sucesso", events: results})
            })
        } catch(error){
            console.log("Erro ao execultar a consulta!", error);
            return res.status(500).json({error: "Error interno no servidor!"});
        }

    }

    //UPDATE
    static async updateSalas (req, res){
        const {id_salas, descricao_sala, nome_sala, capacidade} = req.body;

        if (!id_salas || !descricao_sala || !nome_sala || !capacidade) {
            return res.status(400).json({error: "Todos os campos devem ser preenchidos!"});
        }

        const query = `UPDATE salas SET descricao_sala=?, nome_sala=?, capacidade=? WHERE id_salas=?`;
        const values = [descricao_sala, nome_sala, capacidade, id_salas];

        try{
            connect_database.query(query, values, (err, results) => {
                console.log("Resultados:", results);
                if(err){
                    console.log(err);
                    return res.status(500).json({error: "Erro ao atualizar informações da sala!"});
                }
                if(results.affectedRows === 0){
                    return res.status(404).json({error: "Sala não encontrado!"});
                }
                return res.status(201).json({message: "Sala atualizada com sucesso!"});
            })
        } catch (error){
            console.log("Erro ao executar consulta: ", error);
            return res.status(500).json({error: "Error interno do servidor!"});
        }
    }

    //DELETE
    static async deleteSalas(req, res){
        const idsala = req.params.id;

        const query = `DELETE FROM salas WHERE id_salas=?`;

        try{
            connect_database.query(query, idsala, (err, results) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({error: "Erro ao excluir sala!"});
                }
                if(results.affectedRows === 0){
                    return res.status(404).json({error:"Sala não encontrada"});
                }
                return res.status(200).json({message: "Sala excluida com sucesso!"});
            })
        }catch(error){
            console.log("Erro ao executar consulta!", error);
            return res.status(500).json({error: "Erro interno do servidor!"});
        }
    }

}