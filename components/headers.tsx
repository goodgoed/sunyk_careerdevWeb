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
        {/* 로고 왼쪽 빈칸어케없애누.. */}
        <a className="flex title-font font-medium items-center text-gray-900 mb-3 md:mb-0">
          <span className="ml-5 text-xl">SUNY Career Development Center</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center" />
        <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
          Sign in
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
