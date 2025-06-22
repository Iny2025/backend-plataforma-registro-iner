// Importar dependencias
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const pool = require('./config/bd.confing'); //
const ubicacionRoutes = require('./routes/ubicacionRoutes');
const inerRoutes = require('./routes/inerRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const notificacionRoutes = require('./routes/notificacionRoutes');
const valoracionUsuarioInerRoutes = require('./routes/valoracionUsuarioRoutes');
const tarifaRoutes = require('./routes/tarifaRoutes');
const servicioRoutes = require('./routes/servicioRoutes');
const publicacionRoutes = require('./routes/publicacionRoutes');
const bancoTipoCuentaRoutes = require('./routes/bancoTipoCuentaRoutes');
const cuentaInerRoutes = require('./routes/cuentaInerRoutes');
const estadoContratoRoutes = require('./routes/estadoContratoRoutes');
const contratoRoutes = require('./routes/contratoRoutes');
const valoracionServicioUsuarioRoutes = require('./routes/valoracionServicioRoutes');
const confirmacionRoutes = require('./routes/comfrimacionPagoCobroRoutes');
const pagoRoutes = require('./routes/PagosRoutes');   
const geocodeRoutes = require('./routes/geocode');


// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Inicializar la aplicación Express
const app = express();

app.use(cors());

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Usar las rutas con prefijos base
app.use('/api/ubicacion', ubicacionRoutes);
app.use('/api/iner', inerRoutes);
app.use('/api', categoriaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/valoraciones', valoracionUsuarioInerRoutes);
app.use('/api/tarifas', tarifaRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/publicaciones', publicacionRoutes);
app.use('/api/datostipocuenta', bancoTipoCuentaRoutes);
app.use('/api/cuentas-iner', cuentaInerRoutes);
app.use('/api/estado-contrato', estadoContratoRoutes);
app.use('/api/contrato', contratoRoutes);
app.use('/api/valoracion-servicio-usuario', valoracionServicioUsuarioRoutes);
app.use('/api/confirmacion', confirmacionRoutes);
app.use('/api/pagos', pagoRoutes); 
app.use('/api', geocodeRoutes);


// Exportar la aplicación configurada
module.exports = app;