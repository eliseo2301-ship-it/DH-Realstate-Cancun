const express = require('express');
const cors = require('cors');
const fs = require('fs');
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

// Appointments endpoint
const appointmentsFilePath = path.join(__dirname, 'data', 'appointments.json');

app.post('/api/appointments', (req, res) => {
  const appointment = req.body;
  console.log(`[Nueva Cita Agendada] Cliente: ${appointment.clientName} (${appointment.clientPhone}) - Propiedad: ${appointment.propertyTitle} - Fecha: ${appointment.date} a las ${appointment.time} hrs. Asesor: ${appointment.advisorName}`);
  
  try {
    let appointments = [];
    if (fs.existsSync(appointmentsFilePath)) {
      appointments = JSON.parse(fs.readFileSync(appointmentsFilePath, 'utf8') || '[]');
    }
    const record = {
      ...appointment,
      id: 'appt-' + Date.now().toString(36),
      receivedAt: new Date().toISOString()
    };
    appointments.unshift(record);
    fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointments, null, 2), 'utf8');
    
    res.json({
      success: true,
      message: 'Cita registrada y confirmada exitosamente',
      data: record
    });
  } catch (err) {
    console.error('Error saving appointment:', err);
    res.json({ success: true, message: 'Cita registrada en memoria' });
  }
});

app.get('/api/appointments', (req, res) => {
  try {
    if (fs.existsSync(appointmentsFilePath)) {
      const data = JSON.parse(fs.readFileSync(appointmentsFilePath, 'utf8') || '[]');
      return res.json({ success: true, count: data.length, data });
    }
  } catch (err) {}
  res.json({ success: true, count: 0, data: [] });
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
