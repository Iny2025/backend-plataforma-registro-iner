const BancoTipoCuenta = require('../models/bancoTipoCuentaModel'); // Ajusta la ruta según tu estructura de proyecto

const bancoTipoCuentaController = {
  // Operaciones CRUD para BANCO

  /**
   * Crea un nuevo banco.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createBanco: async (req, res) => {
    try {
      const { descripcion_banco } = req.body;

      if (!descripcion_banco) {
        return res.status(400).json({ 
          message: 'El campo descripcion_banco es requerido' 
        });
      }

      const newBanco = { descripcion_banco };
      const result = await BancoTipoCuenta.createBanco(newBanco);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createBanco:', error);
      res.status(500).json({ 
        message: 'Error al crear el banco', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene un banco por su ID_BANCO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getBancoById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del banco es requerido' });
      }

      const banco = await BancoTipoCuenta.findBancoById(id);
      if (!banco) {
        return res.status(404).json({ message: 'Banco no encontrado' });
      }
      res.status(200).json(banco);
    } catch (error) {
      console.error('Error en getBancoById:', error);
      res.status(500).json({ 
        message: 'Error al obtener el banco', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todos los bancos.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllBancos: async (req, res) => {
    try {
      const bancos = await BancoTipoCuenta.getAllBancos();
      if (bancos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron bancos' });
      }
      res.status(200).json(bancos);
    } catch (error) {
      console.error('Error en getAllBancos:', error);
      res.status(500).json({ 
        message: 'Error al obtener los bancos', 
        error: error.message 
      });
    }
  },

  /**
   * Actualiza un banco por su ID_BANCO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateBanco: async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion_banco } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID del banco es requerido' });
      }
      if (!descripcion_banco) {
        return res.status(400).json({ 
          message: 'El campo descripcion_banco es requerido' 
        });
      }

      const updatedBanco = { descripcion_banco };
      const result = await BancoTipoCuenta.updateBanco(id, updatedBanco);
      if (!result) {
        return res.status(404).json({ message: 'Banco no encontrado' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateBanco:', error);
      res.status(500).json({ 
        message: 'Error al actualizar el banco', 
        error: error.message 
      });
    }
  },

  /**
   * Elimina un banco por su ID_BANCO.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteBanco: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del banco es requerido' });
      }

      const deleted = await BancoTipoCuenta.deleteBanco(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Banco no encontrado' });
      }
      res.status(200).json({ message: 'Banco eliminado con éxito' });
    } catch (error) {
      console.error('Error en deleteBanco:', error);
      res.status(500).json({ 
        message: 'Error al eliminar el banco', 
        error: error.message 
      });
    }
  },

  // Operaciones CRUD para TIPO_CUENTA

  /**
   * Crea un nuevo tipo de cuenta.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createTipoCuenta: async (req, res) => {
    try {
      const { descripcion_tipo_cuenta } = req.body;

      if (!descripcion_tipo_cuenta) {
        return res.status(400).json({ 
          message: 'El campo descripcion_tipo_cuenta es requerido' 
        });
      }

      const newTipoCuenta = { descripcion_tipo_cuenta };
      const result = await BancoTipoCuenta.createTipoCuenta(newTipoCuenta);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createTipoCuenta:', error);
      res.status(500).json({ 
        message: 'Error al crear el tipo de cuenta', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene un tipo de cuenta por su ID_TIPO_CUENTA.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getTipoCuentaById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del tipo de cuenta es requerido' });
      }

      const tipoCuenta = await BancoTipoCuenta.findTipoCuentaById(id);
      if (!tipoCuenta) {
        return res.status(404).json({ message: 'Tipo de cuenta no encontrado' });
      }
      res.status(200).json(tipoCuenta);
    } catch (error) {
      console.error('Error en getTipoCuentaById:', error);
      res.status(500).json({ 
        message: 'Error al obtener el tipo de cuenta', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todos los tipos de cuenta.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllTiposCuenta: async (req, res) => {
    try {
      const tiposCuenta = await BancoTipoCuenta.getAllTiposCuenta();
      if (tiposCuenta.length === 0) {
        return res.status(404).json({ message: 'No se encontraron tipos de cuenta' });
      }
      res.status(200).json(tiposCuenta);
    } catch (error) {
      console.error('Error en getAllTiposCuenta:', error);
      res.status(500).json({ 
        message: 'Error al obtener los tipos de cuenta', 
        error: error.message 
      });
    }
  },

  /**
   * Actualiza un tipo de cuenta por su ID_TIPO_CUENTA.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateTipoCuenta: async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion_tipo_cuenta } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID del tipo de cuenta es requerido' });
      }
      if (!descripcion_tipo_cuenta) {
        return res.status(400).json({ 
          message: 'El campo descripcion_tipo_cuenta es requerido' 
        });
      }

      const updatedTipoCuenta = { descripcion_tipo_cuenta };
      const result = await BancoTipoCuenta.updateTipoCuenta(id, updatedTipoCuenta);
      if (!result) {
        return res.status(404).json({ message: 'Tipo de cuenta no encontrado' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateTipoCuenta:', error);
      res.status(500).json({ 
        message: 'Error al actualizar el tipo de cuenta', 
        error: error.message 
      });
    }
  },

  /**
   * Elimina un tipo de cuenta por su ID_TIPO_CUENTA.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteTipoCuenta: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID del tipo de cuenta es requerido' });
      }

      const deleted = await BancoTipoCuenta.deleteTipoCuenta(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Tipo de cuenta no encontrado' });
      }
      res.status(200).json({ message: 'Tipo de cuenta eliminado con éxito' });
    } catch (error) {
      console.error('Error en deleteTipoCuenta:', error);
      res.status(500).json({ 
        message: 'Error al eliminar el tipo de cuenta', 
        error: error.message 
      });
    }
  }
};

module.exports = bancoTipoCuentaController;