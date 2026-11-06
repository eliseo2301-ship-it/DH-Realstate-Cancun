# D&H Real Estate Cancún 🌴🏡

> **Boutique Inmobiliaria & Asesoría Jurídica Especializada en Cancún y la Riviera Maya.**  
> *"La verdadera exclusividad no radica solo en la vista al mar, sino en la paz y tranquilidad de saber que tu patrimonio descansa sobre cimientos jurídicos inquebrantables."*

---

## 🌟 Resumen del Proyecto

**D&H Real Estate Cancún** (Domínguez & Herrera) es una plataforma web premium diseñada para comercializar el catálogo exclusivo de residencias y departamentos en Cancún y la Riviera Maya, fundada y dirigida por los Asesores Inmobiliarios y Jurídicos **Alejandro Herrera** y **Reyna Domínguez**.

### Fundadores y Contacto Oficial
- **Alejandro Herrera:** Asesor Inmobiliario Jurídico | 📞 `+52 998 766 7484` | ✉️ `dh.realstate.cun@gmail.com`
- **Reyna Domínguez:** Asesora Inmobiliaria & Abogada | 📞 `+52 55 2270 7664` | ✉️ `dh.realstate.cun@gmail.com`
- **Facebook Oficial:** [https://www.facebook.com/dh.realstate](https://www.facebook.com/dh.realstate)
- **Sede:** Cancún, Quintana Roo, México

---

## 🏗️ Arquitectura Modular (Clean Architecture)

```text
DH-Realstate-Cancun/
├── client/                     # Frontend (React 18 + Vite + Tailwind CSS + Lucide)
│   ├── public/                 # Assets estáticos y fotos de propiedades
│   ├── src/
│   │   ├── components/         # Navbar, Hero, PropertyCard, Modal, Filters, Admin, Footer
│   │   ├── content/            # Filosofía, Misión, Visión, Valores y Biografías
│   │   ├── data/               # Tipos TypeScript y catálogo de propiedades (JSON)
│   │   └── styles/             # Paleta extraída de tarjetas corporativas
│   ├── index.html
│   ├── tailwind.config.js      # Extensión cromática: Bronce Cobre, Turquesa Caribe, Arena Marfil
│   └── vite.config.ts
├── server/                     # Backend API (Express.js)
│   ├── data/                   # properties.json (Base de datos ligera para actualización semanal)
│   ├── routes/                 # Endpoints REST (/api/properties, /api/contact, /api/health)
│   └── index.js                # Servidor unificado para producción
├── public/                     # Assets maestros de branding y fotos procesadas
├── docs/                       # Manual de Branding y Guías de Arquitectura
├── render.yaml                 # Configuración de despliegue automatizado en Render
├── package.json
└── README.md
```

---

## 🎨 Identidad Cromática Extraída de Tarjetas Oficiales

- **Bronce / Cobre Metálico Primario:** `#C59268` (Acentos de lujo, emblemas, bordes de distinción)
- **Bronce Oscuro / Tabaco:** `#8D6346` (Tipografía editorial y contrastes)
- **Turquesa Caribe:** `#00B4D8` (Ondas del mar, tags interactivos, botones de acción)
- **Azul Océano Profundo:** `#0077B6` (Degradados marítimos)
- **Azul Marino Medianoche:** `#0A192F` (Elegancia de fondo, navbar y footer)
- **Arena Marfil:** `#FAF7F2` (Fondo cálido y acogedor tomado de la tarjeta de presentación)

---

## 🚀 Despliegue en Render

El repositorio incluye `render.yaml` preconfigurado:
1. Conecta este repositorio en tu cuenta de [Render Dashboard](https://dashboard.render.com).
2. Selecciona **"New +" -> "Blueprint"** y Render detectará automáticamente `render.yaml`.
3. El comando de build ejecuta:
   ```bash
   npm install --prefix server && npm install --prefix client && npm run build --prefix client
   ```
4. El comando de inicio levanta el servicio Express en producción:
   ```bash
   node server/index.js
   ```

### Despliegue Manual como Static Site (Opcional)
- **Build Command:** `npm install --prefix client && npm run build --prefix client`
- **Publish Directory:** `client/dist`

---

## 🛠️ Ejecución Local

1. Instalar dependencias:
   ```bash
   # En la raíz o en cada subcarpeta
   npm run install:all
   ```
2. Ejecutar backend:
   ```bash
   npm run dev:server
   ```
3. Ejecutar frontend:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.
