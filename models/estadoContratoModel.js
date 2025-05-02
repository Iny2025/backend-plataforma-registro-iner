const pool = require('../config/bd.confing'); // Ajusta la ruta según tu estructura de proyecto

const EstadoContrato = {
  /**
   * Crea un nuevo registro en la tabla ESTADO_CONTRATO.
   * @param {Object} estado - Objeto con los datos del estado del contrato.
   * @returns {Promise<Object>} - Retorna el registro creado, incluyendo ID_ESTADO_CONTRATO.
   */
  createEstadoContrato: async (estado) => {
    try {
      const query = `
        INSERT INTO ESTADO_CONTRATO (DESCR_ESTADO_CONTRATO)
        VALUES ($1)
        RETURNING *;
      `;
      const values = [estado.descr_estado_contrato];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear estado_contrato:', error);
      throw error;
    }
  },

  /**
   * Obtiene un estado de contrato por su ID_ESTADO_CONTRATO.
   * @param {number} id - ID_ESTADO_CONTRATO del estado.
   * @returns {Promise<Object|null>} - Retorna el estado si existe o null si no.
   */
  findEstadoContratoById: async (id) => {
    try {
      const query = `
        SELECT * FROM ESTADO_CONTRATO
        WHERE ID_ESTADO_CONTRATO = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al buscar estado_contrato por ID:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los estados de contrato.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todos los estados de contrato.
   */
  getAllEstadosContrato: async () => {
    try {
      const query = `
        SELECT * FROM ESTADO_CONTRATO
        ORDER BY ID_ESTADO_CONTRATO;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todos los estados_contrato:', error);
      throw error;
    }
  },

  /**
   * Actualiza un estado de contrato por su ID_ESTADO_CONTRATO.
   * @param {number} id - ID_ESTADO_CONTRATO del estado.
   * @param {Object} estado - Datos del estado a actualizar.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateEstadoContrato: async (id, estado) => {
    try {
      const query = `
        UPDATE ESTADO_CONTRATO
        SET DESCR_ESTADO_CONTRATO = $2
        WHERE ID_ESTADO_CONTRATO = $1
        RETURNING *;
      `;
      const values = [id, estado.descr_estado_contrato];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar estado_contrato:', error);
      throw error;
    }
  },

  /**
   * Elimina un estado de contrato por su ID_ESTADO_CONTRATO.
   * @param {number} id - ID_ESTADO_CONTRATO del estado.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteEstadoContrato: async (id) => {
    try {
      const query = `
        DELETE FROM ESTADO_CONTRATO
        WHERE ID_ESTADO_CONTRATO = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar estado_contrato:', error);
      throw error;
    }
  }
};

module.exports = EstadoContrato;