/*este arquivo contém todas as rotas necessárias para a realização das funções da api*/

const router = require("express").Router();

const salasController = require("../controllers/salasController");
//requere a classe 'usuario_controller'
const usuario_controller = require("../controllers/usuario_controller");

//usuario
router.post('/usuario_cadastro', usuario_controller.cadastrar_usuario);
router.post('/usuario_login', usuario_controller.login_usuario);
router.put('/usuario_alterar_senha', usuario_controller.alterar_senha_usuario);
router.delete('/usuario_deletar_conta/:id', usuario_controller.deletar_conta_usuario);
router.get('/usuario_get_todos', usuario_controller.get_todos_usuario);

//salas
router.post('/sala', salasController.createSalas);
router.get('/sala', salasController.getAllSalas);
router.put('/sala', salasController.updateSalas);
router.delete('/sala/:id', salasController.deleteSalas);


module.exports = router;