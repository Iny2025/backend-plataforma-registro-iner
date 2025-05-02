// Importar dependencias
const express = require('express');
const servicioController = require('../controllers/servicioController'); // Ajusta la ruta según tu estructura de proyecto

// Crear un router de Express
const router = express.Router();

// Definir las rutas para SERVICIO
router.post('/', servicioController.createServicio);                   // Crear un nuevo servicio
router.get('/iner/:idIner', servicioController.getServiciosByInerId); // Obtener todos los servicios por ID_INER
router.patch('/:id/estado', servicioController.updateEstadoPublicacion); // Actualizar el estado_publicacion por ID_SERVICIO
router.put('/:id', servicioController.updateServicio);                 // Editar un servicio por ID_SERVICIO

// Exportar el router
module.exports = router;