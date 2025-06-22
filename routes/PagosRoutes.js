const express = require('express');
const router = express.Router();
const pagoCtrl = require('../controllers/PagosController');

// Forma Pago
router.post('/formas-pago', pagoCtrl.createFormaPago);
router.get('/formas-pago', pagoCtrl.getAllFormaPago);
router.get('/formas-pago/:id', pagoCtrl.getFormaPagoById);
router.put('/formas-pago/:id', pagoCtrl.updateFormaPago);
router.delete('/formas-pago/:id', pagoCtrl.deleteFormaPago);

// Estado Pago
router.post('/estados-pago', pagoCtrl.createEstadoPago);
router.get('/estados-pago', pagoCtrl.getAllEstadoPago);
router.get('/estados-pago/:id', pagoCtrl.getEstadoPagoById);
router.put('/estados-pago/:id', pagoCtrl.updateEstadoPago);
router.delete('/estados-pago/:id', pagoCtrl.deleteEstadoPago);

// Pago
router.post('/pagos', pagoCtrl.createPago);
router.get('/pagos', pagoCtrl.getAllPagos);
router.get('/pagos/:id', pagoCtrl.getPagoById);
router.put('/pagos/:id', pagoCtrl.updatePago);
router.delete('/pagos/:id', pagoCtrl.deletePago);
router.get('/pagos/contrato/:id_contrato', pagoCtrl.getPagosByContrato);

module.exports = router;
