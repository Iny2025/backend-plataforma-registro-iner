const pool = require('../config/bd.confing'); // Ajusta la ruta según tu estructura de proyecto

const Publicacion = {
  /**
   * Crea un nuevo registro en la tabla PUBLICACION.
   * @param {Object} publicacion - Objeto con los datos de la publicación.
   * @returns {Promise<Object>} - Retorna el registro creado.
   */
  createPublicacion: async (publicacion) => {
    try {
      const query = `
        INSERT INTO PUBLICACION (
          ID_SERVICIO,
          ID_INER,
          ID_PAIS,
          ID_REGION,
          ID_COMUNA,
          DIRECCION_PUBLICACION,
          DESCUENTO_PUBLICACION,
          CONTACTO_PUBLICACION
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;
      const values = [
        publicacion.id_servicio,
        publicacion.id_iner,
        publicacion.id_pais,
        publicacion.id_region,
        publicacion.id_comuna,
        publicacion.direccion_publicacion || null,
        publicacion.descuento_publicacion || null,
        publicacion.contacto_publicacion || null
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear publicación:', error);
      throw error;
    }
  },

  /**
   * Obtiene publicaciones filtradas por ID_COMUNA y ID_CATEGORIA.
   * @param {number} idComuna - ID_COMUNA de la publicación.
   * @param {number} idCategoria - ID_CATEGORIA del servicio asociado.
   * @returns {Promise<Array<Object>>} - Retorna una lista de publicaciones.
   */
  getPublicacionesByComunaAndCategoria: async (idComuna, idCategoria) => {
    try {
      const query = `
        SELECT p.*, s.TITULO_SERVICIO, s.SUBTITULO_SERVICIO, s.DESCRIPCION_SERVICIO
        FROM PUBLICACION p
        JOIN SERVICIO s ON p.ID_SERVICIO = s.ID_SERVICIO
        WHERE p.ID_COMUNA = $1 AND s.ID_CATEGORIA = $2
        ORDER BY p.FECHA_PUBLICACION DESC;
      `;
      const values = [idComuna, idCategoria];

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener publicaciones por comuna y categoría:', error);
      throw error;
    }
  },

  /**
   * Obtiene los datos de un servicio por su ID_SERVICIO.
   * @param {number} idServicio - ID_SERVICIO del servicio.
   * @returns {Promise<Object|null>} - Retorna el servicio si existe o null si no.
   */
  getServicioById: async (idServicio) => {
    try {
      const query = `
        SELECT * FROM SERVICIO
        WHERE ID_SERVICIO = $1;
      `;
      const values = [idServicio];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al obtener servicio por ID:', error);
      throw error;
    }
  },

  /**
   * Elimina una publicación por su ID_SERVICIO.
   * @param {number} idServicio - ID_SERVICIO de la publicación.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deletePublicacion: async (idServicio) => {
    try {
      const query = `
        DELETE FROM PUBLICACION
        WHERE ID_SERVICIO = $1;
      `;
      const values = [idServicio];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar publicación:', error);
      throw error;
    }
  }
};

module.exports = Publicacion;