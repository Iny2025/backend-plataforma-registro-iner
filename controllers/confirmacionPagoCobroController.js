const Confirmacion = require('../models/confrimacionPagoCobroModel');

// Controlador de Confirmacion
const confirmacionController = {
  /**
   * Crea una nueva confirmación de cobro.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createConfirmacionCobro: async (req, res) => {
    try {
      const { id_contrato, id_iner, confirmacion_cobro, confirmacion_pago } = req.body;

      if (!id_contrato || !id_iner || confirmacion_cobro === undefined || confirmacion_pago === undefined) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }

      const nuevaConfirmacionCobro = await Confirmacion.createConfirmacionCobro({
        id_contrato,
        id_iner,
        confirmacion_cobro,
        confirmacion_pago
      });
      res.status(201).json(nuevaConfirmacionCobro);
    } catch (error) {
      console.error('Error en createConfirmacionCobro:', error);
      res.status(500).json({ message: 'Error al crear la confirmación de cobro' });
    }
  },

  /**
   * Crea una nueva confirmación de pago.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createConfirmacionPago: async (req, res) => {
    try {
      const { id_contrato, id_usuario, confirmacion_pago } = req.body;

      if (!id_contrato || !id_usuario || confirmacion_pago === undefined) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }

      const nuevaConfirmacionPago = await Confirmacion.createConfirmacionPago({
        id_contrato,
        id_usuario,
        confirmacion_pago
      });
      res.status(201).json(nuevaConfirmacionPago);
    } catch (error) {
      console.error('Error en createConfirmacionPago:', error);
      res.status(500).json({ message: 'Error al crear la confirmación de pago' });
    }
  },

  /**
   * Modifica CONFIRMACION_PAGO a true en ambas tablas.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  setConfirmacionPagoTrue: async (req, res) => {
    try {
      const { id_contrato, id_iner, id_usuario } = req.body;

      if (!id_contrato || !id_iner || !id_usuario) {
        return res.status(400).json({ message: 'Los campos id_contrato, id_iner e id_usuario son requeridos' });
      }

      const resultado = await Confirmacion.setConfirmacionPagoTrue(id_contrato, id_iner, id_usuario);
      if (!resultado.confirmacionCobro && !resultado.confirmacionPago) {
        return res.status(404).json({ message: 'No se encontraron registros para actualizar' });
      }
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error en setConfirmacionPagoTrue:', error);
      res.status(500).json({ message: 'Error al modificar la confirmación de pago' });
    }
  },

  /**
   * Modifica CONFIRMACION_COBRO en la tabla CONFIRMACION_COBRO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateConfirmacionCobro: async (req, res) => {
    try {
      const { id_contrato, id_iner } = req.params;
      const { confirmacion_cobro } = req.body;

      if (!id_contrato || !id_iner) {
        return res.status(400).json({ message: 'Los campos id_contrato e id_iner son requeridos' });
      }

      if (confirmacion_cobro === undefined) {
        return res.status(400).json({ message: 'El campo confirmacion_cobro es requerido' });
      }

      const confirmacionActualizada = await Confirmacion.updateConfirmacionCobro(id_contrato, id_iner, confirmacion_cobro);
      if (!confirmacionActualizada) {
        return res.status(404).json({ message: 'Confirmación de cobro no encontrada' });
      }
      res.status(200).json(confirmacionActualizada);
    } catch (error) {
      console.error('Error en updateConfirmacionCobro:', error);
      res.status(500).json({ message: 'Error al modificar la confirmación de cobro' });
    }
  }
};

module.exports = confirmacionController;