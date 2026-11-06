const express = require('express');
const cors = require('cors');
const path = require('path');
const propertiesRouter = require('./routes/properties');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static assets from public
const publicAssetsPath = path.join(__dirname, '..', 'public');
app.use('/assets', express.static(path.join(publicAssetsPath, 'assets')));
app.use('/properties', express.static(path.join(publicAssetsPath, 'properties')));

// API Routes
app.use('/api/properties', propertiesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'D&H Real Estate Cancún API',
    timestamp: new Date().toISOString()
  });
});

// Contact endpoint
app.post('/api/contact', (req, res) => {
  const { name, phone, email, message, propertyTitle } = req.body;
  console.log(`[Contacto Recibido] De: ${name} (${phone}, ${email}) - Propiedad: ${propertyTitle || 'General'}`);
  
  res.json({
    success: true,
    message: 'Mensaje recibido exitosamente por el equipo legal y comercial de D&H Real Estate Cancún.'
  });
});

// Serve frontend build if dist folder exists (Single-Service Render Deployment)
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/assets') || req.path.startsWith('/properties')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, err => {
    if (err) {
      res.status(200).send(`
        <h1>D&H Real Estate Cancún API Service</h1>
        <p>API operativa en el puerto ${PORT}. Visita <code>/api/properties</code> para consultar el inventario.</p>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`D&H Real Estate Server running on port ${PORT}`);
  console.log(`Static assets served from: ${publicAssetsPath}`);
});
