import axios from 'axios';
import { DIDIdentity, DIDDocument } from '@/types/did';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const identityService = {
  async createIdentity(address: string, publicKey: string): Promise<DIDIdentity> {
    try {
      const response = await axios.post(`${API_URL}/identity`, {
        address,
        publicKey
      });
      return response.data;
    } catch (error) {
      console.error('Error creating identity:', error);
      throw error;
    }
  },

  async getIdentity(did: string): Promise<DIDIdentity> {
    try {
      const response = await axios.get(`${API_URL}/identity/${did}`);
      return response.data;
    } catch (error) {
      console.error('Error getting identity:', error);
      throw error;
    }
  },

  async updateIdentity(did: string, updates: Partial<DIDDocument>): Promise<DIDIdentity> {
    try {
      const response = await axios.put(`${API_URL}/identity/${did}`, {
        updates
      });
      return response.data;
    } catch (error) {
      console.error('Error updating identity:', error);
      throw error;
    }
  },

  generateDID(address: string, chainId: number = 80001): string {
    return `did:pkh:eip155:${chainId}:${address}`;
  }
};
