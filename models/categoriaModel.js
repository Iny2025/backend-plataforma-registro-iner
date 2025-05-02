// Importar el pool de conexiones
const pool = require('../config/bd.confing'); // Ajusta la ruta según la ubicación de tu config.js

// Modelo de Categoria
const Categoria = {

  /**
   * Obtiene todas las categorías registradas.
   * @returns {Promise<Array<Object>>} - Retorna una lista de todas las categorías.
   */
  getAllCategorias: async () => {
    try {
      const query = `
        SELECT * FROM CATEGORIA
        ORDER BY ID_CATEGORIA;
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error al obtener todas las categorías:', error);
      throw error;
    }
  },

  /**
   * Inserta una nueva categoría en la tabla.
   * @param {string} descripcionCategoria - Descripción de la categoría.
   * @returns {Promise<Object>} - Retorna la categoría insertada.
   */
  createCategoria: async (descripcionCategoria) => {
    try {
      const query = `
        INSERT INTO CATEGORIA (DESCRIPCION_CATEGORIA)
        VALUES ($1)
        RETURNING *;
      `;
      const values = [descripcionCategoria];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al insertar nueva categoría:', error);
      throw error;
    }
  },

  /**
   * Obtiene una categoría por su ID.
   * @param {number} idCategoria - ID de la categoría.
   * @returns {Promise<Object>} - Retorna la categoría encontrada.
   */
  getCategoriaById: async (idCategoria) => {
    try {
      const query = `
        SELECT * FROM CATEGORIA
        WHERE ID_CATEGORIA = $1;
      `;
      const values = [idCategoria];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error al obtener categoría por ID:', error);
      throw error;
    }
  },
};

module.exports = Categoria;