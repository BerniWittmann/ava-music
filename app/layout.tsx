import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spotify Genre Picker',
  description: 'Pick a random music genre and open it in Spotify.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
