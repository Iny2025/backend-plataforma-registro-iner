// Importar dependencias
const express = require('express');
const valoracionServicioUsuarioController = require('../controllers/valoracionServicioController');

// Crear un router de Express
const router = express.Router();

// Definir las rutas
router.post('/valoraciones', valoracionServicioUsuarioController.createValoracion);
router.get('/valoraciones', valoracionServicioUsuarioController.getAllValoraciones);
router.get('/valoraciones/:id_servicio/:id_usuario/:id_contrato', valoracionServicioUsuarioController.getValoracionById);
router.put('/valoraciones/:id_servicio/:id_usuario/:id_contrato', valoracionServicioUsuarioController.updateValoracion);
router.delete('/valoraciones/:id_servicio/:id_usuario/:id_contrato', valoracionServicioUsuarioController.deleteValoracion);
router.get('/valoraciones/promedio/servicio/:id_servicio', valoracionServicioUsuarioController.getPromedioValoracionesByServicio);
router.put('/valoraciones/promedio/servicio/:id_servicio', valoracionServicioUsuarioController.updateValoracionPromServicio);
router.get('/valoraciones/promedio/iner/:id_iner', valoracionServicioUsuarioController.getPromedioValoracionesByIner);
router.put('/valoraciones/promedio/iner/:id_iner', valoracionServicioUsuarioController.updateValoracionPromIner);

// Exportar el router
module.exports = router;