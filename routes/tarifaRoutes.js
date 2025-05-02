// Importar dependencias
const express = require('express');
const tarifaController = require('../controllers/tarifaController'); 

// Crear un router de Express
const router = express.Router();

// Definir las rutas para TARIFA
router.post('/', tarifaController.createTarifa);                  // Crear una nueva tarifa
router.get('/iner/:idIner', tarifaController.getTarifasByInerId); // Obtener todas las tarifas por ID_INER
router.get('/:id', tarifaController.getTarifaById);               // Obtener una tarifa por ID_TARIFA
router.get('/', tarifaController.getAllTarifas);                  // Obtener todas las tarifas
router.put('/:id', tarifaController.updateTarifa);                // Actualizar una tarifa por ID_TARIFA
router.delete('/:id', tarifaController.deleteTarifa);             // Eliminar una tarifa por ID_TARIFA


// Exportar el router
module.exports = router;