import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Versión simplificada sin IPFS
// En producción, aquí se conectaría a IPFS/Ceramic real

export const issueCredential = async ({ 
  subjectDID, 
  credentialType, 
  claims, 
  issuerDID 
}) => {
  try {
    const credential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/security/suites/ed25519-2020/v1'
      ],
      id: `urn:uuid:${crypto.randomUUID()}`,
      type: ['VerifiableCredential', credentialType],
      issuer: issuerDID,
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: subjectDID,
        ...claims
      },
      proof: {
        type: 'EcdsaSecp256k1Signature2019',
        created: new Date().toISOString(),
        proofPurpose: 'assertionMethod',
        verificationMethod: `${issuerDID}#controller`,
        jws: generateMockJWS()
      }
    };

    // Simular hash IPFS
    credential.ipfsHash = `Qm${crypto.randomBytes(23).toString('hex')}`;

    console.log('✅ Credential issued:', credential.id);
    return credential;
  } catch (error) {
    console.error('Error issuing credential:', error);
    throw new Error('Failed to issue credential');
  }
};

export const getCredentialsByDID = async (did) => {
  try {
    // Retornar credenciales mock para demo
    return [
      {
        id: 'urn:uuid:' + crypto.randomUUID(),
        type: ['VerifiableCredential', 'UniversityDegree'],
        issuer: 'did:pkh:eip155:80001:0xUniversity123',
        issuanceDate: new Date(Date.now() - 86400000).toISOString(),
        credentialSubject: {
          id: did,
          degree: 'Bachelor of Computer Science',
          university: 'Tech University',
          graduationYear: 2023
        },
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(),
          proofPurpose: 'assertionMethod',
          verificationMethod: `did:pkh:eip155:80001:0xUniversity123#controller`,
          jws: generateMockJWS()
        },
        ipfsHash: `Qm${crypto.randomBytes(23).toString('hex')}`
      },
      {
        id: 'urn:uuid:' + crypto.randomUUID(),
        type: ['VerifiableCredential', 'KYCCredential'],
        issuer: 'did:pkh:eip155:80001:0xKYCProvider456',
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: did,
          verified: true,
          country: 'USA',
          ageOver18: true
        },
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(),
          proofPurpose: 'assertionMethod',
          verificationMethod: `did:pkh:eip155:80001:0xKYCProvider456#controller`,
          jws: generateMockJWS()
        },
        ipfsHash: `Qm${crypto.randomBytes(23).toString('hex')}`
      }
    ];
  } catch (error) {
    console.error('Error getting credentials:', error);
    throw new Error('Failed to get credentials');
  }
};

export const revokeCredential = async (credentialId, reason) => {
  try {
    console.log(`Revoking credential ${credentialId}: ${reason}`);
    
    return {
      credentialId,
      revoked: true,
      revokedAt: new Date().toISOString(),
      reason
    };
  } catch (error) {
    console.error('Error revoking credential:', error);
    throw new Error('Failed to revoke credential');
  }
};

// Helper function
function generateMockJWS() {
  const header = Buffer.from(JSON.stringify({
    alg: 'ES256K',
    typ: 'JWT'
  })).toString('base64url');

  const payload = Buffer.from(JSON.stringify({
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 31536000 // 1 año
  })).toString('base64url');

  const signature = crypto.randomBytes(32).toString('base64url');

  return `${header}.${payload}.${signature}`;
}
