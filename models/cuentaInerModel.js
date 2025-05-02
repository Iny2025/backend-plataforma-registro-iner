const pool = require('../config/bd.confing'); 

const CuentaIner = {
  /**
   * Crea un nuevo registro en la tabla CUENTA_INER.
   * @param {Object} cuenta - Objeto con los datos de la cuenta.
   * @returns {Promise<Object>} - Retorna el registro creado.
   */
  createCuentaIner: async (cuenta) => {
    try {
      const query = `
        INSERT INTO CUENTA_INER (
          RUT_INER,
          ID_INER,
          NOMBRE_TITULAR_CUENTA,
          ID_TIPO_CUENTA,
          ID_BANCO,
          NUMERO_CUENTA,
          EMAIL_TITULAR_CUENTA
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [
        cuenta.rut_iner,
        cuenta.id_iner,
        cuenta.nombre_titular_cuenta,
        cuenta.id_tipo_cuenta,
        cuenta.id_banco,
        cuenta.numero_cuenta,
        cuenta.email_titular_cuenta || null
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear cuenta_iner:', error);
      throw error;
    }
  },

  /**
   * Obtiene una cuenta por su RUT_INER.
   * @param {string} rutIner - RUT_INER de la cuenta.
   * @returns {Promise<Object|null>} - Retorna la cuenta si existe o null si no.
   */
  findCuentaInerByRut: async (rutIner) => {
    try {
      const query = `
        SELECT * FROM CUENTA_INER
        WHERE RUT_INER = $1;
      `;
      const values = [rutIner];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al buscar cuenta_iner por RUT:', error);
      throw error;
    }
  },

  /**
   * Obtiene todas las cuentas.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todas las cuentas.
   */
  getAllCuentasIner: async () => {
    try {
      const query = `
        SELECT * FROM CUENTA_INER
        ORDER BY RUT_INER;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todas las cuentas_iner:', error);
      throw error;
    }
  },

  /**
   * Actualiza una cuenta por su RUT_INER.
   * @param {string} rutIner - RUT_INER de la cuenta.
   * @param {Object} cuenta - Datos de la cuenta a actualizar.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateCuentaIner: async (rutIner, cuenta) => {
    try {
      const query = `
        UPDATE CUENTA_INER
        SET
          ID_INER = $2,
          NOMBRE_TITULAR_CUENTA = $3,
          ID_TIPO_CUENTA = $4,
          ID_BANCO = $5,
          NUMERO_CUENTA = $6,
          EMAIL_TITULAR_CUENTA = $7
        WHERE RUT_INER = $1
        RETURNING *;
      `;
      const values = [
        rutIner,
        cuenta.id_iner,
        cuenta.nombre_titular_cuenta,
        cuenta.id_tipo_cuenta,
        cuenta.id_banco,
        cuenta.numero_cuenta,
        cuenta.email_titular_cuenta || null
      ];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar cuenta_iner:', error);
      throw error;
    }
  },

  /**
   * Elimina una cuenta por su RUT_INER.
   * @param {string} rutIner - RUT_INER de la cuenta.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteCuentaIner: async (rutIner) => {
    try {
      const query = `
        DELETE FROM CUENTA_INER
        WHERE RUT_INER = $1;
      `;
      const values = [rutIner];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar cuenta_iner:', error);
      throw error;
    }
  },

  /**
   * Verifica si un INER tiene una cuenta registrada por su ID_INER.
   * @param {string} idIner - ID_INER del INER.
   * @returns {Promise<boolean>} - Retorna true si existe una cuenta, false si no.
   */
  hasCuentaByIdIner: async (idIner) => {
    try {
      const query = `
        SELECT 1 FROM CUENTA_INER
        WHERE ID_INER = $1
        LIMIT 1;
      `;
      const values = [idIner];

      const result = await pool.query(query, values);
      return result.rows.length > 0;
    } catch (error) {
      console.error('Error al verificar cuenta por ID_INER:', error);
      throw error;
    }
  }
};

module.exports = CuentaIner;