import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Card from '../components/card';
import DropdownComponent from '../components/dropDown';
import { contentType } from '../globals/types';
import fetchContents from '../lib/contents';

const Main: React.FC = () => {
  const [option, setOption] = React.useState({
    type: 'All',
  });

  function handleType(type: string) {
    setOption({
      type,
    });
  }

  // testing code
  const [contents, setContents] = React.useState([]);

  React.useEffect(() => {
    setContents(fetchContents(option));
  }, [option]);

  return (
    <main className="py-10">
      <div className="flex justify-center align-middle py-4">
        <DropdownComponent
          color="white"
          setType={handleType}
          type={option.type}
        />
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-wrap justify-center align-middle gap-12">
          {contents[0] &&
            contents.map((content: contentType) => {
              return (
                <Card
                  key={uuidv4()}
                  type={content.type}
                  title={content.title}
                  rsvp={content.deadline}
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
