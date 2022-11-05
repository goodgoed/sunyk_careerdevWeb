import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import React from 'react';

import Header from '../components/headers';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps, session }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default MyApp;
