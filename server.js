// Importar la aplicación configurada desde app.js
const app = require('./app');

// Definir el puerto desde las variables de entorno o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});