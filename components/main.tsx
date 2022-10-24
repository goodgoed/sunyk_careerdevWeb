/* eslint-disable react/destructuring-assignment */
import Link from 'next/link';
import React from 'react';

import { contentType } from '../globals/types';
import Card from './card';
import DropdownComponent from './dropDown';

const Main: React.FC = (data) => {
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
    <main className="py-10">
      <div className="flex justify-center align-middle py-4 pb-14">
        <DropdownComponent
          color="white"
          setType={handleType}
          type={option.type}
        />
        <Link href="/add">
          <a>Add</a>
        </Link>
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
    </main>
  );
};

export default Main;
