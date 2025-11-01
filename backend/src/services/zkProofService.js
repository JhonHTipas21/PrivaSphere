import { ethers } from 'ethers';

export const verifyCredential = async (credential, proof) => {
  try {
    // Verificar estructura básica
    if (!credential || !credential.proof) {
      return {
        verified: false,
        details: 'Invalid credential structure'
      };
    }

    // Verificar firma (en producción, verificar criptográficamente)
    const isValidSignature = await verifySignature(credential);
    
    // Verificar que no esté revocada
    const isNotRevoked = await checkRevocationStatus(credential.id);
    
    // Verificar fecha de emisión
    const issuanceDate = new Date(credential.issuanceDate);
    const isValidDate = issuanceDate <= new Date();

    const verified = isValidSignature && isNotRevoked && isValidDate;

    return {
      verified,
      details: {
        validSignature: isValidSignature,
        notRevoked: isNotRevoked,
        validDate: isValidDate,
        issuer: credential.issuer,
        subject: credential.credentialSubject.id
      }
    };
  } catch (error) {
    console.error('Error verifying credential:', error);
    return {
      verified: false,
      details: 'Verification failed'
    };
  }
};

export const verifyPresentation = async (presentation, challenge) => {
  try {
    // Verificar que el challenge coincida
    const challengeValid = presentation.proof?.challenge === challenge.challenge;
    
    // Verificar cada credencial en la presentación
    const credentialVerifications = await Promise.all(
      presentation.verifiableCredential.map(cred => 
        verifyCredential(cred)
      )
    );

    const allCredentialsValid = credentialVerifications.every(v => v.verified);

    return {
      verified: challengeValid && allCredentialsValid,
      claims: extractClaims(presentation),
      credentialCount: presentation.verifiableCredential.length
    };
  } catch (error) {
    console.error('Error verifying presentation:', error);
    return {
      verified: false,
      claims: {}
    };
  }
};

export const generateZKProof = async (credential, disclosedFields) => {
  try {
    // En producción, esto generaría una prueba ZK real
    // usando bibliotecas como snarkjs o circom
    
    const proof = {
      type: 'ZKProof',
      created: new Date().toISOString(),
      proofPurpose: 'authentication',
      disclosedFields,
      zkProof: {
        protocol: 'groth16',
        curve: 'bn128',
        proof: generateMockZKProof()
      }
    };

    return proof;
  } catch (error) {
    console.error('Error generating ZK proof:', error);
    throw new Error('Failed to generate ZK proof');
  }
};

// Helper functions
async function verifySignature(credential) {
  // En producción, verificar la firma JWS/JWT
  return credential.proof && credential.proof.jws;
}

async function checkRevocationStatus(credentialId) {
  // En producción, consultar registro de revocación en blockchain
  return true; // No revocada
}

function extractClaims(presentation) {
  const claims = {};
  presentation.verifiableCredential.forEach(cred => {
    Object.assign(claims, cred.credentialSubject);
  });
  return claims;
}

function generateMockZKProof() {
  return {
    pi_a: [ethers.randomBytes(32).toString('hex'), ethers.randomBytes(32).toString('hex')],
    pi_b: [[ethers.randomBytes(32).toString('hex')], [ethers.randomBytes(32).toString('hex')]],
    pi_c: [ethers.randomBytes(32).toString('hex'), ethers.randomBytes(32).toString('hex')],
    protocol: 'groth16',
    curve: 'bn128'
  };
}
