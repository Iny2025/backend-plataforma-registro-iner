// Importar el pool de conexiones
const pool = require('../config/bd.confing'); 

// Modelo de Valoración Usuario-Iner
const ValoracionUsuarioIner = {
  /**
   * Crea un nuevo registro en la tabla VALORACION_USUARIO_INER.
   * @param {Object} valoracion - Objeto con los datos de la valoración.
   * @returns {Promise<Object>} - Retorna el registro creado.
   */
  createValoracion: async (valoracion) => {
    try {
      const query = `
        INSERT INTO VALORACION_USUARIO_INER (
          ID_INER,
          ID_USUARIO,
          VALORACION_USUARIO
        ) VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const values = [
        valoracion.id_iner,
        valoracion.id_usuario,
        valoracion.valoracion_usuario
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear valoración:', error);
      throw error;
    }
  },

  /**
   * Obtiene un registro por su clave primaria compuesta (ID_INER, ID_USUARIO).
   * @param {string} idIner - ID_INER del registro.
   * @param {string} idUsuario - ID_USUARIO del registro.
   * @returns {Promise<Object|null>} - Retorna el registro si existe o null si no.
   */
  findValoracionById: async (idIner, idUsuario) => {
    try {
      const query = `
        SELECT * FROM VALORACION_USUARIO_INER
        WHERE ID_INER = $1 AND ID_USUARIO = $2;
      `;
      const values = [idIner, idUsuario];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al buscar valoración por ID:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los registros de la tabla VALORACION_USUARIO_INER.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todos los registros.
   */
  getAllValoraciones: async () => {
    try {
      const query = `
        SELECT * FROM VALORACION_USUARIO_INER
        ORDER BY ID_INER, ID_USUARIO;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todas las valoraciones:', error);
      throw error;
    }
  },

  /**
   * Actualiza un registro por su clave primaria compuesta (ID_INER, ID_USUARIO).
   * @param {string} idIner - ID_INER del registro.
   * @param {string} idUsuario - ID_USUARIO del registro.
   * @param {Object} valoracion - Datos de la valoración a actualizar.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateValoracion: async (idIner, idUsuario, valoracion) => {
    try {
      const query = `
        UPDATE VALORACION_USUARIO_INER
        SET VALORACION_USUARIO = $3
        WHERE ID_INER = $1 AND ID_USUARIO = $2
        RETURNING *;
      `;
      const values = [idIner, idUsuario, valoracion.valoracion_usuario];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar valoración:', error);
      throw error;
    }
  },

  /**
   * Elimina un registro por su clave primaria compuesta (ID_INER, ID_USUARIO).
   * @param {string} idIner - ID_INER del registro.
   * @param {string} idUsuario - ID_USUARIO del registro.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteValoracion: async (idIner, idUsuario) => {
    try {
      const query = `
        DELETE FROM VALORACION_USUARIO_INER
        WHERE ID_INER = $1 AND ID_USUARIO = $2;
      `;
      const values = [idIner, idUsuario];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar valoración:', error);
      throw error;
    }
  },

  /**
   * Obtiene el promedio de las valoraciones para un usuario específico.
   * @param {string} idUsuario - ID_USUARIO del usuario.
   * @returns {Promise<number|null>} - Retorna el promedio de valoraciones o null si no hay registros.
   */
  getPromedioValoracionesByUsuarioId: async (idUsuario) => {
    try {
      const query = `
        SELECT AVG(VALORACION_USUARIO) AS promedio
        FROM VALORACION_USUARIO_INER
        WHERE ID_USUARIO = $1;
      `;
      const values = [idUsuario];

      const result = await pool.query(query, values);
      const promedio = result.rows[0].promedio;
      return promedio ? parseFloat(promedio) : null; // Convierte a número o retorna null si no hay datos
    } catch (error) {
      console.error('Error al obtener promedio de valoraciones por ID_USUARIO:', error);
      throw error;
    }
  },

  /**
   * Obtiene todas las valoraciones para un usuario específico.
   * @param {string} idUsuario - ID_USUARIO del usuario.
   * @returns {Promise<Array<Object>>} - Retorna una lista de valoraciones del usuario.
   */
  getValoracionesByUsuarioId: async (idUsuario) => {
    try {
      const query = `
        SELECT * FROM VALORACION_USUARIO_INER
        WHERE ID_USUARIO = $1
        ORDER BY ID_INER;
      `;
      const values = [idUsuario];

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener valoraciones por ID_USUARIO:', error);
      throw error;
    }
  }
};

module.exports = ValoracionUsuarioIner;