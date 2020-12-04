const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});


module.exports = (req, res, next) =>{
    // Middleware de autenticacion

    const authheader = req.get('Authorization');

    // Autorizacion -beeter Postman 1 Prueba

    if(authheader){
        // Obtene el token
        const token = authheader.split(' ')[1];

        // Comprobar el json webtoken es valido
        try {
            const usuario = jwt.verify(token, process.env.SECRETA);
            // res.json({usuario})}

            // ASignar el usuario al request
            req.usuario = usuario;

        } catch (error) {
            console.log(error);
            console.log('JWT no valido');
        }
        
    }
    //console.log("No hay header...");

    return next();
}