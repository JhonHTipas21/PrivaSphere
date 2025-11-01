'use client';

import { useState } from 'react';
import { VerifiableCredential } from '@/types/credential';
import { credentialService } from '@/services/credentialService';
import { verificationService } from '@/services/verificationService';

interface Props {
  credential: VerifiableCredential;
}

export default function CredentialCard({ credential }: Props) {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      const result = await verificationService.verifyCredential(credential);
      setVerified(result.verified);
    } catch (error) {
      console.error('Error verifying:', error);
      setVerified(false);
    } finally {
      setVerifying(false);
    }
  };

  const handleDownload = () => {
    credentialService.downloadCredential(credential);
  };

  const getCredentialIcon = (type: string) => {
    if (type.includes('University')) return '🎓';
    if (type.includes('KYC')) return '✅';
    if (type.includes('Employment')) return '💼';
    if (type.includes('Certification')) return '📜';
    return '📄';
  };

  const getCredentialColor = (type: string) => {
    if (type.includes('University')) return 'from-purple-500 to-pink-500';
    if (type.includes('KYC')) return 'from-green-500 to-teal-500';
    if (type.includes('Employment')) return 'from-blue-500 to-cyan-500';
    if (type.includes('Certification')) return 'from-orange-500 to-red-500';
    return 'from-gray-500 to-gray-700';
  };

  const credentialType = credential.type.find(t => t !== 'VerifiableCredential') || 'Credential';
  const color = getCredentialColor(credentialType);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Header con degradado */}
      <div className={`bg-gradient-to-r ${color} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getCredentialIcon(credentialType)}</span>
            <div>
              <h3 className="font-bold text-lg">{credentialType}</h3>
              <p className="text-sm opacity-90">
                Issued: {new Date(credential.issuanceDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          {verified !== null && (
            <span className={`text-2xl ${verified ? '✅' : '❌'}`}>
              {verified ? '✅' : '❌'}
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Issuer:</span>
            <span className="font-mono text-xs text-gray-800 truncate max-w-[200px]">
              {credential.issuer}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">ID:</span>
            <span className="font-mono text-xs text-gray-800 truncate max-w-[200px]">
              {credential.id.split(':').pop()}
            </span>
          </div>
        </div>

        {/* Claims */}
        {showDetails && (
          <div className="bg-gray-50 rounded p-3 mb-4">
            <p className="text-xs font-semibold text-gray-600 mb-2">Claims:</p>
            <div className="space-y-1">
              {Object.entries(credential.credentialSubject)
                .filter(([key]) => key !== 'id')
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{key}:</span>
                    <span className="font-medium text-gray-800">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button
            onClick={handleVerify}
            disabled={verifying}
            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition disabled:bg-gray-300"
          >
            {verifying ? 'Verifying...' : 'Verify'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition"
            title="Download Credential"
          >
            ⬇️
          </button>
        </div>
      </div>
    </div>
  );
}
