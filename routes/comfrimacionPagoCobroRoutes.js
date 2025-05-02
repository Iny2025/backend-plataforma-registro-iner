// Importar dependencias
const express = require('express');
const confirmacionController = require('../controllers/confirmacionPagoCobroController');

// Crear un router de Express
const router = express.Router();

// Definir las rutas
router.post('/confirmacion-cobro', confirmacionController.createConfirmacionCobro);
router.post('/confirmacion-pago', confirmacionController.createConfirmacionPago);
router.put('/confirmacion-pago', confirmacionController.setConfirmacionPagoTrue);
router.put('/confirmacion-cobro/:id_contrato/:id_iner', confirmacionController.updateConfirmacionCobro);

// Exportar el router
module.exports = router;