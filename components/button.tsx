import React from 'react';

const Button: React.FC = ({ children, type, onClickHandler }) => {
  const color =
    type === 'add' || type === 'edit'
      ? {
          background: 'bg-darkcyan',
          border: 'border-darkcyan',
        }
      : {
          background: 'bg-red-500',
          border: 'border-red-500',
        };

  return (
    <button
      type="button"
      className={`ease-linear transition-all duration-150 ml-auto ${color.background}  font-semibold text-white hover:shadow-lg py-2 px-4 border ${color.border} hover:border-transparent rounded mb-1`}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
