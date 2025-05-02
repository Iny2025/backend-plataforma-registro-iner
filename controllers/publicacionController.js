const Publicacion = require('../models/publicacionModel'); // Ajusta la ruta según tu estructura de proyecto

const publicacionController = {
  /**
   * Crea una nueva publicación.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createPublicacion: async (req, res) => {
    try {
      const {
        id_servicio,
        id_iner,
        id_pais,
        id_region,
        id_comuna,
        direccion_publicacion,
        descuento_publicacion,
        contacto_publicacion
      } = req.body;

      // Validar campos requeridos
      if (!id_servicio || !id_iner || !id_pais || !id_region || !id_comuna) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: id_servicio, id_iner, id_pais, id_region o id_comuna' 
        });
      }

      const newPublicacion = {
        id_servicio,
        id_iner,
        id_pais,
        id_region,
        id_comuna,
        direccion_publicacion,
        descuento_publicacion,
        contacto_publicacion
      };

      const result = await Publicacion.createPublicacion(newPublicacion);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createPublicacion:', error);
      res.status(500).json({ 
        message: 'Error al crear la publicación', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene publicaciones por ID_COMUNA y ID_CATEGORIA.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getPublicacionesByComunaAndCategoria: async (req, res) => {
    try {
      const { idComuna, idCategoria } = req.query;

      if (!idComuna || !idCategoria) {
        return res.status(400).json({ 
          message: 'Los parámetros idComuna e idCategoria son requeridos' 
        });
      }

      const publicaciones = await Publicacion.getPublicacionesByComunaAndCategoria(idComuna, idCategoria);
      if (publicaciones.length === 0) {
        return res.status(404).json({ 
          message: 'No se encontraron publicaciones para esta comuna y categoría' 
        });
      }
      res.status(200).json(publicaciones);
    } catch (error) {
      console.error('Error en getPublicacionesByComunaAndCategoria:', error);
      res.status(500).json({ 
        message: 'Error al obtener las publicaciones', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene los datos de un servicio por su ID_SERVICIO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getServicioById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del servicio es requerido' });
      }

      const servicio = await Publicacion.getServicioById(id);
      if (!servicio) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      res.status(200).json(servicio);
    } catch (error) {
      console.error('Error en getServicioById:', error);
      res.status(500).json({ 
        message: 'Error al obtener el servicio', 
        error: error.message 
      });
    }
  },

  /**
   * Elimina una publicación por su ID_SERVICIO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deletePublicacion: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del servicio es requerido' });
      }

      const deleted = await Publicacion.deletePublicacion(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      res.status(200).json({ message: 'Publicación eliminada con éxito' });
    } catch (error) {
      console.error('Error en deletePublicacion:', error);
      res.status(500).json({ 
        message: 'Error al eliminar la publicación', 
        error: error.message 
      });
    }
  }
};

module.exports = publicacionController;