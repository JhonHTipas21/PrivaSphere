# 🔐 PrivaSphere - Decentralized Identity System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue)](https://soliditylang.org/)
[![Polygon](https://img.shields.io/badge/Polygon-Mumbai-purple)](https://polygon.technology/)

> **Sistema completo de identidad digital descentralizada con credenciales verificables, Zero-Knowledge Proofs y estándares W3C DID.**

![PrivaSphere Banner](./docs/screenshots/homepage.png)

---

## 🌟 Características Principales

### 🆔 Identidad Auto-Soberana
- ✅ Creación de DIDs (Decentralized Identifiers) compatibles con estándares W3C
- ✅ Control total del usuario sobre sus datos personales
- ✅ Interoperabilidad entre plataformas Web3
- ✅ Registro inmutable en blockchain Polygon

### 📜 Credenciales Verificables
- ✅ Emisión de credenciales por organizaciones verificadas
- ✅ Diplomas universitarios, certificaciones profesionales, KYC
- ✅ Almacenamiento descentralizado en IPFS/Ceramic Network
- ✅ Revocación on-chain con trazabilidad completa

### 🔐 Zero-Knowledge Proofs
- ✅ Verificación sin revelar información sensible
- ✅ Divulgación selectiva de atributos
- ✅ Pruebas criptográficas verificables
- ✅ Privacidad total garantizada

### 🌐 Integración Web3
- ✅ Autenticación con wallets (MetaMask, WalletConnect)
- ✅ Smart Contracts auditables en Solidity
- ✅ Interfaz moderna con Next.js 14 y TypeScript
- ✅ Soporte multi-chain (Polygon, Ethereum)

---

## 🎨 Preview de la Aplicación

### Interfaz Principal
![Homepage](./docs/screenshots/homepage.png)

### Identidad Conectada
![Identity Connected](./docs/screenshots/identity-connected.png)

---

## 🏗️ Arquitectura del Sistema

┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (Next.js 14 + TypeScript) │
│ React · Tailwind CSS · RainbowKit · Wagmi · Zustand │
└────────────────────────┬────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ BACKEND API (Node.js + Express) │
│ REST API · DID Services · Ceramic Client · IPFS │
└────────────────────────┬────────────────────────────────────┘
│
┌────────────────┴────────────────┐
▼ ▼
┌──────────────────┐ ┌──────────────────────┐
│ Polygon Mumbai │ │ Ceramic Network │
│ Smart Contracts │ │ Decentralized Data │
│ - Identity │ │ - DID Documents │
│ - Credentials │ │ - Verifiable Data │
└──────────────────┘ └──────────────────────┘

text

---

## 🚀 Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 14.0.4 | Framework React con SSR |
| **TypeScript** | 5.3.3 | Tipado estático |
| **Tailwind CSS** | 3.4.1 | Estilos y diseño responsivo |
| **RainbowKit** | 2.0.0 | Conexión de wallets |
| **Wagmi** | 2.2.0 | Hooks de Ethereum |
| **Zustand** | 4.4.7 | Estado global |

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | 18+ | Entorno de ejecución |
| **Express** | 4.18.2 | Framework web |
| **Ethers.js** | 6.9.0 | Interacción blockchain |
| **Axios** | 1.6.2 | Cliente HTTP |

### Smart Contracts
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Solidity** | 0.8.20 | Lenguaje de contratos |
| **Hardhat** | Latest | Framework de desarrollo |
| **OpenZeppelin** | Latest | Contratos seguros |

---

## 📦 Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Wallet con fondos en Polygon Mumbai (testnet)
- Git

### 1️⃣ Clonar el Repositorio

git clone https://github.com/JhonHTipas21/PrivaSphere.git
cd PrivaSphere

text

### 2️⃣ Instalar Dependencias

Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

Smart Contracts (Opcional)
cd ../contracts
npm install

text

### 3️⃣ Configurar Variables de Entorno

**Backend (.env):**
PORT=5000
CERAMIC_API_URL=https://ceramic-clay.3boxlabs.com
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
ALLOWED_ORIGINS=http://localhost:3000

text

**Frontend (.env.local):**
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_CHAIN_ID=80001
NEXT_PUBLIC_CHAIN_NAME=Polygon Mumbai

text

### 4️⃣ Ejecutar la Aplicación

**Terminal 1 - Backend:**
cd backend
npm run dev

🚀 Backend corriendo en http://localhost:5000
text

**Terminal 2 - Frontend:**
cd frontend
npm run dev

▲ Frontend corriendo en http://localhost:3000
text

---

## 📁 Estructura del Proyecto

PrivaSphere/
├── backend/ # API Node.js + Express
│ ├── src/
│ │ ├── config/ # Configuración Ceramic, Polygon
│ │ ├── controllers/ # Lógica de negocio
│ │ ├── routes/ # Endpoints API REST
│ │ ├── services/ # Servicios DID, Credentials, ZKP
│ │ ├── middleware/ # Error handlers
│ │ └── utils/ # Utilidades
│ ├── .env
│ ├── server.js
│ └── package.json
│
├── frontend/ # App Next.js + TypeScript
│ ├── app/
│ │ ├── page.tsx # Página principal
│ │ ├── layout.tsx # Layout global
│ │ └── globals.css # Estilos globales + animaciones
│ ├── src/
│ │ ├── components/ # Componentes React
│ │ │ ├── Identity/ # Componentes de identidad
│ │ │ ├── Credentials/ # Gestión de credenciales
│ │ │ └── Verification/ # Verificación
│ │ ├── lib/ # Configuración Wagmi, Ceramic
│ │ ├── services/ # Clientes API
│ │ ├── stores/ # Estado global Zustand
│ │ ├── types/ # Definiciones TypeScript
│ │ └── utils/ # Funciones auxiliares
│ ├── .env.local
│ └── package.json
│
├── contracts/ # Smart Contracts Solidity
│ ├── contracts/
│ │ ├── identity/ # IdentityRegistry.sol
│ │ └── credentials/ # CredentialRegistry.sol
│ ├── scripts/ # Scripts de deployment
│ ├── test/ # Tests unitarios
│ └── hardhat.config.js
│
├── docs/
│ ├── screenshots/ # Capturas de pantalla
│ ├── ARCHITECTURE.md # Documentación técnica
│ └── API.md # Documentación API
│
├── .gitignore
├── README.md # Este archivo
└── LICENSE

text

---

## 🔌 Endpoints de la API

### Identity Management
POST /api/identity # Crear DID
GET /api/identity/:did # Obtener DID
PUT /api/identity/:did # Actualizar DID

text

### Credentials Management
POST /api/credentials # Emitir credencial
GET /api/credentials/:did # Obtener credenciales de un DID
DELETE /api/credentials/:id # Revocar credencial

text

### Verification
POST /api/verify/credential # Verificar credencial
POST /api/verify/presentation # Verificar presentación
POST /api/verify/challenge # Crear desafío de verificación

text

---

## 🎯 Casos de Uso

### 🎓 Educación
Verificación instantánea de diplomas universitarios sin contactar instituciones.

### 💼 Empresas
Onboarding de empleados con credenciales verificables y portables.

### 💰 Finanzas DeFi
KYC portable entre diferentes plataformas sin repetir procesos.

### 🏥 Salud
Registros médicos controlados completamente por el paciente.

### 🏛️ Gobierno
Identificación digital ciudadana descentralizada y segura.

---

## 🔐 Seguridad

✅ **Smart Contracts Auditables** - Código público en blockchain  
✅ **Zero-Knowledge Proofs** - Verificación sin exponer datos  
✅ **Variables de Entorno Protegidas** - Nunca en repositorio  
✅ **CORS Configurado** - Solo orígenes permitidos  
✅ **Validación de Entrada** - Prevención de inyecciones  
✅ **Rate Limiting** - Protección contra ataques DDoS  

---

## 🧪 Testing

Smart Contracts
cd contracts
npx hardhat test
npx hardhat coverage

Backend (opcional)
cd backend
npm test

Frontend (opcional)
cd frontend
npm test

text

---

## 🚢 Deployment

### Testnet (Polygon Mumbai)
cd contracts
npx hardhat run scripts/deploy.js --network polygonMumbai

text

### Frontend (Vercel)
cd frontend
vercel

text

### Backend (Railway/Render)
cd backend

Seguir instrucciones de la plataforma
text

---

## 🛣️ Roadmap

- [x] Identidad descentralizada (DIDs)
- [x] Credenciales verificables
- [x] Verificación on-chain
- [x] Interfaz web moderna y responsiva
- [ ] Zero-Knowledge Proofs avanzados (Circom)
- [ ] Autenticación passwordless completa
- [ ] Integración multi-chain (Ethereum, BSC)
- [ ] Mobile app (React Native)
- [ ] Dashboard de analíticas
- [ ] API pública para integraciones externas

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

---

## 👨‍💻 Autor

**Jhon H. Tipas**

- GitHub: [@JhonHTipas21](https://github.com/JhonHTipas21)
- LinkedIn: [Tu Perfil LinkedIn](https://www.linkedin.com/in/jhon-harvey-tipas-solis-b45135259/)
- Email: devjhonharvey@gmail.com
- Portfolio: [Tu Portfolio](https://dev-jhon-portafolio.vercel.app/)
