import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import HeaderDown from '../components/headerDown';
import Headers from '../components/headers';
import Main from './main';

const Home: NextPage = () => {
  return (
    <>
      <Headers />
      <div className="headerUp">
        <HeaderDown />
      </div>
      <Main />
    </>
  );
};

export default Home;
