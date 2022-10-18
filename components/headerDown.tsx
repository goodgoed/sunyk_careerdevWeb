import Image from 'next/image';
import React from 'react';

const headerDown = () => {
  return (
    <div>
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font text-7xl mb-4 font-medium text-gray-900 text-Montserrat">
            Make
            <br className="hidden lg:inline-block" />
            All
            <br className="hidden lg:inline-block" />
            Your
            <br className="hidden lg:inline-block" />
            Dream
          </h1>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6" />
        </div>
        <Image src="/image/HeadIl.svg" width="400" height="400" />
      </div>
    </div>
  );
};
export default headerDown;
