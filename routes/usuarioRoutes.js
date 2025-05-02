// Importar dependencias
const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const verifyToken = require('../middleware/auth');

// Crear un router de Express
const router = express.Router();

// Definir las rutas
router.post('/register', usuarioController.registerUsuario); // POST /api/usuarios/register (pública)
router.post('/login', usuarioController.loginUsuario); // POST /api/usuarios/login (pública)
router.get('/', verifyToken, usuarioController.getAllUsuarios); // GET /api/usuarios (protegida)
router.get('/:id', verifyToken, usuarioController.getUsuarioById); // GET /api/usuarios/:id (protegida)
router.put('/:id', verifyToken, usuarioController.updateUsuario); // PUT /api/usuarios/:id (protegida)
router.delete('/:id', verifyToken, usuarioController.deleteUsuario); // DELETE /api/usuarios/:id (protegida)
router.get('/rut/:rut', verifyToken, usuarioController.getUsuarioByRut); // GET /api/usuarios/rut/:rut (protegida)

// Exportar el router
module.exports = router;