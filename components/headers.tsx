import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
        <Image
          src="/image/SUNY_logo.jpg"
          width="100"
          height="50"
          layout="intrinsic"
          className="flex-initial ml"
        />
        <span className="flex title-font font-medium items-center text-gray-900 mb-3 md:mb-0">
          <span className="ml-5 text-xl">SUNY Career Development Center</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
