const pool = require('../config/bd.confing');

// Modelo de Contrato
const Contrato = {
  /**
   * Crea un nuevo contrato en la tabla CONTRATO.
   * @param {Object} contrato - Objeto con los datos del contrato.
   * @returns {Promise<Object>} - Retorna el contrato creado.
   */
  createContrato: async (contrato) => {
    try {
      const query = `
        INSERT INTO CONTRATO (ID_SERVICIO, ID_INER, ID_USUARIO, ID_ESTADO_CONTRATO, FECHA_CONTRATACION, DESCUENTO_CONTRATO)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const values = [
        contrato.id_servicio,
        contrato.id_iner,
        contrato.id_usuario,
        contrato.id_estado_contrato,
        contrato.fecha_contratacion || new Date(),
        contrato.descuento_contrato || null
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al crear contrato:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los contratos de un usuario con información detallada de las tablas relacionadas.
   * @param {string} idUsuario - ID del usuario (formato USER_(UUID)).
   * @returns {Promise<Array<Object>>} - Retorna una lista de contratos con datos relacionados.
   */
  getContratosByUsuario: async (idUsuario) => {
    try {
      const query = `
        SELECT 
          c.ID_CONTRATO,
          c.ID_SERVICIO,
          c.ID_INER,
          c.ID_USUARIO,
          c.ID_ESTADO_CONTRATO,
          c.FECHA_CONTRATACION,
          c.DESCUENTO_CONTRATO,
          s.TITULO_SERVICIO,
          s.SUBTITULO_SERVICIO,
          s.DESCRIPCION_SERVICIO,
          t.UNIDAD_TARIFA,
          t.PRECIO_UNIDAD_TARIFA,
          i.TELEFONO_INER
        FROM CONTRATO c
        JOIN SERVICIO s ON c.ID_SERVICIO = s.ID_SERVICIO
        JOIN TARIFA t ON s.ID_TARIFA = t.ID_TARIFA
        JOIN INER i ON c.ID_INER = i.ID_INER
        WHERE c.ID_USUARIO = $1
        ORDER BY c.FECHA_CONTRATACION DESC;
      `;
      const values = [idUsuario];

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener contratos por usuario:', error);
      throw error;
    }
  },

  /**
   * Obtiene un contrato por su ID con información detallada de las tablas relacionadas.
   * @param {number} idContrato - ID del contrato.
   * @returns {Promise<Object|null>} - Retorna el contrato si existe o null si no.
   */
  getContratoById: async (idContrato) => {
    try {
      const query = `
        SELECT 
          c.ID_CONTRATO,
          c.ID_SERVICIO,
          c.ID_INER,
          c.ID_USUARIO,
          c.ID_ESTADO_CONTRATO,
          c.FECHA_CONTRATACION,
          c.DESCUENTO_CONTRATO,
          s.TITULO_SERVICIO,
          s.SUBTITULO_SERVICIO,
          s.DESCRIPCION_SERVICIO,
          t.UNIDAD_TARIFA,
          t.PRECIO_UNIDAD_TARIFA,
          i.TELEFONO_INER
        FROM CONTRATO c
        JOIN SERVICIO s ON c.ID_SERVICIO = s.ID_SERVICIO
        JOIN TARIFA t ON s.ID_TARIFA = t.ID_TARIFA
        JOIN INER i ON c.ID_INER = i.ID_INER
        WHERE c.ID_CONTRATO = $1;
      `;
      const values = [idContrato];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al obtener contrato por ID:', error);
      throw error;
    }
  },

  /**
   * Actualiza un contrato por su ID.
   * @param {number} idContrato - ID del contrato.
   * @param {Object} contrato - Datos del contrato a actualizar.
   * @returns {Promise<Object|null>} - Retorna el contrato actualizado o null si no existe.
   */
  updateContrato: async (idContrato, contrato) => {
    try {
      const query = `
        UPDATE CONTRATO
        SET 
          ID_SERVICIO = $2,
          ID_INER = $3,
          ID_USUARIO = $4,
          ID_ESTADO_CONTRATO = $5,
          FECHA_CONTRATACION = $6,
          DESCUENTO_CONTRATO = $7
        WHERE ID_CONTRATO = $1
        RETURNING *;
      `;
      const values = [
        idContrato,
        contrato.id_servicio,
        contrato.id_iner,
        contrato.id_usuario,
        contrato.id_estado_contrato,
        contrato.fecha_contratacion || new Date(),
        contrato.descuento_contrato || null
      ];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar contrato:', error);
      throw error;
    }
  },

  /**
   * Elimina un contrato por su ID.
   * @param {number} idContrato - ID del contrato.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteContrato: async (idContrato) => {
    try {
      const query = `
        DELETE FROM CONTRATO
        WHERE ID_CONTRATO = $1;
      `;
      const values = [idContrato];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar contrato:', error);
      throw error;
    }
  },

  /**
   * Actualiza el ID_ESTADO_CONTRATO de un contrato.
   * @param {number} idContrato - ID del contrato.
   * @param {number} idEstadoContrato - Nuevo ID del estado del contrato.
   * @returns {Promise<Object|null>} - Retorna el contrato actualizado o null si no existe.
   */
  updateEstadoContrato: async (idContrato, idEstadoContrato) => {
    try {
      const query = `
        UPDATE CONTRATO
        SET ID_ESTADO_CONTRATO = $2
        WHERE ID_CONTRATO = $1
        RETURNING *;
      `;
      const values = [idContrato, idEstadoContrato];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar estado del contrato:', error);
      throw error;
    }
  },


/**
 * Obtiene todos los contratos de un INER con información detallada de las tablas relacionadas.
 * @param {string} idIner - ID del INER (formato INER_(UUID)).
 * @returns {Promise<Array<Object>>} - Retorna una lista de contratos con datos relacionados.
 */
getContratosByIner: async (idIner) => {
  try {
    const query = `
      SELECT 
        c.ID_CONTRATO,
        c.ID_SERVICIO,
        c.ID_INER,
        c.ID_USUARIO,
        c.ID_ESTADO_CONTRATO,
        c.FECHA_CONTRATACION,
        c.DESCUENTO_CONTRATO,
        s.TITULO_SERVICIO,
        s.SUBTITULO_SERVICIO,
        s.DESCRIPCION_SERVICIO,
        t.UNIDAD_TARIFA,
        t.PRECIO_UNIDAD_TARIFA,
        i.TELEFONO_INER
      FROM CONTRATO c
      JOIN SERVICIO s ON c.ID_SERVICIO = s.ID_SERVICIO
      JOIN TARIFA t ON s.ID_TARIFA = t.ID_TARIFA
      JOIN INER i ON c.ID_INER = i.ID_INER
      WHERE c.ID_INER = $1
      ORDER BY c.FECHA_CONTRATACION DESC;
    `;
    const values = [idIner];

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener contratos por INER:', error);
    throw error;
  }
},


};

module.exports = Contrato;