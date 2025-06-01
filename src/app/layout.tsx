import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EternalWrite - Immortalize Your Messages on Blockchain',
  description: 'Store your messages forever on Astar Network blockchain with end-to-end encryption',
  keywords: ['blockchain', 'web3', 'astar', 'messages', 'eternal', 'crypto'],
  authors: [{ name: 'EternalWrite Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'EternalWrite - Immortalize Your Messages',
    description: 'Store your messages forever on blockchain',
    url: 'https://eternalwrite.io',
    siteName: 'EternalWrite',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EternalWrite - Blockchain Messages',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EternalWrite - Immortalize Your Messages',
    description: 'Store your messages forever on blockchain',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}