# Arquitectura y Guía Técnica: D&H Real Estate Cancún

## 1. Visión Técnica
La solución está estructurada como un monorepo desacoplado que soporta dos modos operativos:
1. **Modo Híbrido Fullstack (Recomendado para Render Web Service):**
   - El backend en Node/Express (`server/index.js`) gestiona las peticiones de la API REST bajo `/api/properties`, `/api/contact` y sirve los archivos compilados del frontend (`client/dist`).
   - Permite que las altas y cambios de estatus de propiedades (e.g. marcar como "Apartada" o "Rentada") persistan directamente en `server/data/properties.json`.
2. **Modo Estático Independiente (JAMstack):**
   - El frontend cuenta con un fallback local precargado (`client/src/data/properties.json`). Si el backend no está disponible o el sitio se despliega en Render Static Site o GitHub Pages, la aplicación funciona de forma 100% autónoma y funcional para los clientes.

## 2. API Endpoints
- `GET /api/properties`: Retorna lista filtrada de propiedades. Admite queries: `operation`, `type`, `city`, `minPrice`, `maxPrice`, `status`, `search`.
- `GET /api/properties/:id`: Retorna la ficha técnica de una propiedad específica.
- `POST /api/properties`: Registra una nueva propiedad en el catálogo.
- `PUT /api/properties/:id`: Modifica estatus (Disponible, Apartada, Rentada, Vendida) o atributos de una propiedad.
- `DELETE /api/properties/:id`: Elimina o retira una propiedad del inventario.
- `POST /api/contact`: Recibe solicitudes de prospectos y las vincula con WhatsApp.
- `GET /api/health`: Healthcheck para monitorización de Render.

## 3. Flujo de Actualización Semanal
Para que Alejandro y Reyna o el equipo de soporte actualicen el catálogo semanalmente:
- **Opción A (Desde el Sitio Web):** Hacer clic en el botón superior *"Gestión Semanal"* en la barra de navegación, cambiar el estatus en el selector de la propiedad o presionar *"Publicar Nueva Propiedad"*.
- **Opción B (Directo en Archivo de Datos):** Editar `server/data/properties.json` o `client/src/data/properties.json` y hacer `git commit` y `git push`. Render detectará el push y reconstruirá automáticamente el sitio en menos de 2 minutos.
