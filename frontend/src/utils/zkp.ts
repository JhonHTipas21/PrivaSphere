export const zkpUtils = {
    // Generar prueba de conocimiento cero simulada
    generateZKProof(credential: any, disclosedFields: string[]): any {
      return {
        type: 'ZKProof',
        protocol: 'groth16',
        disclosedFields,
        proof: {
          pi_a: generateRandomHex(64),
          pi_b: [generateRandomHex(64), generateRandomHex(64)],
          pi_c: generateRandomHex(64)
        },
        publicSignals: disclosedFields.map(field => 
          hashField(credential.credentialSubject[field])
        )
      };
    },
  
    // Verificar que solo se revelan campos específicos
    validateDisclosure(credential: any, proof: any): boolean {
      const disclosedFields = proof.disclosedFields || [];
      const allFields = Object.keys(credential.credentialSubject);
      
      // Verificar que no se revelan campos adicionales
      return disclosedFields.every((field: string) => allFields.includes(field));
    },
  
    // Crear presentación selectiva
    createSelectiveDisclosure(
      credential: any,
      fieldsToDisclose: string[]
    ): any {
      const disclosed: any = {
        id: credential.credentialSubject.id
      };
  
      fieldsToDisclose.forEach(field => {
        if (credential.credentialSubject[field] !== undefined) {
          disclosed[field] = credential.credentialSubject[field];
        }
      });
  
      return {
        ...credential,
        credentialSubject: disclosed,
        selectiveDisclosure: true,
        disclosedFields: fieldsToDisclose
      };
    }
  };
  
  function generateRandomHex(length: number): string {
    const bytes = new Uint8Array(length / 2);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  function hashField(value: any): string {
    // Simulación simple de hash
    return generateRandomHex(64);
  }
  