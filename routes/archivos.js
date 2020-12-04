const express = require('express');
// Express tiene router
const router = express.Router();
// importar COntrollador
const archivosController = require('../controllers/archivosController');
// Middleware
const auth = require('../middleware/auth');

// Subida de archivo 
//const multer = require('multer');
            // Especfficar destino donde se subira
//const upload = multer({ dest: './uploads/'})

router.post('/',
    // Subida de un archivo
    //  upload.single('archivos'),   // el nombre archivo es el nombre de la llave
    auth,
    archivosController.subirArchivos
);

router.get('/:archivo',
        archivosController.descargar,
        archivosController.eliminarArchivos
);

router.delete('/:id',
    archivosController.eliminarArchivos
);

module.exports = router;