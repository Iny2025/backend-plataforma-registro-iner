const pool = require('../config/bd.confing');
const bcrypt = require('bcrypt');

// Modelo de USUARIO
const Usuario = {
  /**
   * Agrega un nuevo usuario a la tabla USUARIO con la contraseña encriptada.
   * @param {Object} usuario - Objeto con los datos del usuario.
   * @returns {Promise<Object>} - Retorna el usuario agregado, incluyendo ID_USUARIO generado.
   */
  addUsuario: async (usuario) => {
    try {
      // Encriptar la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(usuario.pass_usuario, saltRounds);

      const query = `
        INSERT INTO USUARIO (
          RUT_USUARIO,
          NOM_USUARIO,
          TELEFONO_USUARIO,
          ID_PAIS,
          ID_REGION,
          ID_COMUNA,
          MAIL_USUARIO,
          PASS_USUARIO,
          VALORACION_PROM_USUARIO
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
      `;
      const values = [
        usuario.rut_usuario,
        usuario.nom_usuario,
        usuario.telefono_usuario || null,
        usuario.id_pais,
        usuario.id_region,
        usuario.id_comuna,
        usuario.mail_usuario,
        hashedPassword, // Guardar la contraseña encriptada
        usuario.valoracion_prom_usuario || null
      ];

      const result = await pool.query(query, values);
      return result.rows[0]; // Incluye ID_USUARIO generado por el trigger
    } catch (error) {
      console.error('Error al agregar usuario:', error);
      throw error;
    }
  },

  /**
   * Obtiene un usuario por su ID_USUARIO.
   * @param {string} id - ID_USUARIO del usuario.
   * @returns {Promise<Object|null>} - Retorna el usuario si existe o null si no.
   */
  findUsuarioById: async (id) => {
    try {
      const query = `
        SELECT * FROM USUARIO
        WHERE ID_USUARIO = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al buscar usuario por ID:', error);
      throw error;
    }
  },

  /**
   * Actualiza un usuario por su ID_USUARIO, encriptando la contraseña si se proporciona.
   * @param {string} id - ID_USUARIO del usuario.
   * @param {Object} usuario - Datos del usuario a actualizar.
   * @returns {Promise<Object|null>} - Retorna el usuario actualizado o null si no existe.
   */
  updateUsuario: async (id, usuario) => {
    try {
      let hashedPassword = usuario.pass_usuario;
      if (usuario.pass_usuario) {
        // Encriptar la nueva contraseña si se proporciona
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(usuario.pass_usuario, saltRounds);
      }

      const query = `
        UPDATE USUARIO
        SET
          RUT_USUARIO = $2,
          NOM_USUARIO = $3,
          TELEFONO_USUARIO = $4,
          ID_PAIS = $5,
          ID_REGION = $6,
          ID_COMUNA = $7,
          MAIL_USUARIO = $8,
          PASS_USUARIO = $9,
          VALORACION_PROM_USUARIO = $10
        WHERE ID_USUARIO = $1
        RETURNING *;
      `;
      const values = [
        id,
        usuario.rut_usuario,
        usuario.nom_usuario,
        usuario.telefono_usuario || null,
        usuario.id_pais,
        usuario.id_region,
        usuario.id_comuna,
        usuario.mail_usuario,
        hashedPassword, // Usar la contraseña encriptada o la existente
        usuario.valoracion_prom_usuario || null
      ];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  },

  /**
   * Elimina un usuario por su ID_USUARIO.
   * @param {string} id - ID_USUARIO del usuario.
   * @returns {Promise<boolean>} - Retorna true si se eliminó, false si no.
   */
  deleteUsuario: async (id) => {
    try {
      const query = `
        DELETE FROM USUARIO
        WHERE ID_USUARIO = $1;
      `;
      const values = [id];

      const result = await pool.query(query, values);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los usuarios.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todos los usuarios.
   */
  getAllUsuarios: async () => {
    try {
      const query = `
        SELECT * FROM USUARIO
        ORDER BY FECHA_CREACION_USUARIO DESC;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw error;
    }
  },

  /**
   * Obtiene un usuario por su RUT_USUARIO.
   * @param {string} rut - RUT_USUARIO del usuario.
   * @returns {Promise<Object|null>} - Retorna el usuario si existe o null si no.
   */
  findUsuarioByRut: async (rut) => {
    try {
      const query = `
        SELECT * FROM USUARIO
        WHERE RUT_USUARIO = $1;
      `;
      const values = [rut];

      const result = await pool.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error al buscar usuario por RUT:', error);
      throw error;
    }
  },

  /**
   * Busca un usuario por su correo y verifica la contraseña.
   * @param {string} mail_usuario - Correo del usuario.
   * @param {string} pass_usuario - Contraseña en texto plano.
   * @returns {Promise<Object|null>} - Retorna el usuario si la contraseña es válida, null si no.
   */
  findByMailAndPassword: async (mail_usuario, pass_usuario) => {
    try {
      const query = `
        SELECT * FROM USUARIO
        WHERE MAIL_USUARIO = $1;
      `;
      const values = [mail_usuario];

      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return null;
      }

      const usuario = result.rows[0];
      // Comparar la contraseña proporcionada con el hash almacenado
      const isMatch = await bcrypt.compare(pass_usuario, usuario.pass_usuario);
      return isMatch ? usuario : null;
    } catch (error) {
      console.error('Error al buscar usuario por correo y contraseña:', error);
      throw error;
    }
  }
};

module.exports = Usuario;