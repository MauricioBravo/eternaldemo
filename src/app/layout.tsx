import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EternalWrite - Inmortalizando Mensajes en Blockchain',
  description: 'Almacena tus mensajes para siempre en la blockchain de Astar Network con cifrado de extremo a extremo',
  keywords: ['blockchain', 'web3', 'astar', 'mensajes', 'eterno', 'crypto'],
  authors: [{ name: 'EternalWrite Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#f8f9fa',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
  openGraph: {
    title: 'EternalWrite - Inmortalizando Mensajes',
    description: 'Almacena tus mensajes para siempre en blockchain',
    url: 'https://eternalwrite.io',
    siteName: 'EternalWrite',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EternalWrite - Mensajes en Blockchain',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EternalWrite - Inmortalizando Mensajes',
    description: 'Almacena tus mensajes para siempre en blockchain',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}