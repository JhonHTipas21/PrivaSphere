import express from 'express';
import { 
  issueNewCredential, 
  getUserCredentials, 
  revokeUserCredential 
} from '../controllers/credentialController.js';

const router = express.Router();

// POST /api/credentials - Emitir nueva credencial
router.post('/', issueNewCredential);

// GET /api/credentials/:did - Obtener credenciales de un usuario
router.get('/:did', getUserCredentials);

// DELETE /api/credentials/:credentialId - Revocar credencial
router.delete('/:credentialId', revokeUserCredential);

export default router;
