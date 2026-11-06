const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'properties.json');

function readProperties() {
  try {
    const raw = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading properties data:', err);
    return [];
  }
}

function writeProperties(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing properties data:', err);
    return false;
  }
}

// Canonical sort: Rentas (menor a mayor precio) primero, luego Ventas (menor a mayor precio)
function sortPropertiesCanonical(list) {
  const opOrder = (op) => {
    const l = (op || '').toLowerCase().trim();
    if (l === 'renta') return 1;
    if (l === 'venta') return 2;
    return 3;
  };

  return [...list].sort((a, b) => {
    const rankA = opOrder(a.operation);
    const rankB = opOrder(b.operation);
    if (rankA !== rankB) return rankA - rankB;
    if (a.price !== b.price) return a.price - b.price;
    return (a.title || '').localeCompare(b.title || '');
  });
}

// GET all properties with optional query filtering
router.get('/', (req, res) => {
  const properties = readProperties();
  const { operation, type, city, minPrice, maxPrice, status, search } = req.query;

  let filtered = [...properties];

  if (operation && operation !== 'Todos') {
    filtered = filtered.filter(p => p.operation.toLowerCase() === operation.toLowerCase());
  }

  if (type && type !== 'Todos') {
    filtered = filtered.filter(p => p.propertyType.toLowerCase() === type.toLowerCase());
  }

  if (city) {
    filtered = filtered.filter(p => p.location.city.toLowerCase().includes(city.toLowerCase()));
  }

  if (status) {
    filtered = filtered.filter(p => p.status.toLowerCase() === status.toLowerCase());
  }

  if (minPrice) {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) filtered = filtered.filter(p => p.price >= min);
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) filtered = filtered.filter(p => p.price <= max);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.location.address.toLowerCase().includes(q) ||
      p.location.zone.toLowerCase().includes(q) ||
      p.highlight.toLowerCase().includes(q)
    );
  }

  const sorted = sortPropertiesCanonical(filtered);

  res.json({
    success: true,
    count: sorted.length,
    data: sorted
  });
});

// GET single property by ID
router.get('/:id', (req, res) => {
  const properties = readProperties();
  const property = properties.find(p => p.id === req.params.id);

  if (!property) {
    return res.status(404).json({ success: false, message: 'Propiedad no encontrada' });
  }

  res.json({ success: true, data: property });
});

// POST new property (Permite actualización semanal rápida)
router.post('/', (req, res) => {
  const properties = readProperties();
  const newProp = req.body;

  if (!newProp.title || !newProp.price || !newProp.operation) {
    return res.status(400).json({ success: false, message: 'Título, precio y tipo de operación son requeridos' });
  }

  const generatedId = newProp.id || ('prop-' + Date.now().toString(36));
  const createdProperty = {
    ...newProp,
    id: generatedId,
    status: newProp.status || 'Disponible',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: newProp.images || ['/assets/Logo.png'],
    mainImage: newProp.mainImage || (newProp.images && newProp.images[0]) || '/assets/Logo.png'
  };

  const updatedList = sortPropertiesCanonical([createdProperty, ...properties]);
  if (writeProperties(updatedList)) {
    res.status(201).json({ success: true, message: 'Propiedad registrada exitosamente', data: createdProperty });
  } else {
    res.status(500).json({ success: false, message: 'No se pudo guardar la propiedad' });
  }
});

// PUT update property
router.put('/:id', (req, res) => {
  const properties = readProperties();
  const index = properties.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Propiedad no encontrada' });
  }

  const updatedProperty = {
    ...properties[index],
    ...req.body,
    id: properties[index].id,
    updatedAt: new Date().toISOString()
  };

  properties[index] = updatedProperty;
  const sortedProperties = sortPropertiesCanonical(properties);

  if (writeProperties(sortedProperties)) {
    res.json({ success: true, message: 'Propiedad actualizada correctamente', data: updatedProperty });
  } else {
    res.status(500).json({ success: false, message: 'No se pudo actualizar la propiedad' });
  }
});

// DELETE property
router.delete('/:id', (req, res) => {
  const properties = readProperties();
  const filtered = properties.filter(p => p.id !== req.params.id);

  if (filtered.length === properties.length) {
    return res.status(404).json({ success: false, message: 'Propiedad no encontrada' });
  }

  if (writeProperties(filtered)) {
    res.json({ success: true, message: 'Propiedad eliminada correctamente' });
  } else {
    res.status(500).json({ success: false, message: 'No se pudo eliminar la propiedad' });
  }
});

module.exports = router;
