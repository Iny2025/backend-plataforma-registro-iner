// Importar dependencias
const express = require('express');
const contratoController = require('../controllers/contratoController');

// Crear un router de Express
const router = express.Router();

// Definir las rutas
router.post('/contratos', contratoController.createContrato);
router.get('/contratos/usuario/:id_usuario', contratoController.getContratosByUsuario);
router.get('/contratos/:id', contratoController.getContratoById);
router.put('/contratos/:id', contratoController.updateContrato);
router.delete('/contratos/:id', contratoController.deleteContrato);
router.put('/contratos/:id/estado', contratoController.updateEstadoContrato);

// Exportar el router
module.exports = router;