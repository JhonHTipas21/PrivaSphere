'use client';

import { useIdentityStore } from '@/stores/identityStore';
import QRCode from 'react-qr-code';

export default function IdentityCard() {
  const { identity } = useIdentityStore();

  if (!identity) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-500">No identity created yet</p>
      </div>
    );
  }

  const copyDID = () => {
    navigator.clipboard.writeText(identity.did);
    alert('✅ DID copied to clipboard!');
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-xl p-6 text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold opacity-80 mb-1">
            DECENTRALIZED IDENTITY
          </h3>
          <p className="text-2xl font-bold">VeritasID</p>
        </div>
        <div className="bg-white p-2 rounded">
          <QRCode value={identity.did} size={80} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm opacity-80 mb-1">Wallet Address</p>
          <p className="font-mono text-sm break-all bg-white/10 rounded px-3 py-2">
            {identity.address}
          </p>
        </div>

        <div>
          <p className="text-sm opacity-80 mb-1">Decentralized Identifier (DID)</p>
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm break-all bg-white/10 rounded px-3 py-2 flex-1">
              {identity.did}
            </p>
            <button
              onClick={copyDID}
              className="bg-white/20 hover:bg-white/30 rounded px-3 py-2 transition"
              title="Copy DID"
            >
              📋
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm opacity-80 mb-1">Created</p>
          <p className="text-sm">
            {new Date(identity.created).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-xs opacity-60">
          🔒 Your identity is secured by blockchain technology and controlled only by you
        </p>
      </div>
    </div>
  );
}
