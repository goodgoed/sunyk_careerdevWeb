import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

// 로그인을 안하면 내용물을 볼 수 없음
const LogInButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {' '}
        <button
          type="button"
          className="bg-gray-100 py-1 px-3 hover:bg-gray-300 rounded text-base mt-4 my-5"
          onClick={() => {
            return signOut();
          }}
        >
          Log Out
        </button>
      </>
    );
  }
  return (
    <button
      type="button"
      className="bg-gray-100 py-1 px-3 hover:bg-gray-300 rounded text-base mt-4 my-5"
      onClick={() => {
        return signIn();
      }}
    >
      Log in with SBU Account
    </button>
  );
};

const checkLogIn = () => {
  const { data: session } = useSession();
  return session;
};

export default LogInButton;
export { checkLogIn };
