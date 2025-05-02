// Importar dependencias
const express = require('express');
const valoracionUsuarioInerController = require('../controllers/valoracionUsuarioController'); // Ajusta la ruta según tu estructura de proyecto

// Crear un router de Express
const router = express.Router();

// Definir las rutas para VALORACION_USUARIO_INER

router.post('/', valoracionUsuarioInerController.createValoracion);        
router.get('/promedio/:idUsuario', valoracionUsuarioInerController.getPromedioValoracionesByUsuarioId); // Obtener el promedio de valoraciones por ID_USUARIO
router.get('/usuario/:idUsuario', valoracionUsuarioInerController.getValoracionesByUsuarioId);          // Obtener todas las valoraciones por ID_USUARIO             // Crear una nueva valoración
router.get('/:idIner/:idUsuario', valoracionUsuarioInerController.getValoracionById);   // Obtener una valoración por ID_INER e ID_USUARIO
router.get('/', valoracionUsuarioInerController.getAllValoraciones);                    // Obtener todas las valoraciones
router.put('/:idIner/:idUsuario', valoracionUsuarioInerController.updateValoracion);    // Actualizar una valoración por ID_INER e ID_USUARIO
router.delete('/:idIner/:idUsuario', valoracionUsuarioInerController.deleteValoracion); // Eliminar una valoración por ID_INER e ID_USUARIO

// Exportar el router
module.exports = router;