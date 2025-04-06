// Importar el modelo Iner
const Iner = require('../models/inerModel'); // Ajusté el nombre a 'iner' para que coincida con lo que hemos usado

const inerController = {
  /**
   * Crea un nuevo registro INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createIner: async (req, res) => {
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
        direccion_iner,
      } = req.body;

      // Validar campos requeridos
      if (!rut_iner || !nom_iner || !mail_iner || !pass_iner || !id_pais || !id_region || !id_comuna) {
        return res.status(400).json({ message: 'Faltan campos requeridos: rut_iner, nom_iner, mail_iner, pass_iner, id_pais, id_region o id_comuna' });
      }

      const newIner = {
        rut_iner,
        nom_iner,
        mail_iner,
        pass_iner,
        id_pais,
        id_region,
        id_comuna,
        telefono_iner: telefono_iner || null, // Campos opcionales pueden ser null
        valoracion_prom_iner: valoracion_prom_iner || null,
        descr_perfil_iner: descr_perfil_iner || null,
        direccion_iner: direccion_iner || null,
      };

      const result = await Iner.addIner(newIner);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createIner:', error);
      res.status(500).json({ message: 'Error al crear el registro INER', error: error.message });
    }
  },

  /**
   * Obtiene un registro INER por su ID.
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
        return res.status(404).json({ message: 'Registro INER no encontrado' });
      }
      res.status(200).json(iner);
    } catch (error) {
      console.error('Error en getInerById:', error);
      res.status(500).json({ message: 'Error al obtener el registro INER', error: error.message });
    }
  },

  /**
   * Actualiza un registro INER por su ID.
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
        direccion_iner,
      } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID es requerido' });
      }

      // Validar campos requeridos
      if (!rut_iner || !nom_iner || !mail_iner || !pass_iner || !id_pais || !id_region || !id_comuna) {
        return res.status(400).json({ message: 'Faltan campos requeridos: rut_iner, nom_iner, mail_iner, pass_iner, id_pais, id_region o id_comuna' });
      }

      const updatedIner = {
        rut_iner,
        nom_iner,
        mail_iner,
        pass_iner,
        id_pais,
        id_region,
        id_comuna,
        telefono_iner: telefono_iner || null,
        valoracion_prom_iner: valoracion_prom_iner || null,
        descr_perfil_iner: descr_perfil_iner || null,
        direccion_iner: direccion_iner || null,
      };

      const result = await Iner.updateIner(id, updatedIner);
      if (!result) {
        return res.status(404).json({ message: 'Registro INER no encontrado' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateIner:', error);
      res.status(500).json({ message: 'Error al actualizar el registro INER', error: error.message });
    }
  },

  /**
   * Elimina un registro INER por su ID.
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
        return res.status(404).json({ message: 'Registro INER no encontrado' });
      }
      res.status(200).json({ message: 'Registro INER eliminado con éxito' });
    } catch (error) {
      console.error('Error en deleteIner:', error);
      res.status(500).json({ message: 'Error al eliminar el registro INER', error: error.message });
    }
  },

  /**
   * Obtiene todos los registros INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param

 {Object} res - Objeto de respuesta HTTP.
   */
  getAllIner: async (req, res) => {
    try {
      const iners = await Iner.getAllIner();
      if (iners.length === 0) {
        return res.status(404).json({ message: 'No se encontraron registros INER' });
      }
      res.status(200).json(iners);
    } catch (error) {
      console.error('Error en getAllIner:', error);
      res.status(500).json({ message: 'Error al obtener los registros INER', error: error.message });
    }
  },
};

module.exports = inerController;