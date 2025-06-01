import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  talismanWallet,
  braveWallet,
} from '@rainbow-me/rainbowkit/wallets';

// Astar Network Mainnet
export const astar = defineChain({
  id: 592,
  name: 'Astar',
  nativeCurrency: {
    decimals: 18,
    name: 'ASTR',
    symbol: 'ASTR',
  },
  rpcUrls: {
    default: {
      http: ['https://evm.astar.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Astar Subscan',
      url: 'https://astar.subscan.io',
    },
  },
});

// Shibuya Testnet
export const shibuya = defineChain({
  id: 81,
  name: 'Shibuya',
  nativeCurrency: {
    decimals: 18,
    name: 'SBY',
    symbol: 'SBY',
  },
  rpcUrls: {
    default: {
      http: ['https://evm.shibuya.astar.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Shibuya Subscan',
      url: 'https://shibuya.subscan.io',
    },
  },
  testnet: true,
});

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo_project_id';

export const config = getDefaultConfig({
  appName: 'EternalWrite',
  projectId,
  chains: [astar, shibuya],
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        talismanWallet,
        metaMaskWallet,
        rainbowWallet,
      ],
    },
    {
      groupName: 'Other',
      wallets: [
        walletConnectWallet,
        braveWallet,
      ],
    },
  ],
  ssr: true,
});