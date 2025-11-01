import express from 'express';
import { 
  verifyUserCredential, 
  verifyUserPresentation, 
  createVerificationChallenge 
} from '../controllers/verificationController.js';

const router = express.Router();

// POST /api/verify/credential - Verificar credencial
router.post('/credential', verifyUserCredential);

// POST /api/verify/presentation - Verificar presentación
router.post('/presentation', verifyUserPresentation);

// POST /api/verify/challenge - Crear desafío de verificación
router.post('/challenge', createVerificationChallenge);

export default router;
