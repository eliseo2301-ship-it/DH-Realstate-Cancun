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

## 🚀 Despliegue en Render (Guía Rápida)

Puedes desplegar el proyecto en Render de dos formas:

### Opción 1: Web Service (Fullstack con API REST y Servidor Express) - Recomendado
1. En [Render Dashboard](https://dashboard.render.com), haz clic en **New +** ➔ **Web Service**.
2. Conecta tu repositorio: `eliseo2301-ship-it/DH-Realstate-Cancun`.
3. Configuración en la interfaz:
   - **Environment:** `Node`
   - **Region:** `Oregon` (o la de tu preferencia)
   - **Branch:** `main`
   - **Root Directory:** *(dejar vacío)*
   - **Build Command:**
     ```bash
     npm install --prefix server && npm install --include=dev --prefix client && npm run build --prefix client
     ```
   - **Start Command:**
     ```bash
     node server/index.js
     ```
   - **Environment Variables:**
     - `NODE_ENV` = `production`
     - `NPM_CONFIG_PRODUCTION` = `false`

---

### Opción 2: Static Site (Frontend React SPA Autónomo)
Si prefieres desplegar únicamente el frontend estático:
1. En [Render Dashboard](https://dashboard.render.com), haz clic en **New +** ➔ **Static Site**.
2. Conecta tu repositorio: `eliseo2301-ship-it/DH-Realstate-Cancun`.
3. Configuración en la interfaz:
   - **Root Directory:** `client`
   - **Build Command:**
     ```bash
     npm install --include=dev && npm run build
     ```
   - **Publish Directory:** `dist`

---

## 🛠️ Ejecución Local

1. Instalar dependencias:
   ```bash
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
