export interface VerifiableCredential {
    '@context': string[];
    id: string;
    type: string[];
    issuer: string;
    issuanceDate: string;
    expirationDate?: string;
    credentialSubject: CredentialSubject;
    proof: Proof;
    ipfsHash?: string;
  }
  
  export interface CredentialSubject {
    id: string;
    [key: string]: any;
  }
  
  export interface Proof {
    type: string;
    created: string;
    proofPurpose: string;
    verificationMethod: string;
    jws?: string;
    challenge?: string;
  }
  
  export interface VerifiablePresentation {
    '@context': string[];
    type: string[];
    holder: string;
    verifiableCredential: VerifiableCredential[];
    proof: Proof;
  }
  
  export type CredentialType = 
    | 'UniversityDegree'
    | 'KYCCredential'
    | 'EmploymentCredential'
    | 'CertificationCredential';
  