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
    console.log(contents);
    setContents(
      Object.values(data).filter((content: contentType) => {
        if (option.type.toLowerCase() === 'all') return true;

        return option.type.toLowerCase() === content.type.toLowerCase();
      })
    );
  }, [option.type]);

  return (
    <main className="py-10 flex justify-center">
      <div className="w-2/4">
        <div className="flex py-4 pb-14 align-middle">
          <div className="mr-auto invisible">Hidden</div>
          <DropdownComponent
            color="white"
            setType={handleType}
            type={option.type}
          />
          <button
            type="button"
            className="ease-linear transition-all duration-150 ml-auto bg-darkcyan  font-semibold text-white hover:shadow-lg py-2 px-4 border border-darkcyan hover:border-transparent rounded mb-1"
          >
            <Link href="/add" passHref>
              <a>Add</a>
            </Link>
          </button>
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
  );
};

export default Main;
