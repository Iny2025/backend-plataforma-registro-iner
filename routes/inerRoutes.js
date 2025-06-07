// Importar dependencias
const express = require('express');
const inerController = require('../controllers/inerController');
const verifyToken = require('../middleware/auth');

// Crear un router de Express
const router = express.Router();

// Definir las rutas
router.post('/register', inerController.registerIner); // POST /api/iners/register (pública)
router.post('/login', inerController.loginIner); // POST /api/iners/login (pública)
router.get('/', verifyToken, inerController.getAllIner); // GET /api/iners (protegida)
router.get('/:id', inerController.getInerById); // GET /api/iners/:id (protegida)
router.put('/:id', verifyToken, inerController.updateIner); // PUT /api/iners/:id (protegida)
router.delete('/:id', verifyToken, inerController.deleteIner); // DELETE /api/iners/:id (protegida)

// Exportar el router
module.exports = router;