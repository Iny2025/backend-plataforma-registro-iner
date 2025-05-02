const EstadoContrato = require('../models/estadoContratoModel');

// Controlador de EstadoContrato
const estadoContratoController = {
  /**
   * Devuelve todos los estados de contrato.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllEstadosContrato: async (req, res) => {
    try {
      const estados = await EstadoContrato.getAllEstadosContrato();
      if (estados.length === 0) {
        return res.status(404).json({ message: 'No se encontraron estados de contrato' });
      }
      res.status(200).json(estados);
    } catch (error) {
      console.error('Error en getAllEstadosContrato:', error);
      res.status(500).json({ message: 'Error al obtener los estados de contrato' });
    }
  },

  /**
   * Ingresa un nuevo estado de contrato.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createEstadoContrato: async (req, res) => {
    try {
      const { descr_estado_contrato } = req.body;

      if (!descr_estado_contrato) {
        return res.status(400).json({ message: 'La descripción del estado de contrato es requerida' });
      }

      const nuevoEstado = await EstadoContrato.createEstadoContrato({ descr_estado_contrato });
      res.status(201).json(nuevoEstado);
    } catch (error) {
      console.error('Error en createEstadoContrato:', error);
      res.status(500).json({ message: 'Error al crear el estado de contrato' });
    }
  },

  /**
   * Devuelve un estado de contrato por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getEstadoContratoById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del estado de contrato es requerido' });
      }

      const estado = await EstadoContrato.findEstadoContratoById(id);
      if (!estado) {
        return res.status(404).json({ message: 'Estado de contrato no encontrado' });
      }

      res.status(200).json(estado);
    } catch (error) {
      console.error('Error en getEstadoContratoById:', error);
      res.status(500).json({ message: 'Error al obtener el estado de contrato' });
    }
  },

  /**
   * Actualiza un estado de contrato por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateEstadoContrato: async (req, res) => {
    try {
      const { id } = req.params;
      const { descr_estado_contrato } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID del estado de contrato es requerido' });
      }

      if (!descr_estado_contrato) {
        return res.status(400).json({ message: 'La descripción del estado de contrato es requerida' });
      }

      const estadoActualizado = await EstadoContrato.updateEstadoContrato(id, { descr_estado_contrato });
      if (!estadoActualizado) {
        return res.status(404).json({ message: 'Estado de contrato no encontrado' });
      }

      res.status(200).json(estadoActualizado);
    } catch (error) {
      console.error('Error en updateEstadoContrato:', error);
      res.status(500).json({ message: 'Error al actualizar el estado de contrato' });
    }
  },

  /**
   * Elimina un estado de contrato por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteEstadoContrato: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del estado de contrato es requerido' });
      }

      const eliminado = await EstadoContrato.deleteEstadoContrato(id);
      if (!eliminado) {
        return res.status(404).json({ message: 'Estado de contrato no encontrado' });
      }

      res.status(200).json({ message: 'Estado de contrato eliminado correctamente' });
    } catch (error) {
      console.error('Error en deleteEstadoContrato:', error);
      res.status(500).json({ message: 'Error al eliminar el estado de contrato' });
    }
  },
};

module.exports = estadoContratoController;