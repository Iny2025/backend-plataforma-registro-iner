// Importar dependencias
const express = require('express');
const notificacionController = require('../controllers/notificacionController'); // Ajusta la ruta según tu estructura de proyecto

// Crear un router de Express
const router = express.Router();

// Definir las rutas para NOTIFICACION_USUARIO
router.post('/usuario', notificacionController.createNotificacionUsuario);        // Crear una nueva notificación para un usuario
router.get('/usuario/:id', notificacionController.getNotificacionesByUsuarioId);  // Obtener todas las notificaciones de un usuario por ID

// Definir las rutas para NOTIFICACION_INER
router.post('/iner', notificacionController.createNotificacionIner);              // Crear una nueva notificación para un INER
router.get('/iner/:id', notificacionController.getNotificacionesByInerId);        // Obtener todas las notificaciones de un INER por ID

// Exportar el router
module.exports = router;