import axios from 'axios';
import { VerifiableCredential, CredentialType } from '@/types/credential';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const credentialService = {
  async issueCredential(
    subjectDID: string,
    issuerDID: string,
    credentialType: CredentialType,
    claims: Record<string, any>
  ): Promise<VerifiableCredential> {
    try {
      const response = await axios.post(`${API_URL}/credentials`, {
        subjectDID,
        issuerDID,
        credentialType,
        claims
      });
      return response.data.credential;
    } catch (error) {
      console.error('Error issuing credential:', error);
      throw error;
    }
  },

  async getCredentials(did: string): Promise<VerifiableCredential[]> {
    try {
      const response = await axios.get(`${API_URL}/credentials/${did}`);
      return response.data.credentials;
    } catch (error) {
      console.error('Error getting credentials:', error);
      throw error;
    }
  },

  async revokeCredential(credentialId: string, reason: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/credentials/${credentialId}`, {
        data: { reason }
      });
    } catch (error) {
      console.error('Error revoking credential:', error);
      throw error;
    }
  },

  async downloadCredential(credential: VerifiableCredential): Promise<void> {
    const dataStr = JSON.stringify(credential, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `credential-${credential.id.split(':').pop()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
};
