'use client'; // This must be a client component to handle React context providers

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mysten/dapp-kit/dist/index.css'; // Required CSS for the Sui wallet modal

import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// We must declare metadata in a separate file if using 'use client' in layout, 
// or simply handle SEO in your page.tsx. For now, we will set the title directly 
// in the HTML head below.

// Setup the Sui Network connections
const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize the query client inside the component to avoid state sharing
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <title>Numb Polys</title>
        <meta name="description" content="A premium 1,111-piece 3D generative syndicate." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
            <WalletProvider autoConnect>
              {children}
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}