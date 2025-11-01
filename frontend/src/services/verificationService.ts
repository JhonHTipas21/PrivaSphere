import axios from 'axios';
import { VerifiableCredential, VerifiablePresentation } from '@/types/credential';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface VerificationResult {
  verified: boolean;
  details?: any;
  claims?: any;
  timestamp: string;
}

export const verificationService = {
  async verifyCredential(
    credential: VerifiableCredential,
    proof?: any
  ): Promise<VerificationResult> {
    try {
      const response = await axios.post(`${API_URL}/verify/credential`, {
        credential,
        proof
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying credential:', error);
      throw error;
    }
  },

  async verifyPresentation(
    presentation: VerifiablePresentation,
    challenge: any
  ): Promise<VerificationResult> {
    try {
      const response = await axios.post(`${API_URL}/verify/presentation`, {
        presentation,
        challenge
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying presentation:', error);
      throw error;
    }
  },

  async createChallenge(verifierDID: string): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/verify/challenge`, {
        verifierDID
      });
      return response.data.challenge;
    } catch (error) {
      console.error('Error creating challenge:', error);
      throw error;
    }
  }
};
