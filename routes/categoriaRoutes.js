// Importar dependencias
const express = require('express');
const categoriaController = require('../controllers/categoriaController');

// Crear un router de Express
const router = express.Router();

// Definir las rutas
router.get('/categorias', categoriaController.getAllCategorias);
router.post('/categorias', categoriaController.createCategoria);
router.get('/categorias/:idCategoria', categoriaController.getCategoriaById);

// Exportar el router
module.exports = router;