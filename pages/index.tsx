import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import Headers from '../components/headers';
import Main from './main';

const Home: NextPage = () => {
  return (
    <>
      <Headers />
      <div className="headerUp" />
      <Main />
    </>
  );
};

export default Home;
