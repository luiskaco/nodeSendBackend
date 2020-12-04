const express = require('express');
// Express tiene router
const router = express.Router();
// importar COntrollador
const usuarioController = require('../controllers/usuarioController');
// Validando
const {check} = require('express-validator');



router.post('/', 
    // Validando
    [
        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6}),
    ],
    usuarioController.nuevoUsuario
);

module.exports = router;