// Importar dependencias
const express = require('express');
const dotenv = require('dotenv');
const pool = require('./config/bd.config'); // Ajusta la ruta si es necesario
const ubicacionRoutes = require('./routes/ubicacionRoutes');
const inerRoutes = require('./routes/inerRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const cors = require('cors');


app.use(cors());
// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Usar las rutas con prefijos base
app.use('/api/ubicacion', ubicacionRoutes);
app.use('/api/iner', inerRoutes);
app.use('/api', categoriaRoutes);

// Exportar la aplicación configurada
module.exports = app;