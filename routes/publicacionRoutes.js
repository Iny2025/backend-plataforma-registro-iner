const express = require('express');
const publicacionController = require('../controllers/publicacionController'); // Ajusta la ruta según tu estructura de proyecto

const router = express.Router();

// Definir las rutas para PUBLICACION
router.post('/', publicacionController.createPublicacion);                              // Crear una nueva publicación
router.get('/', publicacionController.getPublicacionesByComunaAndCategoria);            // Obtener publicaciones por ID_COMUNA e ID_CATEGORIA query
router.get('/servicio/:id', publicacionController.getServicioById);                     // Obtener datos de un servicio por ID_SERVICIO
router.delete('/:id', publicacionController.deletePublicacion);                         // Eliminar una publicación por ID_SERVICIO

module.exports = router;