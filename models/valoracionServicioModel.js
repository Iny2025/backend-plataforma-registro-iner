const pool = require('../config/bd.confing');

// Modelo de ValoracionServicioUsuario
const ValoracionServicioUsuario = {
  /**
   * Crea una nueva valoración en la tabla VALORACION_SERVICIO_USUARIO.
   * @param {Object} valoracion - Objeto con los datos de la valoración.
   * @returns {Promise<Object>} - Retorna la valoración creada.
   */
  createValoracion: async (valoracion) => {
    try {
      const query = `
        INSERT INTO VALORACION_SERVICIO_USUARIO (ID_SERVICIO, ID_USUARIO, ID_CONTRATO, VALORACION_SERVICIO)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [
        valoracion.id_servicio,
        valoracion.id_usuario,
        valoracion.id_contrato,
        valoracion.valoracion_servicio
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear valoración:', error);
      throw error;
    }
  },

  /**
   * Obtiene una valoración por su clave primaria (ID_SERVICIO, ID_USUARIO, ID_CONTRATO).
   * @param {Object} params - Objeto con id_servicio, id_usuario e id_contrato.
   * @returns {Promise<Object|null>} - Retorna la valoración si existe o null si no.
   */
  getValoracionById: async ({ id_servicio, id_usuario, id_contrato }) => {
    try {
      const query = `
        SELECT * FROM VALORACION_SERVICIO_USUARIO
        WHERE ID_SERVICIO = $1 AND ID_USUARIO = $2 AND ID_CONTRATO = $3;
      `;
      const values = [id_servicio, id_usuario, id_contrato];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al obtener valoración por ID:', error);
      throw error;
    }
  },

  /**
   * Obtiene todas las valoraciones.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todas las valoraciones.
   */
  getAllValoraciones: async () => {
    try {
      const query = `
        SELECT * FROM VALORACION_SERVICIO_USUARIO
        ORDER BY ID_SERVICIO, ID_USUARIO, ID_CONTRATO;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todas las valoraciones:', error);
      throw error;
    }
  },

  /**
   * Actualiza una valoración por su clave primaria.
   * @param {Object} params - Objeto con id_servicio, id_usuario e id_contrato.
   * @param {Object} valoracion - Datos de la valoración a actualizar.
   * @returns {Promise<Object|null>} - Retorna la valoración actualizada o null si no existe.
   */
  updateValoracion: async ({ id_servicio, id_usuario, id_contrato }, valoracion) => {
    try {
      const query = `
        UPDATE VALORACION_SERVICIO_USUARIO
        SET VALORACION_SERVICIO = $4
        WHERE ID_SERVICIO = $1 AND ID_USUARIO = $2 AND ID_CONTRATO = $3
        RETURNING *;
      `;
      const values = [id_servicio, id_usuario, id_contrato, valoracion.valoracion_servicio];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar valoración:', error);
      throw error;
    }
  },

  /**
   * Elimina una valoración por su clave primaria.
   * @param {Object} params - Objeto con id_servicio, id_usuario e id_contrato.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteValoracion: async ({ id_servicio, id_usuario, id_contrato }) => {
    try {
      const query = `
        DELETE FROM VALORACION_SERVICIO_USUARIO
        WHERE ID_SERVICIO = $1 AND ID_USUARIO = $2 AND ID_CONTRATO = $3;
      `;
      const values = [id_servicio, id_usuario, id_contrato];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar valoración:', error);
      throw error;
    }
  },

  /**
   * Obtiene el promedio de valoraciones de un servicio por su ID_SERVICIO.
   * @param {number} idServicio - ID del servicio.
   * @returns {Promise<number|null>} - Retorna el promedio de valoraciones o null si no hay valoraciones.
   */
  getPromedioValoracionesByServicio: async (idServicio) => {
    try {
      const query = `
        SELECT AVG(VALORACION_SERVICIO)::numeric AS promedio
        FROM VALORACION_SERVICIO_USUARIO
        WHERE ID_SERVICIO = $1;
      `;
      const values = [idServicio];

      const result = await pool.query(query, values);
      return result.rows[0].promedio ? parseFloat(result.rows[0].promedio) : null;
    } catch (error) {
      console.error('Error al obtener promedio de valoraciones por servicio:', error);
      throw error;
    }
  },

  /**
   * Actualiza VALORACION_PROM_SERVICIO en la tabla SERVICIO basado en las valoraciones.
   * @param {number} idServicio - ID del servicio.
   * @returns {Promise<Object|null>} - Retorna el servicio actualizado o null si no existe.
   */
  updateValoracionPromServicio: async (idServicio) => {
    try {
      const query = `
        UPDATE SERVICIO
        SET VALORACION_PROM_SERVICIO = (
          SELECT ROUND(AVG(VALORACION_SERVICIO))::integer
          FROM VALORACION_SERVICIO_USUARIO
          WHERE ID_SERVICIO = $1
        )
        WHERE ID_SERVICIO = $1
        RETURNING *;
      `;
      const values = [idServicio];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar valoración promedio del servicio:', error);
      throw error;
    }
  },

  /**
   * Obtiene el promedio de valoraciones de un INER basado en los servicios asociados.
   * @param {string} idIner - ID del INER.
   * @returns {Promise<number|null>} - Retorna el promedio de valoraciones o null si no hay valoraciones.
   */
  getPromedioValoracionesByIner: async (idIner) => {
    try {
      const query = `
        SELECT AVG(v.VALORACION_SERVICIO)::numeric AS promedio
        FROM VALORACION_SERVICIO_USUARIO v
        JOIN SERVICIO s ON v.ID_SERVICIO = s.ID_SERVICIO
        WHERE s.ID_INER = $1;
      `;
      const values = [idIner];

      const result = await pool.query(query, values);
      return result.rows[0].promedio ? parseFloat(result.rows[0].promedio) : null;
    } catch (error) {
      console.error('Error al obtener promedio de valoraciones por INER:', error);
      throw error;
    }
  },

  /**
   * Actualiza VALORACION_PROM_INER en la tabla INER basado en las valoraciones de servicios.
   * @param {string} idIner - ID del INER.
   * @returns {Promise<Object|null>} - Retorna el INER actualizado o null si no existe.
   */
  updateValoracionPromIner: async (idIner) => {
    try {
      const query = `
        UPDATE INER
        SET VALORACION_PROM_INER = (
          SELECT ROUND(AVG(v.VALORACION_SERVICIO))::integer
          FROM VALORACION_SERVICIO_USUARIO v
          JOIN SERVICIO s ON v.ID_SERVICIO = s.ID_SERVICIO
          WHERE s.ID_INER = $1
        )
        WHERE ID_INER = $1
        RETURNING *;
      `;
      const values = [idIner];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar valoración promedio del INER:', error);
      throw error;
    }
  }
};

module.exports = ValoracionServicioUsuario;