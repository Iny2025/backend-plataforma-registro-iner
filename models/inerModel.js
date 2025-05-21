const pool = require('../config/bd.confing');
const bcrypt = require('bcrypt');

// Modelo de INER
const Iner = {
  /**
   * Agrega un nuevo registro a la tabla INER con la contraseña encriptada.
   * @param {Object} iner - Objeto con los datos del registro INER.
   * @returns {Promise<Object>} - Retorna el registro agregado, incluyendo ID_INER generado.
   */
  addIner: async (iner) => {
    try {
      // Encriptar la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(iner.pass_iner, saltRounds);

      const query = `
        INSERT INTO INER (
          RUT_INER,
          NOM_INER,
          MAIL_INER,
          PASS_INER,
          ID_PAIS,
          ID_REGION,
          ID_COMUNA,
          TELEFONO_INER,
          VALORACION_PROM_INER,
          DESCR_PERFIL_INER,
          DIRECCION_INER
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
      `;
      const values = [
        iner.rut_iner,
        iner.nom_iner,
        iner.mail_iner,
        hashedPassword, // Guardar la contraseña encriptada
        iner.id_pais,
        iner.id_region,
        iner.id_comuna,
        iner.telefono_iner || null,
        iner.valoracion_prom_iner || null,
        iner.descr_perfil_iner || null,
        iner.direccion_iner || null
      ];

      const result = await pool.query(query, values);
      return result.rows[0]; // Incluye ID_INER generado por el trigger
    } catch (error) {
      console.error('Error al agregar INER:', error);
      throw error;
    }
  },

  /**
   * Obtiene un registro INER por su ID_INER.
   * @param {string} id - ID_INER del registro.
   * @returns {Promise<Object|null>} - Retorna el registro si existe o null si no.
   */
  findInerById: async (id) => {
    try {
      const query = `
        SELECT * FROM INER
        WHERE ID_INER = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al buscar INER por ID:', error);
      throw error;
    }
  },

  /**
   * Actualiza un registro INER por su ID_INER, encriptando la contraseña si se proporciona.
   * @param {string} id - ID_INER del registro.
   * @param {Object} iner - Datos del registro a actualizar.
   * @returns {Promise<Object|null>} - Retorna el registro actualizado o null si no existe.
   */
  updateIner: async (id, iner) => {
    try {
      let hashedPassword = iner.pass_iner;
      if (iner.pass_iner) {
        // Encriptar la nueva contraseña si se proporciona
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(iner.pass_iner, saltRounds);
      }

      const query = `
        UPDATE INER
        SET
          RUT_INER = $2,
          NOM_INER = $3,
          MAIL_INER = $4,
          PASS_INER = $5,
          ID_PAIS = $6,
          ID_REGION = $7,
          ID_COMUNA = $8,
          TELEFONO_INER = $9,
          VALORACION_PROM_INER = $10,
          DESCR_PERFIL_INER = $11,
          DIRECCION_INER = $12
        WHERE ID_INER = $1
        RETURNING *;
      `;
      const values = [
        id,
        iner.rut_iner,
        iner.nom_iner,
        iner.mail_iner,
        hashedPassword || null, // Usar la contraseña encriptada o null
        iner.id_pais,
        iner.id_region,
        iner.id_comuna,
        iner.telefono_iner || null,
        iner.valoracion_prom_iner || null,
        iner.descr_perfil_iner || null,
        iner.direccion_iner || null
      ];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar INER:', error);
      throw error;
    }
  },

  /**
   * Elimina un registro INER por su ID_INER.
   * @param {string} id - ID_INER del registro.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteIner: async (id) => {
    try {
      const query = `
        DELETE FROM INER
        WHERE ID_INER = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar INER:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los registros INER.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todos los registros INER.
   */
  getAllIner: async () => {
    try {
      const query = `
        SELECT * FROM INER
        ORDER BY FECHA_CREACION_INER DESC;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todos los INER:', error);
      throw error;
    }
  },

  /**
   * Busca un INER por su correo y verifica la contraseña.
   * @param {string} mail_iner - Correo del INER.
   * @param {string} pass_iner - Contraseña en texto plano.
   * @returns {Promise<Object|null>} - Retorna el INER si la contraseña es válida, null si no.
   */
  findByMailAndPassword: async (mail_iner, pass_iner) => {
    try {
      const query = `
        SELECT * FROM INER
        WHERE MAIL_INER = $1;
      `;
      const values = [mail_iner];

      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return null;
      }

      const iner = result.rows[0];
      // Comparar la contraseña proporcionada con el hash almacenado
      const isMatch = await bcrypt.compare(pass_iner, iner.pass_iner);
      return isMatch ? iner : null;
    } catch (error) {
      console.error('Error al buscar INER por correo y contraseña:', error);
      throw error;
    }
  }
};

module.exports = Iner;