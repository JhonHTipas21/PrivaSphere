import { verifyCredential, verifyPresentation } from '../services/zkProofService.js';

export const verifyUserCredential = async (req, res, next) => {
  try {
    const { credential, proof } = req.body;

    if (!credential) {
      return res.status(400).json({ 
        error: 'Credential is required' 
      });
    }

    const verification = await verifyCredential(credential, proof);

    res.json({
      success: true,
      verified: verification.verified,
      details: verification.details,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUserPresentation = async (req, res, next) => {
  try {
    const { presentation, challenge } = req.body;

    if (!presentation || !challenge) {
      return res.status(400).json({ 
        error: 'Presentation and challenge are required' 
      });
    }

    const verification = await verifyPresentation(presentation, challenge);

    res.json({
      success: true,
      verified: verification.verified,
      claims: verification.claims,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

export const createVerificationChallenge = async (req, res, next) => {
  try {
    const { verifierDID } = req.body;

    const challenge = {
      challenge: crypto.randomBytes(32).toString('hex'),
      verifier: verifierDID,
      timestamp: Date.now(),
      expiresAt: Date.now() + (5 * 60 * 1000) // 5 minutos
    };

    res.json({
      success: true,
      challenge
    });
  } catch (error) {
    next(error);
  }
};
