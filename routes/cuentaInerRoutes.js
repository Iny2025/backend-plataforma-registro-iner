const express = require('express');
const cuentaInerController = require('../controllers/cunetaInerController'); 

const router = express.Router();

// Rutas para CUENTA_INER
router.post('/', cuentaInerController.createCuentaIner);                    // Crear una nueva cuenta INER
router.get('/:rut', cuentaInerController.getCuentaInerByRut);               // Obtener una cuenta por RUT_INER
router.get('/', cuentaInerController.getAllCuentasIner);                    // Obtener todas las cuentas INER
router.put('/:rut', cuentaInerController.updateCuentaIner);                 // Actualizar una cuenta por RUT_INER
router.delete('/:rut', cuentaInerController.deleteCuentaIner);              // Eliminar una cuenta por RUT_INER
router.get('/iner/:idIner', cuentaInerController.hasCuentaByIdIner);        // Verificar si un INER tiene una cuenta por ID_INER

module.exports = router;