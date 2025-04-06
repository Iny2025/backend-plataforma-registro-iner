// Cargar dotenv para acceder a las variables de entorno
require('dotenv').config();

// Importar el módulo pg
const { Pool } = require('pg');

// Configuración del pool de conexiones
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' // Convierte el valor de string a booleano
});

// Verificar la conexión al iniciar
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        process.exit(1); // Termina el proceso si falla la conexión
    } else {
        console.log('Conectado a la base de datos con éxito');
        release(); // Liberar el cliente
    }
});

// Exportar el pool
module.exports = pool;