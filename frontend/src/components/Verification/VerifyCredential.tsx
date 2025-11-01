'use client';

import { useState } from 'react';
import { verificationService } from '@/services/verificationService';
import { VerifiableCredential } from '@/types/credential';

export default function VerifyCredential() {
  const [credentialJson, setCredentialJson] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    try {
      setVerifying(true);
      setResult(null);

      const credential: VerifiableCredential = JSON.parse(credentialJson);
      const verification = await verificationService.verifyCredential(credential);
      
      setResult(verification);
    } catch (error: any) {
      setResult({
        verified: false,
        details: error.message || 'Invalid credential format'
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCredentialJson(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Verify Credential
      </h2>

      <p className="text-gray-600 mb-6">
        Paste a credential JSON or upload a credential file to verify its authenticity.
      </p>

      <div className="space-y-4">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Credential File
          </label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        {/* JSON Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or Paste Credential JSON
          </label>
          <textarea
            value={credentialJson}
            onChange={(e) => setCredentialJson(e.target.value)}
            placeholder='{"@context": [...], "id": "...", ...}'
            rows={10}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={!credentialJson || verifying}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold transition-colors
            ${!credentialJson || verifying
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
        >
          {verifying ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          ) : (
            'Verify Credential'
          )}
        </button>

        {/* Result */}
        {result && (
          <div className={`
            rounded-lg p-4 border-2
            ${result.verified 
              ? 'bg-green-50 border-green-500' 
              : 'bg-red-50 border-red-500'
            }
          `}>
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">
                {result.verified ? '✅' : '❌'}
              </span>
              <div>
                <h3 className={`font-bold text-lg ${
                  result.verified ? 'text-green-900' : 'text-red-900'
                }`}>
                  {result.verified ? 'Credential Verified' : 'Verification Failed'}
                </h3>
                <p className={`text-sm ${
                  result.verified ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.verified 
                    ? 'This credential is authentic and has not been tampered with.'
                    : 'This credential could not be verified or is invalid.'
                  }
                </p>
              </div>
            </div>

            {result.details && (
              <div className="bg-white rounded p-3 mt-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">Details:</p>
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
              Verified at: {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
