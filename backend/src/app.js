const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const usuarios = require('./modulos/usuarios/rutas');
const auth = require('./modulos/auth/rutas');
const error = require('./red/errores');
const expedientes = require('./modulos/expedientes/rutas');
const evidencias = require('./modulos/evidencias/rutas');

const app = express();

//Middleware

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({encoded: true}))

// Configuración
app.set('port', config.app.port);

// Habilitar CORS para todas las rutas
app.use(cors());

// Rutas

app.use('/api/evidencias', evidencias);
app.use('/api/expedientes', expedientes);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use(error);

module.exports = app;
