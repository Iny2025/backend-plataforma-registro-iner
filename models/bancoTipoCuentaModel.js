const pool = require('../config/bd.confing'); 

const BancoTipoCuenta = {
  // Operaciones CRUD para BANCO

  /**
   * Crea un nuevo banco.
   * @param {Object} banco - Objeto con los datos del banco.
   * @returns {Promise<Object>} - Retorna el registro creado, incluyendo ID_BANCO.
   */
  createBanco: async (banco) => {
    try {
      const query = `
        INSERT INTO BANCO (DESCRIPCION_BANCO)
        VALUES ($1)
        RETURNING *;
      `;
      const values = [banco.descripcion_banco];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear banco:', error);
      throw error;
    }
  },

  /**
   * Obtiene un banco por su ID_BANCO.
   * @param {number} id - ID_BANCO del banco.
   * @returns {Promise<Object|null>} - Retorna el banco si existe o null si no.
   */
  findBancoById: async (id) => {
    try {
      const query = `
        SELECT * FROM BANCO
        WHERE ID_BANCO = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al buscar banco por ID:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los bancos.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todos los bancos.
   */
  getAllBancos: async () => {
    try {
      const query = `
        SELECT * FROM BANCO
        ORDER BY ID_BANCO;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todos los bancos:', error);
      throw error;
    }
  },

  /**
   * Actualiza un banco por su ID_BANCO.
   * @param {number} id - ID_BANCO del banco.
   * @param {Object} banco - Datos del banco a actualizar.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateBanco: async (id, banco) => {
    try {
      const query = `
        UPDATE BANCO
        SET DESCRIPCION_BANCO = $2
        WHERE ID_BANCO = $1
        RETURNING *;
      `;
      const values = [id, banco.descripcion_banco];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar banco:', error);
      throw error;
    }
  },

  /**
   * Elimina un banco por su ID_BANCO.
   * @param {number} id - ID_BANCO del banco.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteBanco: async (id) => {
    try {
      const query = `
        DELETE FROM BANCO
        WHERE ID_BANCO = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar banco:', error);
      throw error;
    }
  },

  // Operaciones CRUD para TIPO_CUENTA

  /**
   * Crea un nuevo tipo de cuenta.
   * @param {Object} tipoCuenta - Objeto con los datos del tipo de cuenta.
   * @returns {Promise<Object>} - Retorna el registro creado, incluyendo ID_TIPO_CUENTA.
   */
  createTipoCuenta: async (tipoCuenta) => {
    try {
      const query = `
        INSERT INTO TIPO_CUENTA (DESCRIPCION_TIPO_CUENTA)
        VALUES ($1)
        RETURNING *;
      `;
      const values = [tipoCuenta.descripcion_tipo_cuenta];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear tipo de cuenta:', error);
      throw error;
    }
  },

  /**
   * Obtiene un tipo de cuenta por su ID_TIPO_CUENTA.
   * @param {number} id - ID_TIPO_CUENTA del tipo de cuenta.
   * @returns {Promise<Object|null>} - Retorna el tipo de cuenta si existe o null si no.
   */
  findTipoCuentaById: async (id) => {
    try {
      const query = `
        SELECT * FROM TIPO_CUENTA
        WHERE ID_TIPO_CUENTA = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al buscar tipo de cuenta por ID:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los tipos de cuenta.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todos los tipos de cuenta.
   */
  getAllTiposCuenta: async () => {
    try {
      const query = `
        SELECT * FROM TIPO_CUENTA
        ORDER BY ID_TIPO_CUENTA;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todos los tipos de cuenta:', error);
      throw error;
    }
  },

  /**
   * Actualiza un tipo de cuenta por su ID_TIPO_CUENTA.
   * @param {number} id - ID_TIPO_CUENTA del tipo de cuenta.
   * @param {Object} tipoCuenta - Datos del tipo de cuenta a actualizar.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateTipoCuenta: async (id, tipoCuenta) => {
    try {
      const query = `
        UPDATE TIPO_CUENTA
        SET DESCRIPCION_TIPO_CUENTA = $2
        WHERE ID_TIPO_CUENTA = $1
        RETURNING *;
      `;
      const values = [id, tipoCuenta.descripcion_tipo_cuenta];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar tipo de cuenta:', error);
      throw error;
    }
  },

  /**
   * Elimina un tipo de cuenta por su ID_TIPO_CUENTA.
   * @param {number} id - ID_TIPO_CUENTA del tipo de cuenta.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteTipoCuenta: async (id) => {
    try {
      const query = `
        DELETE FROM TIPO_CUENTA
        WHERE ID_TIPO_CUENTA = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar tipo de cuenta:', error);
      throw error;
    }
  }
};

module.exports = BancoTipoCuenta;