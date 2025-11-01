import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import identityRoutes from './src/routes/identityRoutes.js';
import credentialRoutes from './src/routes/credentialRoutes.js';
import verificationRoutes from './src/routes/verificationRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Rutas
app.use('/api/identity', identityRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/verify', verificationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'PrivaSphere API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    name: 'PrivaSphere API',
    version: '1.0.0',
    description: 'Decentralized Identity System API',
    endpoints: {
      health: '/health',
      identity: '/api/identity',
      credentials: '/api/credentials',
      verify: '/api/verify'
    }
  });
});

// Middleware de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 PrivaSphere Backend running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
