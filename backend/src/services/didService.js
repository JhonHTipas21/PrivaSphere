import { ethers } from 'ethers';
import { getCeramicInstance } from '../config/ceramic.js';

export const createDID = async (address, publicKey) => {
  try {
    // Crear DID usando método pkh (public key hash)
    const did = `did:pkh:eip155:80001:${address}`;
    
    const didDocument = {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/secp256k1-2019/v1'
      ],
      id: did,
      verificationMethod: [{
        id: `${did}#controller`,
        type: 'EcdsaSecp256k1RecoveryMethod2020',
        controller: did,
        blockchainAccountId: `eip155:80001:${address}`
      }],
      authentication: [`${did}#controller`],
      assertionMethod: [`${did}#controller`],
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };

    return {
      id: did,
      document: didDocument,
      address
    };
  } catch (error) {
    console.error('Error creating DID:', error);
    throw new Error('Failed to create DID');
  }
};

export const resolveDID = async (did) => {
  try {
    // En producción, esto consultaría a un resolver DID real
    // Por ahora retornamos un documento mock
    
    if (!did.startsWith('did:')) {
      throw new Error('Invalid DID format');
    }

    const address = did.split(':').pop();
    
    return {
      '@context': 'https://www.w3.org/ns/did/v1',
      id: did,
      verificationMethod: [{
        id: `${did}#controller`,
        type: 'EcdsaSecp256k1RecoveryMethod2020',
        controller: did,
        blockchainAccountId: `eip155:80001:${address}`
      }],
      authentication: [`${did}#controller`],
      assertionMethod: [`${did}#controller`]
    };
  } catch (error) {
    console.error('Error resolving DID:', error);
    throw new Error('Failed to resolve DID');
  }
};

export const updateDIDDocument = async (did, updates) => {
  try {
    const currentDoc = await resolveDID(did);
    
    const updatedDoc = {
      ...currentDoc,
      ...updates,
      updated: new Date().toISOString()
    };

    return updatedDoc;
  } catch (error) {
    console.error('Error updating DID:', error);
    throw new Error('Failed to update DID document');
  }
};
