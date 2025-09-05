import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowYourRightsAI - Your Pocket Legal Guide',
  description: 'Instant, clear guidance on legal rights during encounters with law enforcement, with location-specific information and real-time assistance.',
  keywords: 'legal rights, police interactions, civil rights, legal guidance, know your rights',
  authors: [{ name: 'KnowYourRightsAI Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
