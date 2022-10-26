import { collection, getDocs } from 'firebase/firestore';
import type { NextPage } from 'next';
import React from 'react';

import HeaderDown from '../components/headerDown';
import Main from '../components/main';
import { db } from '../lib/firebase/initFirebase';
import { dateStripped } from '../lib/helper';

const Home: NextPage = ({ data }: any) => {
  return (
    <>
      <div className="headerUp">
        <HeaderDown />
      </div>
      <Main {...data} />
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
