// Importar dependencias
const express = require('express');
const estadoContratoController = require('../controllers/estadoContratoController');

// Crear un router de Express
const router = express.Router();

// Definir las rutas
router.get('/estados-contrato', estadoContratoController.getAllEstadosContrato);
router.post('/estados-contrato', estadoContratoController.createEstadoContrato);
router.get('/estados-contrato/:id', estadoContratoController.getEstadoContratoById);
router.put('/estados-contrato/:id', estadoContratoController.updateEstadoContrato);
router.delete('/estados-contrato/:id', estadoContratoController.deleteEstadoContrato);

// Exportar el router
module.exports = router;