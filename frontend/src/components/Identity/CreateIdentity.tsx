'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { identityService } from '@/services/identityService';
import { useIdentityStore } from '@/stores/identityStore';

export default function CreateIdentity() {
  const { address, isConnected } = useAccount();
  const { setIdentity, setLoading, setError } = useIdentityStore();
  const [creating, setCreating] = useState(false);

  const handleCreateIdentity = async () => {
    if (!address || !isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setCreating(true);
      setLoading(true);
      setError(null);

      // En producción, obtener publicKey de la wallet
      const publicKey = `0x${address.slice(2)}`;
      
      const identity = await identityService.createIdentity(address, publicKey);
      setIdentity(identity);
      
      alert('✅ Identity created successfully!');
    } catch (error: any) {
      setError(error.message || 'Failed to create identity');
      alert('❌ Error creating identity');
    } finally {
      setCreating(false);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Create Your Decentralized Identity
      </h2>
      
      <p className="text-gray-600 mb-6">
        Generate your unique DID (Decentralized Identifier) on the blockchain.
        This will be your sovereign identity that you fully control.
      </p>

      {!isConnected ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
          <p className="text-yellow-800">
            ⚠️ Please connect your wallet to create an identity
          </p>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">Connected Address:</p>
          <p className="font-mono text-sm text-blue-900 break-all">{address}</p>
        </div>
      )}

      <button
        onClick={handleCreateIdentity}
        disabled={!isConnected || creating}
        className={`
          w-full py-3 px-6 rounded-lg font-semibold transition-colors
          ${!isConnected || creating
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
          }
        `}
      >
        {creating ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Identity...
          </span>
        ) : (
          'Create DID'
        )}
      </button>

      <div className="mt-6 text-sm text-gray-500">
        <p className="font-semibold mb-2">What happens when you create a DID?</p>
        <ul className="list-disc list-inside space-y-1">
          <li>A unique identifier is generated for you</li>
          <li>Your public key is registered on-chain</li>
          <li>You maintain full control of your identity</li>
          <li>No personal data is stored publicly</li>
        </ul>
      </div>
    </div>
  );
}
