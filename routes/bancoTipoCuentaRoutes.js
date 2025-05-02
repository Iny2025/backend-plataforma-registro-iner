const express = require('express');
const bancoTipoCuentaController = require('../controllers/bancoTipoCuentaController'); // Ajusta la ruta según tu estructura de proyecto

const router = express.Router();

// Rutas para BANCO
router.post('/bancos', bancoTipoCuentaController.createBanco);          // Crear un nuevo banco
router.get('/bancos/:id', bancoTipoCuentaController.getBancoById);      // Obtener un banco por ID_BANCO
router.get('/bancos', bancoTipoCuentaController.getAllBancos);          // Obtener todos los bancos
router.put('/bancos/:id', bancoTipoCuentaController.updateBanco);       // Actualizar un banco por ID_BANCO
router.delete('/bancos/:id', bancoTipoCuentaController.deleteBanco);    // Eliminar un banco por ID_BANCO

// Rutas para TIPO_CUENTA
router.post('/tipos-cuenta', bancoTipoCuentaController.createTipoCuenta);      // Crear un nuevo tipo de cuenta
router.get('/tipos-cuenta/:id', bancoTipoCuentaController.getTipoCuentaById);  // Obtener un tipo de cuenta por ID_TIPO_CUENTA
router.get('/tipos-cuenta', bancoTipoCuentaController.getAllTiposCuenta);      // Obtener todos los tipos de cuenta
router.put('/tipos-cuenta/:id', bancoTipoCuentaController.updateTipoCuenta);   // Actualizar un tipo de cuenta por ID_TIPO_CUENTA
router.delete('/tipos-cuenta/:id', bancoTipoCuentaController.deleteTipoCuenta); // Eliminar un tipo de cuenta por ID_TIPO_CUENTA

module.exports = router;