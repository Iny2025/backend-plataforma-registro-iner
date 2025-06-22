// controllers/pagoController.js
const pagoModel = require('../models/PagosModel');

const pagoController = {
  // ——— FORMA_PAGO ——————————————————————————————————————————

  /**
   * Crea una nueva forma de pago.
   * POST /formas-pago
   */
  createFormaPago: async (req, res) => {
    try {
      const { descripcion } = req.body;
      if (!descripcion) {
        return res.status(400).json({ message: 'El campo descripcion es requerido' });
      }
      const nueva = await pagoModel.createFormaPago(descripcion);
      res.status(201).json(nueva);
    } catch (error) {
      console.error('Error en createFormaPago:', error);
      res.status(500).json({ message: 'Error al crear forma de pago' });
    }
  },

  /**
   * Lista todas las formas de pago.
   * GET /formas-pago
   */
  getAllFormaPago: async (req, res) => {
    try {
      const formas = await pagoModel.getAllFormaPago();
      res.status(200).json(formas);
    } catch (error) {
      console.error('Error en getAllFormaPago:', error);
      res.status(500).json({ message: 'Error al obtener formas de pago' });
    }
  },

  /**
   * Obtiene una forma de pago por ID.
   * GET /formas-pago/:id
   */
  getFormaPagoById: async (req, res) => {
    try {
      const { id } = req.params;
      const forma = await pagoModel.getFormaPagoById(id);
      if (!forma) return res.status(404).json({ message: 'Forma de pago no encontrada' });
      res.status(200).json(forma);
    } catch (error) {
      console.error('Error en getFormaPagoById:', error);
      res.status(500).json({ message: 'Error al obtener forma de pago' });
    }
  },

  /**
   * Actualiza una forma de pago.
   * PUT /formas-pago/:id
   */
  updateFormaPago: async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion } = req.body;
      if (!descripcion) {
        return res.status(400).json({ message: 'El campo descripcion es requerido' });
      }
      const updated = await pagoModel.updateFormaPago(id, descripcion);
      if (!updated) return res.status(404).json({ message: 'Forma de pago no encontrada' });
      res.status(200).json(updated);
    } catch (error) {
      console.error('Error en updateFormaPago:', error);
      res.status(500).json({ message: 'Error al actualizar forma de pago' });
    }
  },

  /**
   * Elimina una forma de pago.
   * DELETE /formas-pago/:id
   */
  deleteFormaPago: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await pagoModel.deleteFormaPago(id);
      if (!deleted) return res.status(404).json({ message: 'Forma de pago no encontrada' });
      res.status(200).json(deleted);
    } catch (error) {
      console.error('Error en deleteFormaPago:', error);
      res.status(500).json({ message: 'Error al eliminar forma de pago' });
    }
  },


  // ——— ESTADO_PAGO ——————————————————————————————————————————

  /**
   * Crea un nuevo estado de pago.
   * POST /estados-pago
   */
  createEstadoPago: async (req, res) => {
    try {
      const { descripcion } = req.body;
      if (!descripcion) {
        return res.status(400).json({ message: 'El campo descripcion es requerido' });
      }
      const nuevo = await pagoModel.createEstadoPago(descripcion);
      res.status(201).json(nuevo);
    } catch (error) {
      console.error('Error en createEstadoPago:', error);
      res.status(500).json({ message: 'Error al crear estado de pago' });
    }
  },

  /**
   * Lista todos los estados de pago.
   * GET /estados-pago
   */
  getAllEstadoPago: async (req, res) => {
    try {
      const estados = await pagoModel.getAllEstadoPago();
      res.status(200).json(estados);
    } catch (error) {
      console.error('Error en getAllEstadoPago:', error);
      res.status(500).json({ message: 'Error al obtener estados de pago' });
    }
  },

  /**
   * Obtiene un estado de pago por ID.
   * GET /estados-pago/:id
   */
  getEstadoPagoById: async (req, res) => {
    try {
      const { id } = req.params;
      const estado = await pagoModel.getEstadoPagoById(id);
      if (!estado) return res.status(404).json({ message: 'Estado de pago no encontrado' });
      res.status(200).json(estado);
    } catch (error) {
      console.error('Error en getEstadoPagoById:', error);
      res.status(500).json({ message: 'Error al obtener estado de pago' });
    }
  },

  /**
   * Actualiza un estado de pago.
   * PUT /estados-pago/:id
   */
  updateEstadoPago: async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion } = req.body;
      if (!descripcion) {
        return res.status(400).json({ message: 'El campo descripcion es requerido' });
      }
      const updated = await pagoModel.updateEstadoPago(id, descripcion);
      if (!updated) return res.status(404).json({ message: 'Estado de pago no encontrado' });
      res.status(200).json(updated);
    } catch (error) {
      console.error('Error en updateEstadoPago:', error);
      res.status(500).json({ message: 'Error al actualizar estado de pago' });
    }
  },

  /**
   * Elimina un estado de pago.
   * DELETE /estados-pago/:id
   */
  deleteEstadoPago: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await pagoModel.deleteEstadoPago(id);
      if (!deleted) return res.status(404).json({ message: 'Estado de pago no encontrado' });
      res.status(200).json(deleted);
    } catch (error) {
      console.error('Error en deleteEstadoPago:', error);
      res.status(500).json({ message: 'Error al eliminar estado de pago' });
    }
  },


  // ——— PAGO ——————————————————————————————————————————

  /**
   * Crea un nuevo pago.
   * POST /pagos
   */
  createPago: async (req, res) => {
    try {
      const data = req.body;
      // validar campos mínimos
      const required = ['cant_cobrada','cant_pagada','id_forma_pago','estado_pago','id_contrato','id_iner','id_usuario'];
      for (let field of required) {
        if (data[field] === undefined) {
          return res.status(400).json({ message: `El campo ${field} es requerido` });
        }
      }
      const pago = await pagoModel.createPago(data);
      res.status(201).json(pago);
    } catch (error) {
      console.error('Error en createPago:', error);
      res.status(500).json({ message: 'Error al crear pago' });
    }
  },

  /**
   * Lista todos los pagos.
   * GET /pagos
   */
  getAllPagos: async (req, res) => {
    try {
      const pagos = await pagoModel.getAllPagos();
      res.status(200).json(pagos);
    } catch (error) {
      console.error('Error en getAllPagos:', error);
      res.status(500).json({ message: 'Error al obtener pagos' });
    }
  },

  /**
   * Obtiene un pago por ID.
   * GET /pagos/:id
   */
  getPagoById: async (req, res) => {
    try {
      const { id } = req.params;
      const pago = await pagoModel.getPagoById(id);
      if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
      res.status(200).json(pago);
    } catch (error) {
      console.error('Error en getPagoById:', error);
      res.status(500).json({ message: 'Error al obtener pago' });
    }
  },

  /**
   * Actualiza un pago.
   * PUT /pagos/:id
   */
  updatePago: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const pago = await pagoModel.updatePago(id, data);
      if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
      res.status(200).json(pago);
    } catch (error) {
      console.error('Error en updatePago:', error);
      res.status(500).json({ message: 'Error al actualizar pago' });
    }
  },

  /**
   * Elimina un pago.
   * DELETE /pagos/:id
   */
  deletePago: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await pagoModel.deletePago(id);
      if (!deleted) return res.status(404).json({ message: 'Pago no encontrado' });
      res.status(200).json(deleted);
    } catch (error) {
      console.error('Error en deletePago:', error);
      res.status(500).json({ message: 'Error al eliminar pago' });
    }
  },

  /**
   * Obtiene todos los pagos asociados a un contrato.
   * GET /pagos/contrato/:id_contrato
   */
  getPagosByContrato: async (req, res) => {
    try {
      const { id_contrato } = req.params;
      if (!id_contrato) {
        return res.status(400).json({ message: 'El campo id_contrato es requerido' });
      }
      const pagos = await pagoModel.getPagosByContrato(id_contrato);
      res.status(200).json(pagos);
    } catch (error) {
      console.error('Error en getPagosByContrato:', error);
      res.status(500).json({ message: 'Error al obtener pagos por contrato' });
    }
  },
};

module.exports = pagoController;
