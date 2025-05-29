// Importar el modelo Ubicacion
const Ubicacion = require('../models/ubicacionModel');

// Controlador de Ubicación
const ubicacionController = {
  /**
   * Devuelve todos los países.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getAllPaises: async (req, res) => {
    try {
      const paises = await Ubicacion.getAllPaises();
      if (paises.length === 0) {
        return res.status(404).json({ message: 'No se encontraron países' });
      }
      res.status(200).json(paises);
    } catch (error) {
      console.error('Error en getAllPaises:', error);
      res.status(500).json({ message: 'Error al obtener los países' });
    }
  },

  /**
   * Devuelve todas las regiones de un país por su descripción.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getRegionesByPais: async (req, res) => {
    try {
      const { descripcionPais } = req.params; // Obtener la descripción del país desde los parámetros de la URL
      if (!descripcionPais) {
        return res.status(400).json({ message: 'La descripción del país es requerida' });
      }

      const regiones = await Ubicacion.getRegionesByPaisDescripcion(descripcionPais);
      if (regiones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron regiones para este país' });
      }
      res.status(200).json(regiones);
    } catch (error) {
      console.error('Error en getRegionesByPais:', error);
      res.status(500).json({ message: 'Error al obtener las regiones' });
    }
  },

  /**
   * Devuelve todas las comunas de una región por su descripción.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getComunasByRegion: async (req, res) => {
    try {
      const { descripcionRegion } = req.params; // Obtener la descripción de la región desde los parámetros de la URL
      if (!descripcionRegion) {
        return res.status(400).json({ message: 'La descripción de la región es requerida' });
      }

      const comunas = await Ubicacion.getComunasByRegionDescripcion(descripcionRegion);
      if (comunas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron comunas para esta región' });
      }
      res.status(200).json(comunas);
    } catch (error) {
      console.error('Error en getComunasByRegion:', error);
      res.status(500).json({ message: 'Error al obtener las comunas' });
    }
  },

  /**
   * Devuelve un país por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getPaisById: async (req, res) => {
    try {
      const { idPais } = req.params;
      if (!idPais) {
        return res.status(400).json({ message: 'El ID del país es requerido' });
      }

      const pais = await Ubicacion.getPaisById(idPais);
      if (!pais) {
        return res.status(404).json({ message: 'País no encontrado' });
      }
      res.status(200).json(pais);
    } catch (error) {
      console.error('Error en getPaisById:', error);
      res.status(500).json({ message: 'Error al obtener el país' });
    }
  },

  /**
   * Devuelve una región por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getRegionById: async (req, res) => {
    try {
      const { idRegion } = req.params;
      if (!idRegion) {
        return res.status(400).json({ message: 'El ID de la región es requerido' });
      }

      const region = await Ubicacion.getRegionById(idRegion);
      if (!region) {
        return res.status(404).json({ message: 'Región no encontrada' });
      }
      res.status(200).json(region);
    } catch (error) {
      console.error('Error en getRegionById:', error);
      res.status(500).json({ message: 'Error al obtener la región' });
    }
  },

  /**
   * Devuelve una comuna por su ID.
   * @param {Object} req - Objeto de solicitud HTTP.
   * @param {Object} res - Objeto de respuesta HTTP.
   */
  getComunaById: async (req, res) => {
    try {
      const { idComuna } = req.params;
      if (!idComuna) {
        return res.status(400).json({ message: 'El ID de la comuna es requerido' });
      }

      const comuna = await Ubicacion.getComunaById(idComuna);
      if (!comuna) {
        return res.status(404).json({ message: 'Comuna no encontrada' });
      }
      res.status(200).json(comuna);
    } catch (error) {
      console.error('Error en getComunaById:', error);
      res.status(500).json({ message: 'Error al obtener la comuna' });
    }
  },
};

module.exports = ubicacionController;