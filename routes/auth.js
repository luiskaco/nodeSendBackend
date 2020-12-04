const express = require('express');
// Express tiene router
const router = express.Router();
// importar COntrollador
const authController = require('../controllers/authController');
// Middleware
const auth = require('../middleware/auth');
// Validando
const {check} = require('express-validator');

router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password no puede ir vacio').not().isEmpty()
    ],
    authController.autenticarUsuario
);

router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;