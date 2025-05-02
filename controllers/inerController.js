const Iner = require('../models/inerModel');
const jwt = require('jsonwebtoken');

// Controlador de Iner
const inerController = {
  /**
   * Registra un nuevo INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  registerIner: async (req, res) => {
    try {
      const {
        rut_iner,
        nom_iner,
        mail_iner,
        pass_iner,
        id_pais,
        id_region,
        id_comuna,
        telefono_iner,
        valoracion_prom_iner,
        descr_perfil_iner,
        direccion_iner
      } = req.body;

      // Validar campos requeridos
      if (!rut_iner || !nom_iner || !mail_iner || !pass_iner || !id_pais || !id_region || !id_comuna) {
        return res.status(400).json({
          message: 'Faltan campos requeridos: rut_iner, nom_iner, mail_iner, pass_iner, id_pais, id_region o id_comuna'
        });
      }

      // Validar formato de la contraseña
      if (pass_iner.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
      }

      const newIner = {
        rut_iner,
        nom_iner,
        mail_iner,
        pass_iner, // La contraseña será encriptada en el modelo
        id_pais,
        id_region,
        id_comuna,
        telefono_iner,
        valoracion_prom_iner,
        descr_perfil_iner,
        direccion_iner
      };

      const result = await Iner.addIner(newIner);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en registerIner:', error);
      res.status(500).json({
        message: 'Error al registrar el INER',
        error: error.message
      });
    }
  },

  /**
   * Autentica un INER por correo y contraseña, devolviendo un token JWT.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  loginIner: async (req, res) => {
    try {
      const { mail_iner, pass_iner } = req.body;

      if (!mail_iner || !pass_iner) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
      }

      const iner = await Iner.findByMailAndPassword(mail_iner, pass_iner);
      if (!iner) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id_iner: iner.id_iner, mail_iner: iner.mail_iner },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // El token expira en 1 hora
      );

      res.status(200).json({ message: 'Autenticación exitosa', token, iner });
    } catch (error) {
      console.error('Error en loginIner:', error);
      res.status(500).json({
        message: 'Error al autenticar el INER',
        error: error.message
      });
    }
  },

  /**
   * Obtiene un INER por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getInerById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID es requerido' });
      }

      const iner = await Iner.findInerById(id);
      if (!iner) {
        return res.status(404).json({ message: 'INER no encontrado' });
      }
      res.status(200).json(iner);
    } catch (error) {
      console.error('Error en getInerById:', error);
      res.status(500).json({
        message: 'Error al obtener el INER',
        error: error.message
      });
    }
  },

  /**
   * Actualiza un INER por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateIner: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        rut_iner,
        nom_iner,
        mail_iner,
        pass_iner,
        id_pais,
        id_region,
        id_comuna,
        telefono_iner,
        valoracion_prom_iner,
        descr_perfil_iner,
        direccion_iner
      } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID es requerido' });
      }

      // Validar campos requeridos
      if (!rut_iner || !nom_iner || !mail_iner || !id_pais || !id_region || !id_comuna) {
        return res.status(400).json({
          message: 'Faltan campos requeridos: rut_iner, nom_iner, mail_iner, id_pais, id_region o id_comuna'
        });
      }

      // Validar formato de la contraseña si se proporciona
      if (pass_iner && pass_iner.length < 8) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
      }

      const updatedIner = {
        rut_iner,
        nom_iner,
        mail_iner,
        pass_iner: pass_iner || null,
        id_pais,
        id_region,
        id_comuna,
        telefono_iner,
        valoracion_prom_iner,
        descr_perfil_iner,
        direccion_iner
      };

      const result = await Iner.updateIner(id, updatedIner);
      if (!result) {
        return res.status(404).json({ message: 'INER no encontrado' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateIner:', error);
      res.status(500).json({
        message: 'Error al actualizar el INER',
        error: error.message
      });
    }
  },

  /**
   * Elimina un INER por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteIner: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID es requerido' });
      }

      const deleted = await Iner.deleteIner(id);
      if (!deleted) {
        return res.status(404).json({ message: 'INER no encontrado' });
      }
      res.status(200).json({ message: 'INER eliminado con éxito' });
    } catch (error) {
      console.error('Error en deleteIner:', error);
      res.status(500).json({
        message: 'Error al eliminar el INER',
        error: error.message
      });
    }
  },

  /**
   * Obtiene todos los INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllIner: async (req, res) => {
    try {
      const iners = await Iner.getAllIner();
      if (iners.length === 0) {
        return res.status(404).json({ message: 'No se encontraron INER' });
      }
      res.status(200).json(iners);
    } catch (error) {
      console.error('Error en getAllIner:', error);
      res.status(500).json({
        message: 'Error al obtener los INER',
        error: error.message
      });
    }
  }
};

module.exports = inerController;