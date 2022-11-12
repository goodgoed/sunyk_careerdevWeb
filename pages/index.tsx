import { collection, getDocs } from 'firebase/firestore';
import type { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import Button from '../components/button';
import Card from '../components/card';
import DropdownComponent from '../components/dropDown';
import HeaderDown from '../components/headerDown';
import { contentType } from '../globals/types';
import { db } from '../lib/firebase/initFirebase';
import { dateStripped } from '../lib/helper';

const Home: NextPage = ({ data }: any) => {
  const [option, setOption] = React.useState({
    type: 'All',
  });
  const [contents, setContents] = React.useState([]);

  function handleType(type: string) {
    setOption({
      type,
    });
  }

  React.useEffect(() => {
    setContents(
      Object.values(data).filter((content: contentType) => {
        if (option.type.toLowerCase() === 'all') return true;

        return option.type.toLowerCase() === content.type.toLowerCase();
      })
    );
  }, [option.type]);

  return (
    <>
      <div className="headerUp">
        <HeaderDown />
      </div>
      <main className="py-10 flex justify-center">
        <div className="w-2/4">
          <div className="flex py-4 pb-14 align-middle">
            <div className="mr-auto invisible">Hidden</div>
            <DropdownComponent
              color="white"
              setType={handleType}
              type={option.type}
            />
            <Button type="add">
              <Link href="/add" passHref>
                <a>Add</a>
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="w-1/2 flex flex-wrap justify-center align-middle gap-12">
              {contents[0] &&
                contents.map((content: contentType) => {
                  return (
                    <Card
                      key={content.id}
                      id={content.id}
                      type={content.type}
                      title={content.title}
                      deadline={content.deadline}
                      date={content.date}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </main>
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
