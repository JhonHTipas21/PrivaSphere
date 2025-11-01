'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'identity' | 'credentials' | 'verify'>('identity');
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    // Simular conexión de wallet
    await new Promise(resolve => setTimeout(resolve, 1000));
    setConnected(true);
    setAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-animated">
      {/* Particles Background Effect */}
      <div className="particles-bg">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 animate-slide-in-left sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-scale-in">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg hover-lift animate-glow">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PrivaSphere
                </h1>
                <p className="text-sm text-gray-600 font-medium">Decentralized Identity System</p>
              </div>
            </div>
            
            {!connected ? (
              <button
                onClick={handleConnect}
                disabled={loading}
                className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover-lift shadow-lg hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="spinner border-2 w-5 h-5"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🔗</span>
                      Connect Wallet
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
            ) : (
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-3 rounded-xl shadow-lg animate-scale-in hover-lift">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-slow"></div>
                  <div>
                    <p className="text-xs text-white/90 font-medium">Connected</p>
                    <p className="text-sm font-mono font-bold text-white">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 animate-slide-in-right">
        <div className="glass rounded-2xl shadow-2xl p-2 flex space-x-2">
          {[
            { id: 'identity', icon: '🆔', label: 'Identity' },
            { id: 'credentials', icon: '📜', label: 'Credentials' },
            { id: 'verify', icon: '✅', label: 'Verify' }
          ].map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 stagger-item
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-white/50'
                }
              `}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <span className="text-2xl mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'identity' && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Create Identity Card */}
            <div className="glass rounded-2xl shadow-2xl p-8 hover-lift animate-slide-in-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-bounce-slow">
                  <span className="text-3xl">🎭</span>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Create Your DID
                </h2>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                Generate your unique <span className="font-bold text-blue-600">Decentralized Identifier</span> on the blockchain.
                This will be your sovereign identity that you fully control.
              </p>

              {!connected ? (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 border border-yellow-300 rounded-xl p-5 mb-6 animate-pulse-slow shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl animate-bounce-slow">⚠️</span>
                    <p className="text-white font-bold">
                      Please connect your wallet to create an identity
                    </p>
                  </div>
                </div>
              ) : (
                <div className="glass rounded-xl p-5 mb-6 border border-blue-200 animate-fade-in">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Connected Address:</p>
                  <p className="font-mono text-sm text-blue-900 break-all bg-white/50 p-3 rounded-lg">
                    {address}
                  </p>
                </div>
              )}

              <button
                disabled={!connected}
                className={`
                  w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg
                  ${!connected
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover-lift hover-glow'
                  }
                `}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-2xl">✨</span>
                  Create DID
                </span>
              </button>

              <div className="mt-8 glass rounded-xl p-5">
                <p className="font-bold mb-3 text-gray-800 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  What happens when you create a DID?
                </p>
                <ul className="space-y-2">
                  {[
                    'A unique identifier is generated for you',
                    'Your public key is registered on-chain',
                    'You maintain full control of your identity',
                    'No personal data is stored publicly'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 stagger-item" style={{animationDelay: `${i * 0.1}s`}}>
                      <span className="text-green-500 font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Identity Card Preview */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-slide-in-right hover-lift card-3d">
              <div className="absolute inset-0 bg-gradient-animated"></div>
              <div className="relative p-8 text-white">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-sm font-bold opacity-90 mb-2 tracking-widest">
                      DECENTRALIZED IDENTITY
                    </h3>
                    <p className="text-4xl font-bold neon-text">PrivaSphere</p>
                  </div>
                  <div className="glass p-3 rounded-xl animate-float">
                    <div className="w-24 h-24 bg-white/20 flex items-center justify-center text-5xl rounded-lg">
                      🔐
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="glass rounded-xl p-4 animate-fade-in">
                    <p className="text-sm opacity-90 mb-2 font-semibold">Wallet Address</p>
                    <p className="font-mono text-sm break-all">
                      {connected ? address : 'Not connected'}
                    </p>
                  </div>

                  <div className="glass rounded-xl p-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
                    <p className="text-sm opacity-90 mb-2 font-semibold">Decentralized Identifier (DID)</p>
                    <p className="font-mono text-sm break-all">
                      {connected ? `did:pkh:eip155:80001:${address}` : 'Connect wallet first'}
                    </p>
                  </div>

                  <div className="glass rounded-xl p-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <p className="text-sm opacity-90 mb-2 font-semibold">Created</p>
                    <p className="text-sm font-bold">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-xs opacity-80 flex items-center gap-2">
                    <span className="text-xl animate-pulse-slow">🔒</span>
                    Your identity is secured by blockchain technology and controlled only by you
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'credentials' && (
          <div className="glass rounded-2xl shadow-2xl p-12 text-center animate-scale-in hover-lift">
            <div className="text-8xl mb-6 animate-bounce-slow">📜</div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Credentials
            </h2>
            <p className="text-gray-700 text-lg">
              Issue and manage verifiable credentials
            </p>
          </div>
        )}

        {activeTab === 'verify' && (
          <div className="glass rounded-2xl shadow-2xl p-12 text-center animate-scale-in hover-lift">
            <div className="text-8xl mb-6 animate-bounce-slow">✅</div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Verify
            </h2>
            <p className="text-gray-700 text-lg">
              Verify credentials and identities
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white/80 backdrop-blur-md border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-700 font-semibold">
            PrivaSphere - Decentralized Identity System powered by Blockchain
          </p>
          <p className="text-center text-gray-600 text-sm mt-2">
            Built with 💙 Polygon, Ceramic Network & IPFS
          </p>
        </div>
      </footer>
    </div>
  );
}
