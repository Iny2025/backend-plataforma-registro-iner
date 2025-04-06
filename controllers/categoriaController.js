// Importar el modelo Categoria
const Categoria = require('../models/categoriaModel');

// Controlador de Categoria
const categoriaController = {
  /**
   * Devuelve todas las categorías.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllCategorias: async (req, res) => {
    try {
      const categorias = await Categoria.getAllCategorias();
      if (categorias.length === 0) {
        return res.status(404).json({ message: 'No se encontraron categorías' });
      }
      res.status(200).json(categorias);
    } catch (error) {
      console.error('Error en getAllCategorias:', error);
      res.status(500).json({ message: 'Error al obtener las categorías' });
    }
  },

  /**
   * Ingresa una nueva categoría.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createCategoria: async (req, res) => {
    try {
      const { descripcionCategoria } = req.body;

      if (!descripcionCategoria) {
        return res.status(400).json({ message: 'La descripción de la categoría es requerida' });
      }

      const nuevaCategoria = await Categoria.createCategoria(descripcionCategoria);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      console.error('Error en createCategoria:', error);
      res.status(500).json({ message: 'Error al crear la categoría' });
    }
  },

  /**
   * Devuelve una categoría por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getCategoriaById: async (req, res) => {
    try {
      const { idCategoria } = req.params;

      if (!idCategoria) {
        return res.status(400).json({ message: 'El ID de la categoría es requerido' });
      }

      const categoria = await Categoria.getCategoriaById(idCategoria);
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      res.status(200).json(categoria);
    } catch (error) {
      console.error('Error en getCategoriaById:', error);
      res.status(500).json({ message: 'Error al obtener la categoría' });
    }
  },
};

module.exports = categoriaController;