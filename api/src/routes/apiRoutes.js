const router = require("express").Router();

const usuario_controller = require("../controllers/usuario_controller");

router.post('/usuario_cadastro', usuario_controller.cadastrar_usuario);
router.post('/usuario_login', usuario_controller.login_usuario);
router.put('/usuario_alterar_senha', usuario_controller.alterar_senha_usuario);
router.delete('/usuario_deletar_conta', usuario_controller.deletar_conta_usuario);
router.get('/usuario_get_todos', usuario_controller.get_todos_usuario);


module.exports = router;