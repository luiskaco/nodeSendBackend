// importar mongoose
const mongoose = require('mongoose');
// importanmos el que se va encargar de leer las variables de entornos
require('dotenv').config({ path: 'variables.env'});


const conectarDB = async () => {
    try {   
        // Conectando a la BASE de Datos
        await mongoose.connect( process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        } );

        console.log('DB Conectada');
        
    } catch (error) {
        console.log('Hubo un error');
        console.log(error);
        // Detenemos el servidor
        process.exit(1); 
    }
}

module.exports = conectarDB;