// Importar el modelo Servicio
const Servicio = require('../models/servicioModel'); // Ajusta la ruta según tu estructura de proyecto

const servicioController = {
  /**
   * Crea un nuevo servicio.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createServicio: async (req, res) => {
    try {
      const {
        titulo_servicio,
        subtitulo_servicio,
        id_tarifa,
        id_categoria,
        descripcion_servicio,
        valoracion_prom_servicio,
        estado_publicacion,
        id_iner
      } = req.body;

      // Validar campos requeridos
      if (!titulo_servicio || !id_tarifa || !id_categoria || !id_iner) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: titulo_servicio, id_tarifa, id_categoria o id_iner' 
        });
      }

      const newServicio = {
        titulo_servicio,
        subtitulo_servicio,
        id_tarifa,
        id_categoria,
        descripcion_servicio,
        valoracion_prom_servicio,
        estado_publicacion,
        id_iner
      };

      const result = await Servicio.createServicio(newServicio);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createServicio:', error);
      res.status(500).json({ 
        message: 'Error al crear el servicio', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todos los servicios de un INER por su ID_INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getServiciosByInerId: async (req, res) => {
    try {
      const { idIner } = req.params;

      if (!idIner) {
        return res.status(400).json({ message: 'El ID del INER es requerido' });
      }

      const servicios = await Servicio.getServiciosByInerId(idIner);
      if (servicios.length === 0) {
        return res.status(404).json({ message: 'No se encontraron servicios para este INER' });
      }
      res.status(200).json(servicios);
    } catch (error) {
      console.error('Error en getServiciosByInerId:', error);
      res.status(500).json({ 
        message: 'Error al obtener los servicios del INER', 
        error: error.message 
      });
    }
  },

  /**
   * Actualiza el ESTADO_PUBLICACION de un servicio por su ID_SERVICIO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateEstadoPublicacion: async (req, res) => {
    try {
      const { id } = req.params;
      const { estado_publicacion } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID del servicio es requerido' });
      }
      if (estado_publicacion === undefined) {
        return res.status(400).json({ message: 'El campo estado_publicacion es requerido' });
      }

      const result = await Servicio.updateEstadoPublicacion(id, estado_publicacion);
      if (!result) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateEstadoPublicacion:', error);
      res.status(500).json({ 
        message: 'Error al actualizar el estado de publicación', 
        error: error.message 
      });
    }
  },

  /**
   * Edita un servicio por su ID_SERVICIO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateServicio: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        titulo_servicio,
        subtitulo_servicio,
        id_tarifa,
        id_categoria,
        descripcion_servicio,
        valoracion_prom_servicio,
        estado_publicacion,
        id_iner
      } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID del servicio es requerido' });
      }
      if (!titulo_servicio || !id_tarifa || !id_categoria || !id_iner) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: titulo_servicio, id_tarifa, id_categoria o id_iner' 
        });
      }

      const updatedServicio = {
        titulo_servicio,
        subtitulo_servicio,
        id_tarifa,
        id_categoria,
        descripcion_servicio,
        valoracion_prom_servicio,
        estado_publicacion,
        id_iner
      };

      const result = await Servicio.updateServicio(id, updatedServicio);
      if (!result) {
        return res.status(404).json({ message: 'Servicio no encontrado' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateServicio:', error);
      res.status(500).json({ 
        message: 'Error al actualizar el servicio', 
        error: error.message 
      });
    }
  }
};

module.exports = servicioController;