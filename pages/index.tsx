import type { NextPage } from 'next';
import React from 'react';

import HeaderDown from '../components/headerDown';
import Headers from '../components/headers';
import LogInButton, { checkLogIn } from './logInPage';
import Main from './main';

const Home: NextPage = () => {
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
        <Main />
      </>
    );
  }

  return (
    <>
      <Headers />
      <div className="headerUp">
        <HeaderDown />
        <div className="flex justify-center">
          <LogInButton />
        </div>
      </div>
    </>
  );
};
export default Home;
