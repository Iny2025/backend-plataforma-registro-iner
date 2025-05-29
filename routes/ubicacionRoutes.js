// Importar dependencias
const express = require('express');
const ubicacionController = require('../controllers/ubicacionController');

// Crear un router de Express
const router = express.Router();

// Definir las rutas
router.get('/paises', ubicacionController.getAllPaises);
router.get('/regiones/:descripcionPais', ubicacionController.getRegionesByPais);
router.get('/comunas/:descripcionRegion', ubicacionController.getComunasByRegion);
router.get('/paises/idPais/:idPais/', ubicacionController.getPaisById);
router.get('/regiones/idRegion/:idRegion/', ubicacionController.getRegionById);
router.get('/comunas/idComuna/:idComuna/', ubicacionController.getComunaById);

// Exportar el router
module.exports = router;