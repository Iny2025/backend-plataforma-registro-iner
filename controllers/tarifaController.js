// Importar el modelo Tarifa
const Tarifa = require('../models/tarifaModel'); // Ajusta la ruta según tu estructura de proyecto

const tarifaController = {
  /**
   * Crea una nueva tarifa.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  createTarifa: async (req, res) => {
    try {
      const { unidad_tarifa, precio_unidad_tarifa, id_iner } = req.body;

      // Validar campos requeridos
      if (!unidad_tarifa || !precio_unidad_tarifa || !id_iner) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: unidad_tarifa, precio_unidad_tarifa o id_iner' 
        });
      }

      const newTarifa = {
        unidad_tarifa,
        precio_unidad_tarifa,
        id_iner
      };

      const result = await Tarifa.createTarifa(newTarifa);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error en createTarifa:', error);
      res.status(500).json({ 
        message: 'Error al crear la tarifa', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene una tarifa por su ID_TARIFA.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getTarifaById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID de la tarifa es requerido' });
      }

      const tarifa = await Tarifa.findTarifaById(id);
      if (!tarifa) {
        return res.status(404).json({ message: 'Tarifa no encontrada' });
      }
      res.status(200).json(tarifa);
    } catch (error) {
      console.error('Error en getTarifaById:', error);
      res.status(500).json({ 
        message: 'Error al obtener la tarifa', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todas las tarifas.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllTarifas: async (req, res) => {
    try {
      const tarifas = await Tarifa.getAllTarifas();
      if (tarifas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron tarifas' });
      }
      res.status(200).json(tarifas);
    } catch (error) {
      console.error('Error en getAllTarifas:', error);
      res.status(500).json({ 
        message: 'Error al obtener todas las tarifas', 
        error: error.message 
      });
    }
  },

  /**
   * Actualiza una tarifa por su ID_TARIFA.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  updateTarifa: async (req, res) => {
    try {
      const { id } = req.params;
      const { unidad_tarifa, precio_unidad_tarifa, id_iner } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'El ID de la tarifa es requerido' });
      }
      if (!unidad_tarifa || !precio_unidad_tarifa || !id_iner) {
        return res.status(400).json({ 
          message: 'Faltan campos requeridos: unidad_tarifa, precio_unidad_tarifa o id_iner' 
        });
      }

      const updatedTarifa = {
        unidad_tarifa,
        precio_unidad_tarifa,
        id_iner
      };

      const result = await Tarifa.updateTarifa(id, updatedTarifa);
      if (!result) {
        return res.status(404).json({ message: 'Tarifa no encontrada' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error('Error en updateTarifa:', error);
      res.status(500).json({ 
        message: 'Error al actualizar la tarifa', 
        error: error.message 
      });
    }
  },

  /**
   * Elimina una tarifa por su ID_TARIFA.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  deleteTarifa: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: 'El ID de la tarifa es requerido' });
      }

      const deleted = await Tarifa.deleteTarifa(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Tarifa no encontrada' });
      }
      res.status(200).json({ message: 'Tarifa eliminada con éxito' });
    } catch (error) {
      console.error('Error en deleteTarifa:', error);
      res.status(500).json({ 
        message: 'Error al eliminar la tarifa', 
        error: error.message 
      });
    }
  },

  /**
   * Obtiene todas las tarifas de un INER por su ID_INER.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getTarifasByInerId: async (req, res) => {
    try {
      const { idIner } = req.params;

      if (!idIner) {
        return res.status(400).json({ message: 'El ID del INER es requerido' });
      }

      const tarifas = await Tarifa.getTarifasByInerId(idIner);
      if (tarifas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron tarifas para este INER' });
      }
      res.status(200).json(tarifas);
    } catch (error) {
      console.error('Error en getTarifasByInerId:', error);
      res.status(500).json({ 
        message: 'Error al obtener las tarifas del INER', 
        error: error.message 
      });
    }
  }
};

module.exports = tarifaController;