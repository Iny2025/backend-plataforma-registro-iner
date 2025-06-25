// Importar dependencias
const express = require('express');
const valoracionUsuarioInerController = require('../controllers/valoracionUsuarioController'); // Ajusta la ruta según tu estructura de proyecto

// Crear un router de Express
const router = express.Router();

// Definir las rutas para VALORACION_USUARIO_INER
router.post('/', valoracionUsuarioInerController.createValoracion); // Crear una nueva valoración
router.get('/promedio/:idUsuario', valoracionUsuarioInerController.getPromedioValoracionesByUsuarioId); // Obtener el promedio de valoraciones por ID_USUARIO
router.get('/usuario/:idUsuario', valoracionUsuarioInerController.getValoracionesByUsuarioId); // Obtener todas las valoraciones por ID_USUARIO
router.get('/:idIner/:idUsuario/:idContrato', valoracionUsuarioInerController.getValoracionById); // Obtener una valoración por ID_INER, ID_USUARIO e ID_CONTRATO
router.get('/', valoracionUsuarioInerController.getAllValoraciones); // Obtener todas las valoraciones
router.put('/:idIner/:idUsuario/:idContrato', valoracionUsuarioInerController.updateValoracion); // Actualizar una valoración por ID_INER, ID_USUARIO e ID_CONTRATO
router.delete('/:idIner/:idUsuario/:idContrato', valoracionUsuarioInerController.deleteValoracion); // Eliminar una valoración por ID_INER, ID_USUARIO e ID_CONTRATO

// Exportar el router
module.exports = router;