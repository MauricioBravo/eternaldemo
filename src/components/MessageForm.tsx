'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

// ABI del smart contract EternalWrite
const ETERNAL_WRITE_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      }
    ],
    "name": "storeMessage",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "encryptedContent",
        "type": "bytes"
      },
      {
        "internalType": "address[]",
        "name": "authorizedUsers",
        "type": "address[]"
      }
    ],
    "name": "storeEncryptedMessage",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "messageId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "author",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "isPrivate",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "MessageStored",
    "type": "event"
  }
] as const;

// TODO: Reemplazar con la dirección real del contrato deployado
const CONTRACT_ADDRESS = "0x468167ac3B0b9619C6DCdF74ee576cde3DDAdC69";

export function MessageForm() {
  const [message, setMessage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

const { isConnected } = useAccount();
const { writeContract, data: hash, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const calculateCost = (messageLength: number, isPrivateMsg: boolean) => {
    if (isPrivateMsg) return 0.10;
    if (messageLength <= 100) return 0.02;
    if (messageLength <= 500) return 0.03;
    return 0.05;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !message.trim()) return;
    
    // Verificar que el contrato esté deployado
    if (CONTRACT_ADDRESS === "0x468167ac3B0b9619C6DCdF74ee576cde3DDAdC69") {
      alert("⚠️ Contract not deployed yet! Please deploy the smart contract first.");
      return;
    }

    setIsSubmitting(true);

    try {
      const cost = calculateCost(message.length, isPrivate);
      const value = parseEther(cost.toString());

      if (isPrivate) {
        // Para mensajes privados - necesitaríamos implementar cifrado
        alert("🔒 Private messages coming soon! Using public message for now.");
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: ETERNAL_WRITE_ABI,
          functionName: 'storeMessage',
          args: [message],
          value,
        });
      } else {
        // Mensaje público
        writeContract({
          address: CONTRACT_ADDRESS,
          abi: ETERNAL_WRITE_ABI,
          functionName: 'storeMessage',
          args: [message],
          value,
        });
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cost = calculateCost(message.length, isPrivate);
  const progress = message.length / 1000; // Max 1000 characters

  if (!isConnected) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">✍️ Write Eternal Message</h3>
        <div className="p-4 bg-yellow-900/30 border border-yellow-600/30 rounded-lg">
          <p className="text-yellow-300">
            🔗 Please connect your wallet to write messages on the blockchain
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        ✍️ Write Eternal Message
      </h3>

      {/* Contract Status Warning */}
      {CONTRACT_ADDRESS === "0x468167ac3B0b9619C6DCdF74ee576cde3DDAdC69" && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-600/30 rounded-lg">
          <p className="text-red-300 text-sm">
            ⚠️ <strong>Smart Contract Not Deployed</strong><br/>
            Please deploy the EternalWrite contract first and update CONTRACT_ADDRESS
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Message Type Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">
            Message Type:
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="messageType"
                checked={!isPrivate}
                onChange={() => setIsPrivate(false)}
                className="mr-2"
              />
              <span className="text-gray-300">🌍 Public</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="messageType"
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}
                className="mr-2"
              />
              <span className="text-gray-300">🔒 Private (Coming Soon)</span>
            </label>
          </div>
        </div>

        {/* Message Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Your eternal message (max 1000 characters):
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message that will live forever on blockchain..."
            maxLength={1000}
            rows={4}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isSubmitting || isConfirming}
          />
          
          {/* Character Counter */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progress * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-gray-400">
                {message.length}/1000
              </span>
            </div>
            {message.length > 800 && (
              <span className="text-yellow-400">⚠️ Near limit</span>
            )}
          </div>
        </div>

        {/* Cost Estimation */}
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Estimated Cost:</span>
            <span className="text-green-400 font-semibold">
              ${cost.toFixed(2)} USD + gas fees
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Network: Shibuya Testnet (Free SBY tokens)
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            !message.trim() || 
            isSubmitting || 
            isConfirming ||
            CONTRACT_ADDRESS === "0x468167ac3B0b9619C6DCdF74ee576cde3DDAdC69"
          }
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
        >
          {isSubmitting || isConfirming ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isConfirming ? 'Confirming Transaction...' : 'Submitting...'}
            </span>
          ) : (
            '⚡ Immortalize Message'
          )}
        </button>

        {/* Transaction Status */}
        {hash && (
          <div className="p-4 bg-blue-900/30 border border-blue-600/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              📝 <strong>Transaction Submitted</strong><br/>
              Hash: <span className="font-mono text-xs">{hash.slice(0, 10)}...{hash.slice(-8)}</span>
            </p>
          </div>
        )}

        {isConfirmed && (
          <div className="p-4 bg-green-900/30 border border-green-600/30 rounded-lg">
            <p className="text-green-300 text-sm">
              ✅ <strong>Message Immortalized Successfully!</strong><br/>
              Your message is now permanently stored on the blockchain.
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-900/30 border border-red-600/30 rounded-lg">
            <p className="text-red-300 text-sm">
              ❌ <strong>Transaction Failed</strong><br/>
              {error.message}
            </p>
          </div>
        )}
      </form>

      {/* Message History Placeholder */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Recent Messages:</h4>
        <div className="text-xs text-gray-500">
          📜 Message history will appear here once the contract is deployed
        </div>
      </div>
    </div>
  );
}