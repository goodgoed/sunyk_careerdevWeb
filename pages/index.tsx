import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Headers from '../components/headers';

const Home: NextPage = () => {
  return (
    <>
      <Headers />
      <div className="headerUp"></div>
      <main></main>
    </>
  );
};

export default Home;
