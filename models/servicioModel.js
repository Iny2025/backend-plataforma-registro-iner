// Importar el pool de conexiones
const pool = require('../config/bd.confing'); // Ajusta la ruta según tu estructura de proyecto

// Modelo de Servicio
const Servicio = {
  /**
   * Crea un nuevo registro en la tabla SERVICIO.
   * @param {Object} servicio - Objeto con los datos del servicio.
   * @returns {Promise<Object>} - Retorna el registro creado, incluyendo ID_SERVICIO generado.
   */
  createServicio: async (servicio) => {
    try {
      const query = `
        INSERT INTO SERVICIO (
          TITULO_SERVICIO,
          SUBTITULO_SERVICIO,
          ID_TARIFA,
          ID_CATEGORIA,
          DESCRIPCION_SERVICIO,
          VALORACION_PROM_SERVICIO,
          ESTADO_PUBLICACION,
          ID_INER
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;
      const values = [
        servicio.titulo_servicio,
        servicio.subtitulo_servicio || null,
        servicio.id_tarifa,
        servicio.id_categoria,
        servicio.descripcion_servicio || null,
        0, // VALORACION_PROM_SERVICIO se establece en 0 por defecto
        false, // ESTADO_PUBLICACION se establece en false por defecto
        servicio.id_iner
      ];

      const result = await pool.query(query, values);
      return result.rows[0]; // Incluye ID_SERVICIO generado por BIGSERIAL
    } catch (error) {
      console.error('Error al crear servicio:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los servicios asociados a un ID_INER.
   * @param {string} idIner - ID_INER del registro INER.
   * @returns {Promise<Array<Object>>} - Retorna una lista de servicios del INER.
   */
  getServiciosByInerId: async (idIner) => {
    try {
      const query = `
        SELECT * FROM SERVICIO
        WHERE ID_INER = $1
        ORDER BY FECHA_CREACION_SERVICIO DESC;
      `;
      const values = [idIner];

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener servicios por ID_INER:', error);
      throw error;
    }
  },

  /**
   * Actualiza el ESTADO_PUBLICACION de un servicio por su ID_SERVICIO.
   * @param {string} id - ID_SERVICIO del servicio.
   * @param {boolean} estadoPublicacion - Nuevo valor para ESTADO_PUBLICACION.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateEstadoPublicacion: async (id, estadoPublicacion) => {
    try {
      const query = `
        UPDATE SERVICIO
        SET 
          ESTADO_PUBLICACION = $2,
          FECHA_MODIFICACION_SERVICIO = CURRENT_DATE
        WHERE ID_SERVICIO = $1
        RETURNING *;
      `;
      const values = [id, estadoPublicacion];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar estado_publicacion:', error);
      throw error;
    }
  },

  /**
   * Edita un servicio por su ID_SERVICIO.
   * @param {string} id - ID_SERVICIO del servicio.
   * @param {Object} servicio - Datos del servicio a actualizar.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateServicio: async (id, servicio) => {
    try {
      const query = `
        UPDATE SERVICIO
        SET
          TITULO_SERVICIO = $2,
          SUBTITULO_SERVICIO = $3,
          ID_TARIFA = $4,
          ID_CATEGORIA = $5,
          DESCRIPCION_SERVICIO = $6,
          VALORACION_PROM_SERVICIO = $7,
          ESTADO_PUBLICACION = $8,
          ID_INER = $9,
          FECHA_MODIFICACION_SERVICIO = CURRENT_DATE
        WHERE ID_SERVICIO = $1
        RETURNING *;
      `;
      const values = [
        id,
        servicio.titulo_servicio,
        servicio.subtitulo_servicio || null,
        servicio.id_tarifa,
        servicio.id_categoria,
        servicio.descripcion_servicio || null,
        servicio.valoracion_prom_servicio !== undefined ? servicio.valoracion_prom_servicio : 0,
        servicio.estado_publicacion !== undefined ? servicio.estado_publicacion : false,
        servicio.id_iner
      ];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar servicio:', error);
      throw error;
    }
  }
};

module.exports = Servicio;