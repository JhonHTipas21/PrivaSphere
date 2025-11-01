export interface DIDDocument {
    '@context': string | string[];
    id: string;
    verificationMethod: VerificationMethod[];
    authentication: string[];
    assertionMethod?: string[];
    created?: string;
    updated?: string;
  }
  
  export interface VerificationMethod {
    id: string;
    type: string;
    controller: string;
    blockchainAccountId?: string;
    publicKeyHex?: string;
  }
  
  export interface DIDIdentity {
    did: string;
    document: DIDDocument;
    address: string;
    created: string;
  }
  