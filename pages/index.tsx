import { collection, getDocs } from 'firebase/firestore';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import HeaderDown from '../components/headerDown';
import Headers from '../components/headers';
// import Main from './main';
import Main from '../components/main';
import { db } from '../lib/firebase/initFirebase';
import { dateStripped } from '../lib/helper';
import LogInButton, { checkLogIn } from './logInPage';

const Home: NextPage = ({ data }: any) => {
  if (checkLogIn()) {
    return (
      <>
        <Headers />
        <div className="headerUp">
          <HeaderDown />
          <div className="flex justify-center">
            <LogInButton />
          </div>
        </div>
        <Main {...data} />
      </>
    );
  }

  return (
    <>
      <div className="headerUp">
        <HeaderDown />
        <div className="flex justify-center">
          <LogInButton />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const querySnapshot = await getDocs(collection(db, 'contents'));
  const data = {
    ...querySnapshot.docs.map((doc) => {
      return dateStripped({
        ...doc.data(),
        id: doc.id,
        deadline: new Date(doc.data().deadline.seconds * 1000),
        date: new Date(doc.data().date.seconds * 1000),
      });
    }),
  };

  return { props: { data } };
}

export default Home;
