import type { Metadata } from 'next';

import Header from '@/elements/header';

export const metadata: Metadata = {
  title: {
    template: '%s - Next Pizza',
    default: 'Next Pizza'
  },
  description: 'Pizza store created with NextJS'
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      {modal}
      <Header />
      {children}
    </>
  );
}
