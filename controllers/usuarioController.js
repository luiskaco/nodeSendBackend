// Importar modelo
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

// Validacion express
const { validationResult} = require('express-validator');
/**Nota: Esta validacion epende d elo defindo en el routing 
 *  Solo dispone de dos metodos El check ubicado en el rounter y 
 * el validatonResultado ubicado en el controlador
*/

exports.nuevoUsuario = async (req, res) => {
    //console.log(req.body);
    // Mostrar mensaje de error de express validator
    const errores = validationResult(req);

    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    // Verificar si el usuario ya esta registrado
    const {email, password} = req.body;

    // Valindo duplicado e usaurio
    let usuario = await Usuario.findOne({email});

    if(usuario){
        return res.status(400).json({msg: 'El usuario ya esta registrado'});
    }


    // Crear nuevo usuario
    usuario = new Usuario(req.body);

    // Hash de paswword
    const salt = await bcrypt.genSalt(10); // Mientra mayor sea el numero mas procesa el procesador
    usuario.password = await bcrypt.hash(password, salt);

    try {
        // Guardar usuario
        await usuario.save();

        res.json({msg: 'Usuario Creado Correctamente'});
    } catch (error) {
        console.log(error);
    }
 

}