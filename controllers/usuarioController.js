const Usuario = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

// Controlador de Usuario
const usuarioController = {
  /**
   * Registra un nuevo usuario.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  registerUsuario: async (req, res) => {
    try {
      const {
        rut_usuario,
        nom_usuario,
        telefono_usuario,
        id_pais,
        id_region,
        id_comuna,
        mail_usuario,
        pass_usuario,
        valoracion_prom_usuario
      } = req.body;

      // Validar campos requeridos según la definición de la tabla
      if (!rut_usuario || !nom_usuario || !id_pais || !id_region || !id_comuna || !mail_usuario || !pass_usuario) {
        return res.status(400).json({
          message: 'Faltan campos requeridos: rut_usuario, nom_usuario, id_pais, id_region, id_comuna, mail_usuario o pass_usuario'
        });
      }

      // Validar formato de la contraseña
      if (pass_usuario.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
      }

      const newUsuario = {
        rut_usuario,
        nom_usuario,
        telefono_usuario: telefono_usuario || null,
        id_pais,
        id_region,
        id_comuna,
        mail_usuario,
        pass_usuario, // La contraseña será encriptada en el modelo
        valoracion_prom_usuario: valoracion_prom_usuario || null
      };

      const result = await Usuario.addUsuario(newUsuario);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en registerUsuario:', error);
      res.status(500).json({
        message: 'Error al registrar el usuario',
        error: error.message
      });
    }
  },

  /**
   * Autentica un usuario por correo y contraseña, devolviendo un token JWT.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  loginUsuario: async (req, res) => {
    try {
      const { mail_usuario, pass_usuario } = req.body;

      if (!mail_usuario || !pass_usuario) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
      }

      const usuario = await Usuario.findByMailAndPassword(mail_usuario, pass_usuario);
      if (!usuario) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id_usuario: usuario.id_usuario, mail_usuario: usuario.mail_usuario },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // El token expira en 1 hora
      );

      res.status(200).json({ message: 'Autenticación exitosa', token, usuario });
    } catch (error) {
      console.error('Error en loginUsuario:', error);
      res.status(500).json({
        message: 'Error al autenticar el usuario',
        error: error.message
      });
    }
  },

  /**
   * Obtiene un usuario por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getUsuarioById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID es requerido' });
      }

      const usuario = await Usuario.findUsuarioById(id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error('Error en getUsuarioById:', error);
      res.status(500).json({
        message: 'Error al obtener el usuario',
        error: error.message
      });
    }
  },

  /**
   * Actualiza un usuario por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        rut_usuario,
        nom_usuario,
        telefono_usuario,
        id_pais,
        id_region,
        id_comuna,
        mail_usuario,
        pass_usuario,
        valoracion_prom_usuario
      } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID es requerido' });
      }

      // Validar campos requeridos
      if (!rut_usuario || !nom_usuario || !id_pais || !id_region || !id_comuna || !mail_usuario) {
        return res.status(400).json({
          message: 'Faltan campos requeridos: rut_usuario, nom_usuario, id_pais, id_region, id_comuna o mail_usuario'
        });
      }

      // Validar formato de la contraseña si se proporciona
      if (pass_usuario && pass_usuario.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
      }

      const updatedUsuario = {
        rut_usuario,
        nom_usuario,
        telefono_usuario: telefono_usuario || null,
        id_pais,
        id_region,
        id_comuna,
        mail_usuario,
        pass_usuario: pass_usuario || null,
        valoracion_prom_usuario: valoracion_prom_usuario || null
      };

      const result = await Usuario.updateUsuario(id, updatedUsuario);
      if (!result) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateUsuario:', error);
      res.status(500).json({
        message: 'Error al actualizar el usuario',
        error: error.message
      });
    }
  },

  /**
   * Elimina un usuario por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteUsuario: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID es requerido' });
      }

      const deleted = await Usuario.deleteUsuario(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
      console.error('Error en deleteUsuario:', error);
      res.status(500).json({
        message: 'Error al eliminar el usuario',
        error: error.message
      });
    }
  },

  /**
   * Obtiene todos los usuarios.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.getAllUsuarios();
      if (usuarios.length === 0) {
        return res.status(404).json({ message: 'No se encontraron usuarios' });
      }
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Error en getAllUsuarios:', error);
      res.status(500).json({
        message: 'Error al obtener los usuarios',
        error: error.message
      });
    }
  },

  /**
   * Obtiene un usuario por su RUT.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getUsuarioByRut: async (req, res) => {
    try {
      const { rut } = req.params;

      if (!rut) {
        return res.status(400).json({ message: 'El RUT es requerido' });
      }

      const usuario = await Usuario.findUsuarioByRut(rut);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error('Error en getUsuarioByRut:', error);
      res.status(500).json({
        message: 'Error al obtener el usuario por RUT',
        error: error.message
      });
    }
  }
};

module.exports = usuarioController;