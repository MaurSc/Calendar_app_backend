
const express = require('express');
const { dbConecction } = require('./database/config');
const cors = require('cors');

require('dotenv').config();

//! Crear Servidor de EXPRESS
const app = express();

//! Coneccion base de datos
dbConecction();

//!CORS
app.use(cors());

//! Directorio publico
//*USE es un middleware, se ejectua cuando pasan por este lugar del lado del srv
app.use( express.static('public') );

//! Lectura y parseo del body
//*Peticiones que lleguen en formato Json las proceso aca.
app.use( express.json() );

//! Rutas
//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'));
//TODO: CRUD // events 
app.use('/api/events', require('./routes/events'));


//! Escuchar peticiones
app.listen( process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});