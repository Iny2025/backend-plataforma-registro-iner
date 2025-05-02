const ValoracionServicioUsuario = require('../models/valoracionServicioModel');

// Controlador de ValoracionServicioUsuario
const valoracionServicioUsuarioController = {
  /**
   * Crea una nueva valoración.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createValoracion: async (req, res) => {
    try {
      const { id_servicio, id_usuario, id_contrato, valoracion_servicio } = req.body;

      if (!id_servicio || !id_usuario || !id_contrato || !valoracion_servicio) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }

      const nuevaValoracion = await ValoracionServicioUsuario.createValoracion({
        id_servicio,
        id_usuario,
        id_contrato,
        valoracion_servicio
      });
      res.status(201).json(nuevaValoracion);
    } catch (error) {
      console.error('Error en createValoracion:', error);
      res.status(500).json({ message: 'Error al crear la valoración' });
    }
  },

  /**
   * Obtiene una valoración por su clave primaria.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Ob Alto de respuesta HTTP.
   */
  getValoracionById: async (req, res) => {
    try {
      const { id_servicio, id_usuario, id_contrato } = req.params;

      if (!id_servicio || !id_usuario || !id_contrato) {
        return res.status(400).json({ message: 'Los campos id_servicio, id_usuario e id_contrato son requeridos' });
      }

      const valoracion = await ValoracionServicioUsuario.getValoracionById({
        id_servicio,
        id_usuario,
        id_contrato
      });
      if (!valoracion) {
        return res.status(404).json({ message: 'Valoración no encontrada' });
      }
      res.status(200).json(valoracion);
    } catch (error) {
      console.error('Error en getValoracionById:', error);
      res.status(500).json({ message: 'Error al obtener la valoración' });
    }
  },

  /**
   * Devuelve todas las valoraciones.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllValoraciones: async (req, res) => {
    try {
      const valoraciones = await ValoracionServicioUsuario.getAllValoraciones();
      if (valoraciones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron valoraciones' });
      }
      res.status(200).json(valoraciones);
    } catch (error) {
      console.error('Error en getAllValoraciones:', error);
      res.status(500).json({ message: 'Error al obtener las valoraciones' });
    }
  },

  /**
   * Actualiza una valoración por su clave primaria.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateValoracion: async (req, res) => {
    try {
      const { id_servicio, id_usuario, id_contrato } = req.params;
      const { valoracion_servicio } = req.body;

      if (!id_servicio || !id_usuario || !id_contrato) {
        return res.status(400).json({ message: 'Los campos id_servicio, id_usuario e id_contrato son requeridos' });
      }

      if (!valoracion_servicio) {
        return res.status(400).json({ message: 'El campo valoracion_servicio es requerido' });
      }

      const valoracionActualizada = await ValoracionServicioUsuario.updateValoracion(
        { id_servicio, id_usuario, id_contrato },
        { valoracion_servicio }
      );
      if (!valoracionActualizada) {
        return res.status(404).json({ message: 'Valoración no encontrada' });
      }
      res.status(200).json(valoracionActualizada);
    } catch (error) {
      console.error('Error en updateValoracion:', error);
      res.status(500).json({ message: 'Error al actualizar la valoración' });
    }
  },

  /**
   * Elimina una valoración por su clave primaria.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteValoracion: async (req, res) => {
    try {
      const { id_servicio, id_usuario, id_contrato } = req.params;

      if (!id_servicio || !id_usuario || !id_contrato) {
        return res.status(400).json({ message: 'Los campos id_servicio, id_usuario e id_contrato son requeridos' });
      }

      const eliminado = await ValoracionServicioUsuario.deleteValoracion({
        id_servicio,
        id_usuario,
        id_contrato
      });
      if (!eliminado) {
        return res.status(404).json({ message: 'Valoración no encontrada' });
      }
      res.status(200).json({ message: 'Valoración eliminada correctamente' });
    } catch (error) {
      console.error('Error en deleteValoracion:', error);
      res.status(500).json({ message: 'Error al eliminar la valoración' });
    }
  },

  /**
   * Obtiene el promedio de valoraciones de un servicio.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getPromedioValoracionesByServicio: async (req, res) => {
    try {
      const { id_servicio } = req.params;

      if (!id_servicio) {
        return res.status(400).json({ message: 'El ID del servicio es requerido' });
      }

      const promedio = await ValoracionServicioUsuario.getPromedioValoracionesByServicio(id_servicio);
      if (!promedio) {
        return res.status(404).json({ message: 'No hay valoraciones para este servicio' });
      }
      res.status(200).json({ promedio });
    } catch (error) {
      console.error('Error en getPromedioValoracionesByServicio:', error);
      res.status(500).json({ message: 'Error al obtener el promedio de valoraciones' });
    }
  },

  /**
   * Actualiza la valoración promedio de un servicio.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateValoracionPromServicio: async (req, res) => {
    try {
      const { id_servicio } = req.params;

      if (!id_servicio) {
        return res.status(400).json({ message: 'El ID del servicio es requerido' });
      }

      const servicioActualizado = await ValoracionServicioUsuario.updateValoracionPromServicio(id_servicio);
      if (!servicioActualizado) {
        return res.status(404).json({ message: 'Servicio no encontrado o sin valoraciones' });
      }
      res.status(200).json(servicioActualizado);
    } catch (error) {
      console.error('Error en updateValoracionPromServicio:', error);
      res.status(500).json({ message: 'Error al actualizar la valoración promedio del servicio' });
    }
  },

  /**
   * Obtiene el promedio de valoraciones de un INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getPromedioValoracionesByIner: async (req, res) => {
    try {
      const { id_iner } = req.params;

      if (!id_iner) {
        return res.status(400).json({ message: 'El ID del INER es requerido' });
      }

      const promedio = await ValoracionServicioUsuario.getPromedioValoracionesByIner(id_iner);
      if (!promedio) {
        return res.status(404).json({ message: 'No hay valoraciones para este INER' });
      }
      res.status(200).json({ promedio });
    } catch (error) {
      console.error('Error en getPromedioValoracionesByIner:', error);
      res.status(500).json({ message: 'Error al obtener el promedio de valoraciones del INER' });
    }
  },

  /**
   * Actualiza la valoración promedio de un INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateValoracionPromIner: async (req, res) => {
    try {
      const { id_iner } = req.params;

      if (!id_iner) {
        return res.status(400).json({ message: 'El ID del INER es requerido' });
      }

      const inerActualizado = await ValoracionServicioUsuario.updateValoracionPromIner(id_iner);
      if (!inerActualizado) {
        return res.status(404).json({ message: 'INER no encontrado o sin valoraciones' });
      }
      res.status(200).json(inerActualizado);
    } catch (error) {
      console.error('Error en updateValoracionPromIner:', error);
      res.status(500).json({ message: 'Error al actualizar la valoración promedio del INER' });
    }
  }
};

module.exports = valoracionServicioUsuarioController;