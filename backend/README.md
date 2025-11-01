# PrivaSphere Backend

Backend API para PrivaSphere - Sistema de Identidad Digital Descentralizada.

## 🚀 Inicio Rápido
Instalar dependencias
npm install

Configurar variables de entorno
cp .env.example .env

Ejecutar en modo desarrollo
npm run dev

Ejecutar en producción
npm start

text

## 📋 Variables de Entorno

Ver archivo `.env` para configuración completa.

## 🔌 Endpoints

### Identidad
- `POST /api/identity` - Crear DID
- `GET /api/identity/:did` - Obtener DID
- `PUT /api/identity/:did` - Actualizar DID

### Credenciales
- `POST /api/credentials` - Emitir credencial
- `GET /api/credentials/:did` - Obtener credenciales
- `DELETE /api/credentials/:id` - Revocar credencial

### Verificación
- `POST /api/verify/credential` - Verificar credencial
- `POST /api/verify/presentation` - Verificar presentación
- `POST /api/verify/challenge` - Crear desafío

## 📄 Licencia

MIT