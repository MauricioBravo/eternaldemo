'use client';

import { useEffect, useState } from 'react';
import { useAccount, useChainId, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function TalismanStatus() {
  const [mounted, setMounted] = useState(false);

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Wallet Status</h3>
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  const getChainName = (id: number) => {
    switch (id) {
      case 592: return 'Astar Mainnet';
      case 81: return 'Shibuya Testnet';
      default: return `Chain ${id}`;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        🔗 Wallet Connection
      </h3>
      
      {/* Connection Status - Only show if connected */}
      {isConnected && (
        <div className="mb-6 p-4 bg-green-900/30 border border-green-600/30 rounded-lg">
          <h4 className="font-semibold text-white mb-3 flex items-center">
            <span className="w-3 h-3 rounded-full mr-2 bg-green-500"></span>
            ✅ Wallet Connected Successfully
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Address:</span>
              <span className="text-green-400 font-mono text-xs">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Network:</span>
              <span className="text-blue-400">{getChainName(chainId)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Connect/Disconnect Actions */}
      <div className="flex flex-col space-y-3">
        <ConnectButton />
        
        {isConnected && (
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Disconnect Wallet
          </button>
        )}
      </div>

      {/* Debug Info */}
      <details className="mt-4">
        <summary className="text-gray-400 text-sm cursor-pointer hover:text-white">
          🔧 Debug Info
        </summary>
        <pre className="mt-2 p-2 bg-black/30 rounded text-xs text-gray-300 overflow-auto">
          {JSON.stringify({
            isConnected,
            address,
            chainId,
            chainName: getChainName(chainId),
          }, null, 2)}
        </pre>
      </details>
    </div>
  );
}