// models/pagoModel.js
const pool = require('../config/bd.confing');

const pago = {
  // ——— FORMA_PAGO ——————————————————————————————————————————

  /**
   * Crea una nueva forma de pago.
   * @param {string} descripcion
   * @returns {Promise<Object>}
   */
  createFormaPago: async (descripcion) => {
    try {
      const query = `
        INSERT INTO FORMA_PAGO (DESCRIPCION_FORMA_PAGO)
        VALUES ($1)
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [descripcion]);
      return rows[0];
    } catch (error) {
      console.error('Error al crear forma de pago:', error);
      throw error;
    }
  },

  /**
   * Obtiene todas las formas de pago.
   * @returns {Promise<Array<Object>>}
   */
  getAllFormaPago: async () => {
    try {
      const { rows } = await pool.query(`SELECT * FROM FORMA_PAGO;`);
      return rows;
    } catch (error) {
      console.error('Error al obtener formas de pago:', error);
      throw error;
    }
  },

  /**
   * Obtiene una forma de pago por su ID.
   * @param {number} idFormaPago
   * @returns {Promise<Object|null>}
   */
  getFormaPagoById: async (idFormaPago) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM FORMA_PAGO WHERE ID_FORMA_PAGO = $1;`,
        [idFormaPago]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al obtener forma de pago por ID:', error);
      throw error;
    }
  },

  /**
   * Actualiza la descripción de una forma de pago.
   * @param {number} idFormaPago
   * @param {string} descripcion
   * @returns {Promise<Object|null>}
   */
  updateFormaPago: async (idFormaPago, descripcion) => {
    try {
      const query = `
        UPDATE FORMA_PAGO
        SET DESCRIPCION_FORMA_PAGO = $2
        WHERE ID_FORMA_PAGO = $1
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [idFormaPago, descripcion]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al actualizar forma de pago:', error);
      throw error;
    }
  },

  /**
   * Elimina una forma de pago por su ID.
   * @param {number} idFormaPago
   * @returns {Promise<Object|null>}
   */
  deleteFormaPago: async (idFormaPago) => {
    try {
      const { rows } = await pool.query(
        `DELETE FROM FORMA_PAGO WHERE ID_FORMA_PAGO = $1 RETURNING *;`,
        [idFormaPago]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al eliminar forma de pago:', error);
      throw error;
    }
  },


  // ——— ESTADO_PAGO ——————————————————————————————————————————

  /**
   * Crea un nuevo estado de pago.
   * @param {string} descripcion
   * @returns {Promise<Object>}
   */
  createEstadoPago: async (descripcion) => {
    try {
      const query = `
        INSERT INTO ESTADO_PAGO (DESCRIPCION_ESTADO_PAGO)
        VALUES ($1)
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [descripcion]);
      return rows[0];
    } catch (error) {
      console.error('Error al crear estado de pago:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los estados de pago.
   * @returns {Promise<Array<Object>>}
   */
  getAllEstadoPago: async () => {
    try {
      const { rows } = await pool.query(`SELECT * FROM ESTADO_PAGO;`);
      return rows;
    } catch (error) {
      console.error('Error al obtener estados de pago:', error);
      throw error;
    }
  },

  /**
   * Obtiene un estado de pago por su ID.
   * @param {number} idEstadoPago
   * @returns {Promise<Object|null>}
   */
  getEstadoPagoById: async (idEstadoPago) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM ESTADO_PAGO WHERE ID_ESTADO_PAGO = $1;`,
        [idEstadoPago]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al obtener estado de pago por ID:', error);
      throw error;
    }
  },

  /**
   * Actualiza la descripción de un estado de pago.
   * @param {number} idEstadoPago
   * @param {string} descripcion
   * @returns {Promise<Object|null>}
   */
  updateEstadoPago: async (idEstadoPago, descripcion) => {
    try {
      const query = `
        UPDATE ESTADO_PAGO
        SET DESCRIPCION_ESTADO_PAGO = $2
        WHERE ID_ESTADO_PAGO = $1
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [idEstadoPago, descripcion]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al actualizar estado de pago:', error);
      throw error;
    }
  },

  /**
   * Elimina un estado de pago por su ID.
   * @param {number} idEstadoPago
   * @returns {Promise<Object|null>}
   */
  deleteEstadoPago: async (idEstadoPago) => {
    try {
      const { rows } = await pool.query(
        `DELETE FROM ESTADO_PAGO WHERE ID_ESTADO_PAGO = $1 RETURNING *;`,
        [idEstadoPago]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al eliminar estado de pago:', error);
      throw error;
    }
  },


  // ——— PAGO ——————————————————————————————————————————

  /**
   * Crea un nuevo pago.
   * @param {Object} pagoData
   * @returns {Promise<Object>}
   */
  createPago: async (pagoData) => {
    try {
      const query = `
        INSERT INTO PAGO (
          CANT_COBRADA,
          CANT_PAGADA,
          ID_FORMA_PAGO,
          ESTADO_PAGO,
          ID_CONTRATO,
          ID_INER,
          ID_USUARIO,
          TITULO_SERVICIO_PAGO,
          PAGO_EFECTIVO
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING *;
      `;
      const values = [
        pagoData.cant_cobrada,
        pagoData.cant_pagada,
        pagoData.id_forma_pago,
        pagoData.estado_pago,
        pagoData.id_contrato,
        pagoData.id_iner,
        pagoData.id_usuario,
        pagoData.titulo_servicio_pago,
        pagoData.pago_efectivo || false
      ];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error('Error al crear pago:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los pagos.
   * @returns {Promise<Array<Object>>}
   */
  getAllPagos: async () => {
    try {
      const { rows } = await pool.query(`SELECT * FROM PAGO;`);
      return rows;
    } catch (error) {
      console.error('Error al obtener pagos:', error);
      throw error;
    }
  },

  /**
   * Obtiene un pago por su ID.
   * @param {number} idPago
   * @returns {Promise<Object|null>}
   */
  getPagoById: async (idPago) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM PAGO WHERE ID_PAGO = $1;`,
        [idPago]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al obtener pago por ID:', error);
      throw error;
    }
  },

  /**
   * Actualiza un pago.
   * @param {number} idPago
   * @param {Object} pagoData
   * @returns {Promise<Object|null>}
   */
  updatePago: async (idPago, pagoData) => {
    try {
      const query = `
        UPDATE PAGO
        SET
          CANT_COBRADA = $2,
          CANT_PAGADA = $3,
          ID_FORMA_PAGO = $4,
          ESTADO_PAGO = $5,
          ID_CONTRATO = $6,
          ID_INER = $7,
          ID_USUARIO = $8,
          TITULO_SERVICIO_PAGO = $9,
          PAGO_EFECTIVO = $10
        WHERE ID_PAGO = $1
        RETURNING *;
      `;
      const values = [
        idPago,
        pagoData.cant_cobrada,
        pagoData.cant_pagada,
        pagoData.id_forma_pago,
        pagoData.estado_pago,
        pagoData.id_contrato,
        pagoData.id_iner,
        pagoData.id_usuario,
        pagoData.titulo_servicio_pago,
        pagoData.pago_efectivo
      ];
      const { rows } = await pool.query(query, values);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al actualizar pago:', error);
      throw error;
    }
  },

  /**
   * Elimina un pago.
   * @param {number} idPago
   * @returns {Promise<Object|null>}
   */
  deletePago: async (idPago) => {
    try {
      const { rows } = await pool.query(
        `DELETE FROM PAGO WHERE ID_PAGO = $1 RETURNING *;`,
        [idPago]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error al eliminar pago:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los pagos de un contrato.
   * @param {number} idContrato
   * @returns {Promise<Array<Object>>}
   */
  getPagosByContrato: async (idContrato) => {
    try {
      const { rows } = await pool.query(
        `SELECT * FROM PAGO WHERE ID_CONTRATO = $1;`,
        [idContrato]
      );
      return rows;
    } catch (error) {
      console.error('Error al obtener pagos por contrato:', error);
      throw error;
    }
  }
};

module.exports = pago;
