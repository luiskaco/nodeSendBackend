const Enlaces = require('../models/Enlace');
const shortId = require('shortid');
const bcrypt = require('bcrypt');
    // Validacion express
const { validationResult} = require('express-validator');

exports.nuevoEnlace = async (req, res, next) =>{
    console.log("Desde nuevo enelace");

    // Revisar si hay errores
        
        // Mostrar mensaje de error de express validator
        const errores = validationResult(req);

        if(!errores.isEmpty()) {
            return res.status(400).json({errores: errores.array()});
        }

        // console.log(req.body);
    
    // Crear un objetos
    const { nombre_original , nombre } = req.body;

    const enlace = new Enlaces();
    enlace.url = shortId.generate();
    //enlace.nombre = shortId.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;


    // Si el usuario esta autenticado
    if(req.usuario){
        const {password, descargas} = req.body;

        //Asignar a enlace el numero de descarga
        if(descargas){
            enlace.descargas = descargas;
        }
        //Asignar un password
        if(password){
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash(password, salt); ;
        }
        // Asignar el autor
            enlace.autor = req.usuario.id;
    }
    

    // Almacenar en la Bases de datos
    try {
        await enlace.save();
        return res.json({msg : `${enlace.url}` })
        next();
    } catch (error) {
        console.log(error);
    }

    //console.log(enlace);
}
// Obtener enlaces de todos los listados.
exports.todoEnlaces = async (req, res) => {
    try {
        const enlaces = await Enlaces.find({}).select('url -_id');
        /* Nota: Pasando {} vacio en el find. Hace una busqueda de todo
           Nota 2: En una consulta en mongo siempre se retornara el id
           Nota 3: Se puede eliminar elementos con -_id -nombre -apellido
        */
        res.json(enlaces);
    } catch (error) {
        console.log(error);
    }
}
// Retorna si el enlace tiene password
exports.tienePassword = async (req, res,next) => {
    const { url } = req.params;

    // Verificar si existe el enlace
    //const enlace = await Enlaces.findOne({url: req.params.url});
    const enlace = await Enlaces.findOne({url});

    if(!enlace){
        res.status(404).json({msg: "Ese enlace no existe"});
        return next();
    }

    if(enlace.password) {
        return res.json({
            password: true, 
            enlace: enlace.url
        })
    }
    next();
}

// Verificar si el password es correcto
exports.verificarPassword = async (req, res, next) => {
   /** Nota; en una misma peticion estamos enviando dos paramestros que son leidos via req.params y req.body **/
    // console.log(req.params);
    // console.log(req.body);
    
    //Obteener
    const {url} = req.params;
    const {password} = req.body;

    // COnsultar por enlace
    const enlace = await Enlaces.findOne({url});

    // Verificar el password
    if(bcrypt.compareSync(password, enlace.password)){
        // Permitir al usuario descargar el usuario
        
         //Enviar al siguiente middleware 
        next();
    }else{
        return res.status(401).json({msg: 'Password Incorrecto'})
    }
}

// Obtener enlace
exports.obtenerEnlace = async (req, res, next) =>{
    const { url } = req.params;

    // Verificar si existe el enlace
    //const enlace = await Enlaces.findOne({url: req.params.url});
    const enlace = await Enlaces.findOne({url});

    if(!enlace){
        res.status(404).json({msg: "Ese enlace no existe"});
        return next();
    }

        // Si el enlace existe
            res.json({archivo: enlace.nombre, password: false});
        //console.log(enlace);

       next();
}