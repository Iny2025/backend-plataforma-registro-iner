// Importar el modelo ValoracionUsuarioIner
const ValoracionUsuarioIner = require('../models/valoracionUsuarioModel'); // Ajusta la ruta según tu estructura de proyecto

const valoracionUsuarioInerController = {
  /**
   * Crea una nueva valoración.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createValoracion: async (req, res) => {
    try {
      const { id_iner, id_usuario, id_contrato, valoracion_usuario } = req.body;

      // Validar campos requeridos
      if (!id_iner || !id_usuario || !id_contrato || !valoracion_usuario) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: id_iner, id_usuario, id_contrato o valoracion_usuario' 
        });
      }

      const newValoracion = {
        id_iner,
        id_usuario,
        id_contrato,
        valoracion_usuario
      };

      const result = await ValoracionUsuarioIner.createValoracion(newValoracion);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createValoracion:', error);
      res.status(500).json({ 
        message: 'Error al crear la valoración', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene una valoración por su clave primaria compuesta (ID_INER, ID_USUARIO, ID_CONTRATO).
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getValoracionById: async (req, res) => {
    try {
      const { idIner, idUsuario, idContrato } = req.params;

      if (!idIner || !idUsuario || !idContrato) {
        return res.status(400).json({ 
          message: 'Los IDs (idIner, idUsuario e idContrato) son requeridos' 
        });
      }

      const valoracion = await ValoracionUsuarioIner.findValoracionById(idIner, idUsuario, idContrato);
      if (!valoracion) {
        return res.status(404).json({ message: 'Valoración no encontrada' });
      }
      res.status(200).json(valoracion);
    } catch (error) {
      console.error('Error en getValoracionById:', error);
      res.status(500).json({ 
        message: 'Error al obtener la valoración', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todas las valoraciones.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllValoraciones: async (req, res) => {
    try {
      const valoraciones = await ValoracionUsuarioIner.getAllValoraciones();
      if (valoraciones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron valoraciones' });
      }
      res.status(200).json(valoraciones);
    } catch (error) {
      console.error('Error en getAllValoraciones:', error);
      res.status(500).json({ 
        message: 'Error al obtener todas las valoraciones', 
        error: error.message 
      });
    }
  },

  /**
   * Actualiza una valoración por su clave primaria compuesta (ID_INER, ID_USUARIO, ID_CONTRATO).
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateValoracion: async (req, res) => {
    try {
      const { idIner, idUsuario, idContrato } = req.params;
      const { valoracion_usuario } = req.body;

      if (!idIner || !idUsuario || !idContrato) {
        return res.status(400).json({ 
          message: 'Los IDs (idIner, idUsuario e idContrato) son requeridos' 
        });
      }
      if (!valoracion_usuario) {
        return res.status(400).json({ 
          message: 'El campo valoracion_usuario es requerido' 
        });
      }

      const updatedValoracion = { valoracion_usuario };
      const result = await ValoracionUsuarioIner.updateValoracion(idIner, idUsuario, idContrato, updatedValoracion);
      if (!result) {
        return res.status(404).json({ message: 'Valoración no encontrada' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateValoracion:', error);
      res.status(500).json({ 
        message: 'Error al actualizar la valoración', 
        error: error.message 
      });
    }
  },

  /**
   * Elimina una valoración por su clave primaria compuesta (ID_INER, ID_USUARIO, ID_CONTRATO).
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteValoracion: async (req, res) => {
    try {
      const { idIner, idUsuario, idContrato } = req.params;

      if (!idIner || !idUsuario || !idContrato) {
        return res.status(400).json({ 
          message: 'Los IDs (idIner, idUsuario e idContrato) son requeridos' 
        });
      }

      const deleted = await ValoracionUsuarioIner.deleteValoracion(idIner, idUsuario, idContrato);
      if (!deleted) {
        return res.status(404).json({ message: 'Valoración no encontrada' });
      }
      res.status(200).json({ message: 'Valoración eliminada con éxito' });
    } catch (error) {
      console.error('Error en deleteValoracion:', error);
      res.status(500).json({ 
        message: 'Error al eliminar la valoración', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene el promedio de valoraciones para un usuario por su ID_USUARIO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getPromedioValoracionesByUsuarioId: async (req, res) => {
    try {
      const { idUsuario } = req.params;

      if (!idUsuario) {
        return res.status(400).json({ message: 'El ID del usuario es requerido' });
      }

      const promedio = await ValoracionUsuarioIner.getPromedioValoracionesByUsuarioId(idUsuario);
      if (promedio === null) {
        return res.status(200).json({ 
          message: 'No hay valoraciones para este usuario', 
          promedio: 0 
        });
      }
      res.status(200).json({ promedio });
    } catch (error) {
      console.error('Error en getPromedioValoracionesByUsuarioId:', error);
      res.status(500).json({ 
        message: 'Error al obtener el promedio de valoraciones', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todas las valoraciones de un usuario por su ID_USUARIO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getValoracionesByUsuarioId: async (req, res) => {
    try {
      const { idUsuario } = req.params;

      if (!idUsuario) {
        return res.status(400).json({ message: 'El ID del usuario es requerido' });
      }

      const valoraciones = await ValoracionUsuarioIner.getValoracionesByUsuarioId(idUsuario);
      if (valoraciones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron valoraciones para este usuario' });
      }
      res.status(200).json(valoraciones);
    } catch (error) {
      console.error('Error en getValoracionesByUsuarioId:', error);
      res.status(500).json({ 
        message: 'Error al obtener las valoraciones del usuario', 
        error: error.message 
      });
    }
  }
};

module.exports = valoracionUsuarioInerController;