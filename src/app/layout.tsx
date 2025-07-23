import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import Header from '@/elements/header';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s - Next Pizza',
    default: 'Next Pizza'
  },
  description: 'Pizza store created with NextJS'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
