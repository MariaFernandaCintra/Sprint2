const router = require("express").Router();

const usuario_controller = require("../controllers/usuario_controller");

router.post('/usuario_cadastro', usuario_controller.cadastrar_usuario);
router.post('/usuario_login', usuario_controller.login_usuario);


module.exports = router;