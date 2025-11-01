import express from 'express';
import { 
  createIdentity, 
  getIdentity, 
  updateIdentity 
} from '../controllers/identityController.js';

const router = express.Router();

// POST /api/identity - Crear nueva identidad
router.post('/', createIdentity);

// GET /api/identity/:did - Obtener identidad por DID
router.get('/:did', getIdentity);

// PUT /api/identity/:did - Actualizar identidad
router.put('/:did', updateIdentity);

export default router;
