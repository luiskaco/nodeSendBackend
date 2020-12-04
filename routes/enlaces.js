const express = require('express');
// Express tiene router
const router = express.Router();
// importar COntrollador
const enlacesController = require('../controllers/enlacesController');
// importar COntrollador
const archivosController = require('../controllers/archivosController');
// Middleware
const auth = require('../middleware/auth');
// Validando
const {check} = require('express-validator');

router.post('/',
    [
       check('nombre', 'sube un archivo').not().isEmpty(),
       check('nombre_original', 'sube un archivo').not().isEmpty(),
    ],
    auth,
    enlacesController.nuevoEnlace

);

router.get('/',
    enlacesController.todoEnlaces
);

router.get('/:url',
    enlacesController.tienePassword,
    enlacesController.obtenerEnlace,
    //Siguiente middleware para eliminar
   // archivosController.eliminarArchivos | Movido para enlace
);

router.post('/:url',
    enlacesController.verificarPassword,
    enlacesController.obtenerEnlace,
);

module.exports = router;