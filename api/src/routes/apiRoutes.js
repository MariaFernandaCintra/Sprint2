/*este arquivo contém todas as rotas necessárias para a realização das funções da api*/

const router = require("express").Router();

//requere a classe 'usuario_controller'
const usuario_controller = require("../controllers/usuario_controller");

router.post('/usuario_cadastro', usuario_controller.cadastrar_usuario);
router.post('/usuario_login', usuario_controller.login_usuario);
router.put('/usuario_alterar_senha', usuario_controller.alterar_senha_usuario);
router.delete('/usuario_deletar_conta/:id', usuario_controller.deletar_conta_usuario);
router.get('/usuario_get_todos', usuario_controller.get_todos_usuario);


module.exports = router;