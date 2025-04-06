// Importar dependencias
const express = require('express');
const inerController = require('../controllers/inerController');

// Crear un router de Express
const router = express.Router();

// Definir las rutas
router.post('/', inerController.createIner);              // Crear un nuevo INER
router.get('/:id', inerController.getInerById);           // Obtener un INER por ID
router.put('/:id', inerController.updateIner);            // Actualizar un INER por ID
router.delete('/:id', inerController.deleteIner);         // Eliminar un INER por ID
router.get('/', inerController.getAllIner);               // Obtener todos los INER

// Exportar el router
module.exports = router;