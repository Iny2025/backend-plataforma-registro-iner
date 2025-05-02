// Importar el pool de conexiones
const pool = require('../config/bd.confing'); 

// Modelo de Tarifa
const Tarifa = {
  /**
   * Crea un nuevo registro en la tabla TARIFA.
   * @param {Object} tarifa - Objeto con los datos de la tarifa.
   * @returns {Promise<Object>} - Retorna el registro creado, incluyendo ID_TARIFA generado.
   */
  createTarifa: async (tarifa) => {
    try {
      const query = `
        INSERT INTO TARIFA (
          UNIDAD_TARIFA,
          PRECIO_UNIDAD_TARIFA,
          ID_INER
        ) VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [
        tarifa.unidad_tarifa,
        tarifa.precio_unidad_tarifa,
        tarifa.id_iner
      ];

      const result = await pool.query(query, values);
      return result.rows[0]; // Incluye ID_TARIFA generado por BIGSERIAL
    } catch (error) {
      console.error('Error al crear tarifa:', error);
      throw error;
    }
  },

  /**
   * Obtiene un registro por su ID_TARIFA.
   * @param {string} id - ID_TARIFA del registro.
   * @returns {Promise<Object|null>} - Retorna el registro si existe o null si no.
   */
  findTarifaById: async (id) => {
    try {
      const query = `
        SELECT * FROM TARIFA
        WHERE ID_TARIFA = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al buscar tarifa por ID:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los registros de la tabla TARIFA.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todos los registros.
   */
  getAllTarifas: async () => {
    try {
      const query = `
        SELECT * FROM TARIFA
        ORDER BY ID_TARIFA;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todas las tarifas:', error);
      throw error;
    }
  },

  /**
   * Actualiza un registro por su ID_TARIFA.
   * @param {string} id - ID_TARIFA del registro.
   * @param {Object} tarifa - Datos de la tarifa a actualizar.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateTarifa: async (id, tarifa) => {
    try {
      const query = `
        UPDATE TARIFA
        SET
          UNIDAD_TARIFA = $2,
          PRECIO_UNIDAD_TARIFA = $3,
          ID_INER = $4
        WHERE ID_TARIFA = $1
        RETURNING *;
      `;
      const values = [
        id,
        tarifa.unidad_tarifa,
        tarifa.precio_unidad_tarifa,
        tarifa.id_iner
      ];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar tarifa:', error);
      throw error;
    }
  },

  /**
   * Elimina un registro por su ID_TARIFA.
   * @param {string} id - ID_TARIFA del registro.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteTarifa: async (id) => {
    try {
      const query = `
        DELETE FROM TARIFA
        WHERE ID_TARIFA = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar tarifa:', error);
      throw error;
    }
  },

  /**
   * Obtiene todas las tarifas asociadas a un ID_INER.
   * @param {string} idIner - ID_INER del registro INER.
   * @returns {Promise<Array<Object>>} - Retorna una lista de tarifas del INER.
   */
  getTarifasByInerId: async (idIner) => {
    try {
      const query = `
        SELECT * FROM TARIFA
        WHERE ID_INER = $1
        ORDER BY ID_TARIFA;
      `;
      const values = [idIner];

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener tarifas por ID_INER:', error);
      throw error;
    }
  }
};

module.exports = Tarifa;