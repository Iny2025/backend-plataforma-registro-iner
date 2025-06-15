const Contrato = require('../models/contratoModel');

// Controlador de Contrato
const contratoController = {
  /**
   * Crea un nuevo contrato.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createContrato: async (req, res) => {
    try {
      const { id_servicio, id_iner, id_usuario, id_estado_contrato, fecha_contratacion, descuento_contrato } = req.body;

      if (!id_servicio || !id_iner || !id_usuario || !id_estado_contrato) {
        return res.status(400).json({ message: 'Los campos id_servicio, id_iner, id_usuario e id_estado_contrato son requeridos' });
      }

      const nuevoContrato = await Contrato.createContrato({
        id_servicio,
        id_iner,
        id_usuario,
        id_estado_contrato,
        fecha_contratacion,
        descuento_contrato
      });
      res.status(201).json(nuevoContrato);
    } catch (error) {
      console.error('Error en createContrato:', error);
      res.status(500).json({ message: 'Error al crear el contrato' });
    }
  },

  /**
   * Devuelve todos los contratos de un usuario con datos relacionados.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getContratosByUsuario: async (req, res) => {
    try {
      const { id_usuario } = req.params;

      if (!id_usuario) {
        return res.status(400).json({ message: 'El ID del usuario es requerido' });
      }

      const contratos = await Contrato.getContratosByUsuario(id_usuario);
      if (contratos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron contratos para este usuario' });
      }
      res.status(200).json(contratos);
    } catch (error) {
      console.error('Error en getContratosByUsuario:', error);
      res.status(500).json({ message: 'Error al obtener los contratos' });
    }
  },

  /**
   * Devuelve un contrato por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getContratoById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del contrato es requerido' });
      }

      const contrato = await Contrato.getContratoById(id);
      if (!contrato) {
        return res.status(404).json({ message: 'Contrato no encontrado' });
      }
      res.status(200).json(contrato);
    } catch (error) {
      console.error('Error en getContratoById:', error);
      res.status(500).json({ message: 'Error al obtener el contrato' });
    }
  },

  /**
   * Actualiza un contrato por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateContrato: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_servicio, id_iner, id_usuario, id_estado_contrato, fecha_contratacion, descuento_contrato } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID del contrato es requerido' 
      });
      }

      if (!id_servicio || !id_iner || !id_usuario || !id_estado_contrato) {
        return res.status(400).json({ message: 'Los campos id_servicio, id_iner, id_usuario e id_estado_contrato son requeridos' });
      }

      const contratoActualizado = await Contrato.updateContrato(id, {
        id_servicio,
        id_iner,
        id_usuario,
        id_estado_contrato,
        fecha_contratacion,
        descuento_contrato
      });
      if (!contratoActualizado) {
        return res.status(404).json({ message: 'Contrato no encontrado' });
      }
      res.status(200).json(contratoActualizado);
    } catch (error) {
      console.error('Error en updateContrato:', error);
      res.status(500).json({ message: 'Error al actualizar el contrato' });
    }
  },

  /**
   * Elimina un contrato por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteContrato: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del contrato es requerido' });
      }

      const eliminado = await Contrato.deleteContrato(id);
      if (!eliminado) {
        return res.status(404).json({ message: 'Contrato no encontrado' });
      }
      res.status(200).json({ message: 'Contrato eliminado correctamente' });
    } catch (error) {
      console.error('Error en deleteContrato:', error);
      res.status(500).json({ message: 'Error al eliminar el contrato' });
    }
  },

  /**
   * Actualiza el estado de un contrato.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateEstadoContrato: async (req, res) => {
    try {
      const { id } = req.params;
      const { id_estado_contrato } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID del contrato es requerido' });
      }

      if (!id_estado_contrato) {
        return res.status(400).json({ message: 'El ID del estado del contrato es requerido' });
      }

      const contratoActualizado = await Contrato.updateEstadoContrato(id, id_estado_contrato);
      if (!contratoActualizado) {
        return res.status(404).json({ message: 'Contrato no encontrado' });
      }
      res.status(200).json(contratoActualizado);
    } catch (error) {
      console.error('Error en updateEstadoContrato:', error);
      res.status(500).json({ message: 'Error al actualizar el estado del contrato' });
    }
  },


   /**
 * Devuelve todos los contratos de un INER con datos relacionados.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 */
getContratosByIner: async (req, res) => {
  try {
    const { id_iner } = req.params;

    if (!id_iner) {
      return res.status(400).json({ message: 'El ID del INER es requerido' });
    }

    const contratos = await Contrato.getContratosByIner(id_iner);
    if (contratos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron contratos para este INER' });
    }

    res.status(200).json(contratos);
  } catch (error) {
    console.error('Error en getContratosByIner:', error);
    res.status(500).json({ message: 'Error al obtener los contratos del INER' });
  }
}

};

module.exports = contratoController;