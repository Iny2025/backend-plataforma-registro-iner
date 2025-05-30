const express = require('express');
const fetch = require('node-fetch'); // Si usas node 18+ puedes usar global fetch
const router = express.Router();

/**
 * GET /api/geocode?direccion=...
 * Devuelve las coordenadas de una dirección usando OpenStreetMap Nominatim
 */
router.get('/geocode', async (req, res) => {
  const direccion = req.query.direccion;
  if (!direccion) {
    return res.status(400).json({ error: 'Falta el parámetro direccion' });
  }

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'TuApp/1.0 (contacto@tucorreo.com)' } // Importante para OSM
    });
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Nominatim request failed' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('[GEOCODING ERROR]', error);
    res.status(500).json({ error: 'Error consultando Nominatim' });
  }
});

module.exports = router;
