// Global type declarations for wallet providers

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isTalisman?: boolean;
      isBraveWallet?: boolean;
      isRabby?: boolean;
      request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on?: (event: string, handler: (...args: unknown[]) => void) => void;
      removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
    };
    talismanEth?: {
      version?: string;
      isConnected?: boolean;
      request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on?: (event: string, handler: (...args: unknown[]) => void) => void;
    };
    // Add other wallet providers as needed
    web3?: unknown;
    BinanceChain?: unknown;
  }
}

export {};