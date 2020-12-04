const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

// Validacion express
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }
    
    // Buscar el usurario si existe
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});


    if(!usuario){
        res.status(401).json({msg: 'EL usuario No existe'});
        return next();  // Detiene el codigo
        // 401: EL usuario no existe
    }

    // Verificar y autenticar
    
    // metodo para comparar
    if(bcrypt.compareSync(password, usuario.password)){
        
        // Crear JSON WEB TOKEN
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre, // firma con el nombre de usuario
            email:usuario.email,
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });
        
        /**
         *   Firma del token se compone
         * 
         *  * Cuerpo para crear el JWT
         *  * Palabra SECRETA
         *  * Opciones
         * 
         ***/

         //console.log(token);
         //res.json({msg:token})
         res.json({token});

    }else{
        res.status(401).json({msg: 'Password incorrecto!'});
        return next();
    }
    /*
       Nota: se usa comparSync porque que se anda usando sync y await
    */
   
} 

exports.usuarioAutenticado = (req , res, next) => {
    // COmunicando el request con el controlador
    //console.log(req.usuario);
    res.json({
        usuario: req.usuario
    });

}