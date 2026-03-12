import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PWARegister } from '@/components/pwa-register';

export const metadata: Metadata = {
  title: 'Avalanches Genre Picker',
  description: 'Pick a random music genre and open it in Spotify.',
  manifest: './manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Genre Picker',
  },
  icons: {
    apple: './icons/icon-192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
