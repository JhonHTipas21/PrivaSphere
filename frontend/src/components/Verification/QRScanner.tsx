'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

interface Props {
  data: string;
  title?: string;
}

export default function QRScanner({ data, title = 'Scan QR Code' }: Props) {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      
      <button
        onClick={() => setShowQR(!showQR)}
        className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors mb-4"
      >
        {showQR ? 'Hide QR Code' : 'Show QR Code'}
      </button>

      {showQR && (
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <QRCode value={data} size={256} />
          </div>
          <p className="text-xs text-gray-600 mt-4 text-center max-w-md break-all">
            {data}
          </p>
        </div>
      )}
    </div>
  );
}
