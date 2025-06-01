import { TalismanStatus } from '@/components/TalismanStatus';
import { MessageForm } from '@/components/MessageForm';
//import { MessageExplorer } from '@/components/MessageExplorer';



export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            ⚡ EternalWrite
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Immortalize Your Messages on Blockchain
          </p>
          <p className="text-sm text-gray-400">
            Powered by Astar Network • Messages stored forever on Shibuya Testnet
          </p>
        </div>

        {/* Wallet Connection Status */}
        <TalismanStatus />

        {/* Message Writing Interface */}
        <div className="mt-8">
          <MessageForm />
        </div>

        {/* Features Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">🔗 Blockchain Storage</h3>
            <p className="text-gray-300 text-sm">
              Your messages are permanently stored on Astar Network blockchain, making them truly eternal and uncensorable.
            </p>
          </div>
          
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">🔒 Privacy Options</h3>
            <p className="text-gray-300 text-sm">
              Choose between public messages visible to all, or private encrypted messages for selected recipients.
            </p>
          </div>
          
          
        </div>



        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>EternalWrite - Powered by Polkadotk</p>
          <p className="mt-1">Wallet support: Talisman, MetaMask, & more</p>
        </div>
      </div>
    </main>
  );
}