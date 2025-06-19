const pool = require('../config/bd.confing');

// Modelo de ConfirmacionCobro y ConfirmacionPago
const Confirmacion = {
  /**
   * Crea un nuevo registro en la tabla CONFIRMACION_COBRO.
   * @param {Object} confirmacionCobro - Objeto con los datos de la confirmación de cobro.
   * @returns {Promise<Object>} - Retorna el registro creado.
   */
  createConfirmacionCobro: async (confirmacionCobro) => {
    try {
      const query = `
        INSERT INTO CONFIRMACION_COBRO (ID_CONTRATO, ID_INER, CONFIRMACION_COBRO, CONFIRMACION_PAGO)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [
        confirmacionCobro.id_contrato,
        confirmacionCobro.id_iner,
        confirmacionCobro.confirmacion_cobro,
        confirmacionCobro.confirmacion_pago
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear confirmación de cobro:', error);
      throw error;
    }
  },

  /**
   * Crea un nuevo registro en la tabla CONFIRMACION_PAGO.
   * @param {Object} confirmacionPago - Objeto con los datos de la confirmación de pago.
   * @returns {Promise<Object>} - Retorna el registro creado.
   */
  createConfirmacionPago: async (confirmacionPago) => {
    try {
      const query = `
        INSERT INTO CONFIRMACION_PAGO (ID_CONTRATO, ID_USUARIO, CONFIRMACION_PAGO)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [
        confirmacionPago.id_contrato,
        confirmacionPago.id_usuario,
        confirmacionPago.confirmacion_pago
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear confirmación de pago:', error);
      throw error;
    }
  },

  /**
   * Modifica CONFIRMACION_PAGO a true en ambas tablas para un contrato específico.
   * @param {number} idContrato - ID del contrato.
   * @param {string} idIner - ID del INER.
   * @param {string} idUsuario - ID del usuario.
   * @returns {Promise<Object>} - Retorna los registros actualizados.
   */
  setConfirmacionPagoTrue: async (idContrato, idIner, idUsuario) => {
    try {
      const queryCobro = `
        UPDATE CONFIRMACION_COBRO
        SET CONFIRMACION_PAGO = true
        WHERE ID_CONTRATO = $1 AND ID_INER = $2
        RETURNING *;
      `;
      const queryPago = `
        UPDATE CONFIRMACION_PAGO
        SET CONFIRMACION_PAGO = true
        WHERE ID_CONTRATO = $1 AND ID_USUARIO = $2
        RETURNING *;
      `;

      const resultCobro = await pool.query(queryCobro, [idContrato, idIner]);
      const resultPago = await pool.query(queryPago, [idContrato, idUsuario]);

      return {
        confirmacionCobro: resultCobro.rows.length > 0 ? resultCobro.rows[0] : null,
        confirmacionPago: resultPago.rows.length > 0 ? resultPago.rows[0] : null
      };
    } catch (error) {
      console.error('Error al modificar confirmación de pago:', error);
      throw error;
    }
  },

  /**
   * Modifica CONFIRMACION_COBRO en la tabla CONFIRMACION_COBRO.
   * @param {number} idContrato - ID del contrato.
   * @param {string} idIner - ID del INER.
   * @param {boolean} confirmacionCobro - Nuevo valor de CONFIRMACION_COBRO.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateConfirmacionCobro: async (idContrato, idIner, confirmacionCobro) => {
    try {
      const query = `
        UPDATE CONFIRMACION_COBRO
        SET CONFIRMACION_COBRO = $3
        WHERE ID_CONTRATO = $1 AND ID_INER = $2
        RETURNING *;
      `;
      const values = [idContrato, idIner, confirmacionCobro];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al modificar confirmación de cobro:', error);
      throw error;
    }
  },

    /**
   * Obtiene todas las confirmaciones de pago para un usuario.
   * @param {string} idUsuario - ID del usuario (USER_UUID).
   * @returns {Promise<Array<Object>>} - Lista de confirmaciones de pago.
   */
    getConfirmacionesPagoByUsuario: async (idUsuario) => {
      try {
        const query = `
          SELECT *
          FROM CONFIRMACION_PAGO
          WHERE ID_USUARIO = $1;
        `;
        const result = await pool.query(query, [idUsuario]);
        return result.rows;
      } catch (error) {
        console.error('Error al obtener confirmaciones de pago por usuario:', error);
        throw error;
      }
    },
  
    /**
     * Obtiene todas las confirmaciones de cobro para un INER.
     * @param {string} idIner - ID del INER (INER_UUID).
     * @returns {Promise<Array<Object>>} - Lista de confirmaciones de cobro.
     */
    getConfirmacionesCobroByIner: async (idIner) => {
      try {
        const query = `
          SELECT *
          FROM CONFIRMACION_COBRO
          WHERE ID_INER = $1;
        `;
        const result = await pool.query(query, [idIner]);
        return result.rows;
      } catch (error) {
        console.error('Error al obtener confirmaciones de cobro por INER:', error);
        throw error;
      }
    }
};

module.exports = Confirmacion;