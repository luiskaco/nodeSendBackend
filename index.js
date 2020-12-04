const express = require('express');
// Importar Funcion de conexion
const conectarDB = require('./config/db');

// Importar cors
const cors = require('cors');

// Creamos el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

console.log(`Comenzando NodeSend`);


//console.log(process.env.FRONTEND_URL);
// Restringr Cors a un solo app
    const opcionesCors = {
        origin: process.env.FRONTEND_URL
    }

// Habiltitar cosrs

app.use(cors(opcionesCors));


// Puerto del app
const port = process.env.PORT || 4000; // Heroku lo asigna automatico, si estamos en local asiganmos el 4000

//Habilitar leer los valores de JSON
app.use(express.json());

// Habilitar carpeta publica
app.use(express.static('uploads'));


// Rutas del APP
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto -> ${port}`);
});
