// Importar el pool de conexiones
const pool = require('../config/bd.confing'); 
// Modelo de Ubicación
const Ubicacion = {
  /**
   * Obtiene todos los países registrados.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todos los países.
   */
  getAllPaises: async () => {
    try {
      const query = `
        SELECT * FROM PAIS
        ORDER BY ID_PAIS;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todos los países:', error);
      throw error;
    }
  },

  /**
   * Obtiene todas las regiones de un país por su descripción.
   * @param {string} descripcionPais - Descripción del país.
   * @returns {Promise<Array<Object>>} - Retorna una lista de regiones del país.
   */
  getRegionesByPaisDescripcion: async (descripcionPais) => {
    try {
      const query = `
        SELECT r.*
        FROM REGION r
        JOIN PAIS p ON r.ID_PAIS = p.ID_PAIS
        WHERE p.DESCRIPCION_PAIS = $1
        ORDER BY r.ID_REGION;
      `;
      const values = [descripcionPais];
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener regiones por descripción de país:', error);
      throw error;
    }
  },

  /**
   * Obtiene todas las comunas de una región por su descripción.
   * @param {string} descripcionRegion - Descripción de la región.
   * @returns {Promise<Array<Object>>} - Retorna una lista de comunas de la región.
   */
  getComunasByRegionDescripcion: async (descripcionRegion) => {
    try {
      const query = `
        SELECT c.*
        FROM COMUNA c
        JOIN REGION r ON c.ID_REGION = r.ID_REGION
        WHERE r.DESCRIPCION_REGION = $1
        ORDER BY c.ID_COMUNA;
      `;
      const values = [descripcionRegion];
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener comunas por descripción de región:', error);
      throw error;
    }
  },

    /**
   * Obtiene un país por su ID.
   * @param {number} idPais - ID del país.
   * @returns {Promise<Object|null>} - Retorna el país o null si no existe.
   */
    getPaisById: async (idPais) => {
      try {
        const query = `
          SELECT * FROM PAIS WHERE ID_PAIS = $1;
        `;
        const values = [idPais];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
      } catch (error) {
        console.error('Error al obtener país por ID:', error);
        throw error;
      }
    },
  
    /**
     * Obtiene una región por su ID.
     * @param {number} idRegion - ID de la región.
     * @returns {Promise<Object|null>} - Retorna la región o null si no existe.
     */
    getRegionById: async (idRegion) => {
      try {
        const query = `
          SELECT * FROM REGION WHERE ID_REGION = $1;
        `;
        const values = [idRegion];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
      } catch (error) {
        console.error('Error al obtener región por ID:', error);
        throw error;
      }
    },
  
    /**
     * Obtiene una comuna por su ID.
     * @param {number} idComuna - ID de la comuna.
     * @returns {Promise<Object|null>} - Retorna la comuna o null si no existe.
     */
    getComunaById: async (idComuna) => {
      try {
        const query = `
          SELECT * FROM COMUNA WHERE ID_COMUNA = $1;
        `;
        const values = [idComuna];
        const result = await pool.query(query, values);
        return result.rows[0] || null;
      } catch (error) {
        console.error('Error al obtener comuna por ID:', error);
        throw error;
      }
    },



};

module.exports = Ubicacion;