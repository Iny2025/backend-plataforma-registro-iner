// Importar el pool de conexiones
const pool = require('../config/bd.confing'); 

// Modelo de Notificaciones
const Notificacion = {
  /**
   * Crea un nuevo registro en la tabla NOTIFICACION_USUARIO.
   * @param {Object} notificacion - Objeto con los datos de la notificación.
   * @returns {Promise<Object>} - Retorna el registro creado, incluyendo ID_NOTIFICACION_USUARIO generado.
   */
  createNotificacionUsuario: async (notificacion) => {
    try {
      const query = `
        INSERT INTO NOTIFICACION_USUARIO (
          ID_USUARIO,
          DESCRIPCION_NOTIFICACION
        ) VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [
        notificacion.id_usuario,
        notificacion.descripcion_notificacion
      ];

      const result = await pool.query(query, values);
      return result.rows[0]; // Incluye ID_NOTIFICACION_USUARIO generado por BIGSERIAL
    } catch (error) {
      console.error('Error al crear notificación para usuario:', error);
      throw error;
    }
  },

  /**
   * Obtiene todas las notificaciones de un usuario por su ID_USUARIO.
   * @param {string} idUsuario - ID_USUARIO del usuario.
   * @returns {Promise<Array<Object>>} - Retorna una lista de notificaciones del usuario.
   */
  getNotificacionesByUsuarioId: async (idUsuario) => {
    try {
      const query = `
        SELECT * FROM NOTIFICACION_USUARIO
        WHERE ID_USUARIO = $1
        ORDER BY ID_NOTIFICACION_USUARIO DESC;
      `;
      const values = [idUsuario];

      const result = await pool.query(query, values);
      return result.rows; // Lista de notificaciones
    } catch (error) {
      console.error('Error al obtener notificaciones por ID_USUARIO:', error);
      throw error;
    }
  },

  /**
   * Crea un nuevo registro en la tabla NOTIFICACION_INER.
   * @param {Object} notificacion - Objeto con los datos de la notificación.
   * @returns {Promise<Object>} - Retorna el registro creado, incluyendo ID_NOTIFICACION_INER generado.
   */
  createNotificacionIner: async (notificacion) => {
    try {
      const query = `
        INSERT INTO NOTIFICACION_INER (
          ID_INER,
          DESCRIPCION_NOTI_INER
        ) VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [
        notificacion.id_iner,
        notificacion.descripcion_noti_iner
      ];

      const result = await pool.query(query, values);
      return result.rows[0]; // Incluye ID_NOTIFICACION_INER generado por BIGSERIAL
    } catch (error) {
      console.error('Error al crear notificación para INER:', error);
      throw error;
    }
  },

  /**
   * Obtiene todas las notificaciones de un INER por su ID_INER.
   * @param {string} idIner - ID_INER del registro INER.
   * @returns {Promise<Array<Object>>} - Retorna una lista de notificaciones del INER.
   */
  getNotificacionesByInerId: async (idIner) => {
    try {
      const query = `
        SELECT * FROM NOTIFICACION_INER
        WHERE ID_INER = $1
        ORDER BY ID_NOTIFICACION_INER DESC;
      `;
      const values = [idIner];

      const result = await pool.query(query, values);
      return result.rows; // Lista de notificaciones
    } catch (error) {
      console.error('Error al obtener notificaciones por ID_INER:', error);
      throw error;
    }
  },
  /**
   * Elimina una notificación de la tabla NOTIFICACION_USUARIO.
   * @param {string} idNotificacion - ID de la notificación a eliminar.
   * @returns {Promise<void>} - Retorna un mensaje indicando el resultado de la operación.
   */
  deleteNotificacionUsuario: async (idNotificacion) => {
    try {
      const query = `
        DELETE FROM NOTIFICACION_USUARIO
        WHERE ID_NOTIFICACION_USUARIO = $1;
      `;
      const values = [idNotificacion];

      await pool.query(query, values);
      console.log(`Notificación con ID ${idNotificacion} eliminada`);
    } catch (error) {
      console.error('Error al eliminar notificación de usuario:', error);
      throw error;
    }
  },
  
  /**
   * Elimina una notificación de la tabla NOTIFICACION_INER.
   * @param {string} idNotificacion - ID de la notificación a eliminar.
   * @returns {Promise<void>} - Retorna un mensaje indicando el resultado de la operación.
   */
  deleteNotificacionIner: async (idNotificacion) => {
    try {
      const query = `
        DELETE FROM NOTIFICACION_INER
        WHERE ID_NOTIFICACION_INER = $1;
      `;
      const values = [idNotificacion];

      await pool.query(query, values);
      console.log(`Notificación con ID ${idNotificacion} eliminada`);
    } catch (error) {
      console.error('Error al eliminar notificación de INER:', error);
      throw error;
    }
  }

};

module.exports = Notificacion;