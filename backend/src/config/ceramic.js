import dotenv from 'dotenv';

dotenv.config();

// Versión simplificada sin dependencias de Ceramic
// En producción, aquí irían las conexiones reales

export const initCeramic = async () => {
  console.log('✅ Ceramic client initialized (mock mode)');
  return {
    connected: true,
    mode: 'mock'
  };
};

export const getCeramicInstance = () => {
  return {
    connected: true,
    mode: 'mock'
  };
};

export const authenticateCeramic = async (ceramic, provider) => {
  console.log('✅ Ceramic authenticated (mock mode)');
  return {
    id: 'did:mock:authenticated'
  };
};
