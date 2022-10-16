import type { NextPage } from 'next';
import Main from './main';
import Head from 'next/head';
import Image from 'next/image';
import Headers from '../components/headers';
import React from 'react';

const Home: NextPage = () => {
  return (
    <>
      <Headers />
      <div className="headerUp"></div>
      <Main />
    </>
  );
};

export default Home;
