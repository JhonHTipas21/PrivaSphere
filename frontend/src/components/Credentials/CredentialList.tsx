'use client';

import { useEffect } from 'react';
import { useIdentityStore } from '@/stores/identityStore';
import { credentialService } from '@/services/credentialService';
import CredentialCard from './CredentialCard';

export default function CredentialList() {
  const { identity, credentials, setCredentials, setLoading } = useIdentityStore();

  useEffect(() => {
    if (identity) {
      loadCredentials();
    }
  }, [identity]);

  const loadCredentials = async () => {
    if (!identity) return;

    try {
      setLoading(true);
      const creds = await credentialService.getCredentials(identity.did);
      setCredentials(creds);
    } catch (error) {
      console.error('Error loading credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!identity) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-500">Create an identity first to view credentials</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Credentials
        </h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {credentials.length} {credentials.length === 1 ? 'Credential' : 'Credentials'}
        </span>
      </div>

      {credentials.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">📜</div>
          <p className="text-gray-600 mb-2">No credentials yet</p>
          <p className="text-sm text-gray-500">
            Issue your first credential to get started
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {credentials.map((credential) => (
            <CredentialCard key={credential.id} credential={credential} />
          ))}
        </div>
      )}
    </div>
  );
}
