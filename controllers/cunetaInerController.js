const CuentaIner = require('../models/cuentaInerModel');

const cuentaInerController = {
  /**
   * Crea una nueva cuenta INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createCuentaIner: async (req, res) => {
    try {
      const {
        rut_iner,
        id_iner,
        nombre_titular_cuenta,
        id_tipo_cuenta,
        id_banco,
        numero_cuenta,
        email_titular_cuenta
      } = req.body;

      // Validar campos requeridos
      if (!rut_iner || !id_iner || !nombre_titular_cuenta || !id_tipo_cuenta || !id_banco || !numero_cuenta) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: rut_iner, id_iner, nombre_titular_cuenta, id_tipo_cuenta, id_banco o numero_cuenta' 
        });
      }

      const newCuenta = {
        rut_iner,
        id_iner,
        nombre_titular_cuenta,
        id_tipo_cuenta,
        id_banco,
        numero_cuenta,
        email_titular_cuenta
      };

      const result = await CuentaIner.createCuentaIner(newCuenta);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createCuentaIner:', error);
      res.status(500).json({ 
        message: 'Error al crear la cuenta INER', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene una cuenta INER por su RUT_INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getCuentaInerByRut: async (req, res) => {
    try {
      const { rut } = req.params;

      if (!rut) {
        return res.status(400).json({ message: 'El RUT del INER es requerido' });
      }

      const cuenta = await CuentaIner.findCuentaInerByRut(rut);
      if (!cuenta) {
        return res.status(404).json({ message: 'Cuenta INER no encontrada' });
      }
      res.status(200).json(cuenta);
    } catch (error) {
      console.error('Error en getCuentaInerByRut:', error);
      res.status(500).json({ 
        message: 'Error al obtener la cuenta INER', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todas las cuentas INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllCuentasIner: async (req, res) => {
    try {
      const cuentas = await CuentaIner.getAllCuentasIner();
      if (cuentas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron cuentas INER' });
      }
      res.status(200).json(cuentas);
    } catch (error) {
      console.error('Error en getAllCuentasIner:', error);
      res.status(500).json({ 
        message: 'Error al obtener las cuentas INER', 
        error: error.message 
      });
    }
  },

  /**
   * Actualiza una cuenta INER por su RUT_INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateCuentaIner: async (req, res) => {
    try {
      const { rut } = req.params;
      const {
        id_iner,
        nombre_titular_cuenta,
        id_tipo_cuenta,
        id_banco,
        numero_cuenta,
        email_titular_cuenta
      } = req.body;

      if (!rut) {
        return res.status(400).json({ message: 'El RUT del INER es requerido' });
      }
      if (!id_iner || !nombre_titular_cuenta || !id_tipo_cuenta || !id_banco || !numero_cuenta) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: id_iner, nombre_titular_cuenta, id_tipo_cuenta, id_banco o numero_cuenta' 
        });
      }

      const updatedCuenta = {
        id_iner,
        nombre_titular_cuenta,
        id_tipo_cuenta,
        id_banco,
        numero_cuenta,
        email_titular_cuenta
      };

      const result = await CuentaIner.updateCuentaIner(rut, updatedCuenta);
      if (!result) {
        return res.status(404).json({ message: 'Cuenta INER no encontrada' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateCuentaIner:', error);
      res.status(500).json({ 
        message: 'Error al actualizar la cuenta INER', 
        error: error.message 
      });
    }
  },

  /**
   * Elimina una cuenta INER por su RUT_INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteCuentaIner: async (req, res) => {
    try {
      const { rut } = req.params;

      if (!rut) {
        return res.status(400).json({ message: 'El RUT del INER es requerido' });
      }

      const deleted = await CuentaIner.deleteCuentaIner(rut);
      if (!deleted) {
        return res.status(404).json({ message: 'Cuenta INER no encontrada' });
      }
      res.status(200).json({ message: 'Cuenta INER eliminada con éxito' });
    } catch (error) {
      console.error('Error en deleteCuentaIner:', error);
      res.status(500).json({ 
        message: 'Error al eliminar la cuenta INER', 
        error: error.message 
      });
    }
  },

  /**
   * Verifica si un INER tiene una cuenta registrada por su ID_INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  hasCuentaByIdIner: async (req, res) => {
    try {
      const { idIner } = req.params;

      if (!idIner) {
        return res.status(400).json({ message: 'El ID del INER es requerido' });
      }

      const hasCuenta = await CuentaIner.hasCuentaByIdIner(idIner);
      res.status(200).json({ hasCuenta });
    } catch (error) {
      console.error('Error en hasCuentaByIdIner:', error);
      res.status(500).json({ 
        message: 'Error al verificar la cuenta del INER', 
        error: error.message 
      });
    }
  }
};

module.exports = cuentaInerController;