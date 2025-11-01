'use client';

import { useState } from 'react';
import { useIdentityStore } from '@/stores/identityStore';
import { credentialService } from '@/services/credentialService';
import { CredentialType } from '@/types/credential';

export default function IssueCredential() {
  const { identity, addCredential } = useIdentityStore();
  const [issuing, setIssuing] = useState(false);
  const [credentialType, setCredentialType] = useState<CredentialType>('UniversityDegree');
  const [claims, setClaims] = useState({
    degree: '',
    university: '',
    graduationYear: new Date().getFullYear()
  });

  const handleIssue = async () => {
    if (!identity) {
      alert('Please create an identity first');
      return;
    }

    try {
      setIssuing(true);

      const credential = await credentialService.issueCredential(
        identity.did,
        identity.did, // Auto-issued for demo
        credentialType,
        claims
      );

      addCredential(credential);
      alert('✅ Credential issued successfully!');
      
      // Reset form
      setClaims({
        degree: '',
        university: '',
        graduationYear: new Date().getFullYear()
      });
    } catch (error) {
      console.error('Error issuing credential:', error);
      alert('❌ Failed to issue credential');
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Issue New Credential
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Credential Type
          </label>
          <select
            value={credentialType}
            onChange={(e) => setCredentialType(e.target.value as CredentialType)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="UniversityDegree">University Degree</option>
            <option value="KYCCredential">KYC Credential</option>
            <option value="EmploymentCredential">Employment Certificate</option>
            <option value="CertificationCredential">Professional Certification</option>
          </select>
        </div>

        {credentialType === 'UniversityDegree' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree Name
              </label>
              <input
                type="text"
                value={claims.degree}
                onChange={(e) => setClaims({ ...claims, degree: e.target.value })}
                placeholder="e.g., Bachelor of Computer Science"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University
              </label>
              <input
                type="text"
                value={claims.university}
                onChange={(e) => setClaims({ ...claims, university: e.target.value })}
                placeholder="e.g., MIT"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Year
              </label>
              <input
                type="number"
                value={claims.graduationYear}
                onChange={(e) => setClaims({ ...claims, graduationYear: parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        <button
          onClick={handleIssue}
          disabled={issuing || !identity}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold transition-colors
            ${issuing || !identity
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
            }
          `}
        >
          {issuing ? 'Issuing...' : 'Issue Credential'}
        </button>
      </div>
    </div>
  );
}
