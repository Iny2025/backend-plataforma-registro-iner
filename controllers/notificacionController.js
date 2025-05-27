// Importar el modelo Notificacion
const Notificacion = require('../models/notificacionModel'); 

const notificacionController = {
  /**
   * Crea una nueva notificación para un usuario.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createNotificacionUsuario: async (req, res) => {
    try {
      const { id_usuario, descripcion_notificacion } = req.body;

      // Validar campos requeridos
      if (!id_usuario || !descripcion_notificacion) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: id_usuario o descripcion_notificacion' 
        });
      }

      const newNotificacion = {
        id_usuario,
        descripcion_notificacion
      };

      const result = await Notificacion.createNotificacionUsuario(newNotificacion);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createNotificacionUsuario:', error);
      res.status(500).json({ 
        message: 'Error al crear la notificación para el usuario', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todas las notificaciones de un usuario por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getNotificacionesByUsuarioId: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del usuario es requerido' });
      }

      const notificaciones = await Notificacion.getNotificacionesByUsuarioId(id);
      if (notificaciones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron notificaciones para este usuario' });
      }
      res.status(200).json(notificaciones);
    } catch (error) {
      console.error('Error en getNotificacionesByUsuarioId:', error);
      res.status(500).json({ 
        message: 'Error al obtener las notificaciones del usuario', 
        error: error.message 
      });
    }
  },

  /**
   * Crea una nueva notificación para un INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createNotificacionIner: async (req, res) => {
    try {
      const { id_iner, descripcion_noti_iner } = req.body;

      // Validar campos requeridos
      if (!id_iner || !descripcion_noti_iner) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: id_iner o descripcion_noti_iner' 
        });
      }

      const newNotificacion = {
        id_iner,
        descripcion_noti_iner
      };

      const result = await Notificacion.createNotificacionIner(newNotificacion);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createNotificacionIner:', error);
      res.status(500).json({ 
        message: 'Error al crear la notificación para el INER', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todas las notificaciones de un INER por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getNotificacionesByInerId: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del INER es requerido' });
      }

      const notificaciones = await Notificacion.getNotificacionesByInerId(id);
      if (notificaciones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron notificaciones para este INER' });
      }
      res.status(200).json(notificaciones);
    } catch (error) {
      console.error('Error en getNotificacionesByInerId:', error);
      res.status(500).json({ 
        message: 'Error al obtener las notificaciones del INER', 
        error: error.message 
      });
    }
  },
  /**
   * Elimina una notificación de usuario por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteNotificacionUsuario: async (req, res) => {
    try {
      const { id } = req.params;

      // Validar que el ID esté presente
      if (!id) {
        return res.status(400).json({ message: 'El ID de la notificación es requerido' });
      }

      // Llamar al modelo para eliminar la notificación
      await Notificacion.deleteNotificacionUsuario(id);
      res.status(200).json({ message: `Notificación con ID ${id} eliminada correctamente` });
    } catch (error) {
      console.error('Error en deleteNotificacionUsuario:', error);
      res.status(500).json({ 
        message: 'Error al eliminar la notificación para el usuario', 
        error: error.message 
      });
    }
  },

  /**
   * Elimina una notificación de INER por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteNotificacionIner: async (req, res) => {
    try {
      const { id } = req.params;

      // Validar que el ID esté presente
      if (!id) {
        return res.status(400).json({ message: 'El ID de la notificación es requerido' });
      }

      // Llamar al modelo para eliminar la notificación
      await Notificacion.deleteNotificacionIner(id);
      res.status(200).json({ message: `Notificación con ID ${id} eliminada correctamente` });
    } catch (error) {
      console.error('Error en deleteNotificacionIner:', error);
      res.status(500).json({ 
        message: 'Error al eliminar la notificación para el INER', 
        error: error.message 
      });
    }
  }
};

module.exports = notificacionController;