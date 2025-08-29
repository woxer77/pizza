import { Nunito } from 'next/font/google';
import '@/app/globals.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  );
}
