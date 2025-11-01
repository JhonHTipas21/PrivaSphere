import { create } from 'zustand';
import { DIDIdentity } from '@/types/did';
import { VerifiableCredential } from '@/types/credential';

interface IdentityState {
  identity: DIDIdentity | null;
  credentials: VerifiableCredential[];
  loading: boolean;
  error: string | null;
  
  setIdentity: (identity: DIDIdentity) => void;
  setCredentials: (credentials: VerifiableCredential[]) => void;
  addCredential: (credential: VerifiableCredential) => void;
  removeCredential: (credentialId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearIdentity: () => void;
}

export const useIdentityStore = create<IdentityState>((set) => ({
  identity: null,
  credentials: [],
  loading: false,
  error: null,

  setIdentity: (identity) => set({ identity }),
  
  setCredentials: (credentials) => set({ credentials }),
  
  addCredential: (credential) =>
    set((state) => ({
      credentials: [...state.credentials, credential]
    })),
  
  removeCredential: (credentialId) =>
    set((state) => ({
      credentials: state.credentials.filter((c) => c.id !== credentialId)
    })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  clearIdentity: () =>
    set({
      identity: null,
      credentials: [],
      loading: false,
      error: null
    })
}));
