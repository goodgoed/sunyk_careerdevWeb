import DropdownComponent from '../components/dropDown';
import Card from '../components/card';
import React, { useEffect } from 'react';
import fetchContents from '../lib/contents';

const Main: React.FC = () => {
  const [option, setOption] = React.useState('All');

  function handleOption(option: string) {
    setOption(option);
  }

  //testing code
  const [contents, setContents] = React.useState([]);
  React.useEffect(() => {
    setContents(fetchContents());
  }, []);

  return (
    <main className="py-10">
      <div className="flex justify-center align-middle py-4">
        <DropdownComponent
          color="white"
          setOption={handleOption}
          option={option}
        />
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-wrap justify-start align-middle gap-12">
          <Card
            type="Internship"
            title="Career For Auditing"
            rsvp="2022-10-16"
            date="2022-10-16"
          />
          <Card
            type="Seminar"
            title="Career For Auditing"
            rsvp="2022-10-16"
            date="2022-10-16"
          />
          <Card
            type="Contest"
            title="Career For Auditing"
            rsvp="2022-10-16"
            date="2022-10-16"
          />
          <Card
            type="Contest"
            title="Career For Auditing"
            rsvp="2022-10-16"
            date="2022-10-16"
          />
          <Card
            type="Contest"
            title="Career For Auditing"
            rsvp="2022-10-16"
            date="2022-10-16"
          />
        </div>
      </div>
    </main>
  );
};

export default Main;
