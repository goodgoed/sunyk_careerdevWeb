// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/dropdown
import { createPopper } from '@popperjs/core';
import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

type Props = {
  color: string;
  option: string;
  setOption: (option: string) => void;
};

const Dropdown = ({ color, option, setOption }: Props) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  // const [option, setOption] = React.useState('All');
  const btnDropdownRef: React.RefObject<HTMLButtonElement> = React.useRef(null);
  const popoverDropdownRef: React.RefObject<HTMLDivElement> =
    React.useRef(null);

  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom',
    });
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // bg colors
  let bgColor;
  color === 'white'
    ? (bgColor = 'bg-slate-700')
    : (bgColor = `bg-${color}-500`);
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-6/12 md:w-4/12 px-4">
        <button
          className={`text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${bgColor}`}
          type="button"
          ref={btnDropdownRef}
          onClick={() => {
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
        >
          <div className="flex flex-row align-middle justify-center">
            {option} <AiFillCaretDown className="inline mt-1 ml-2" />
          </div>
        </button>
        <div
          ref={popoverDropdownRef}
          className={`${
            (dropdownPopoverShow ? 'block ' : 'hidden ') +
            (color === 'white' ? 'bg-white ' : `${bgColor} `)
          }text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1`}
          style={{ minWidth: '12rem' }}
        >
          <div
            className={`text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent cursor-pointer${
              color === 'white' ? ' text-slate-700' : 'text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              closeDropdownPopover();
              setOption('All');
            }}
          >
            All
          </div>
          <div
            className={`text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent cursor-pointer${
              color === 'white' ? ' text-slate-700' : 'text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              closeDropdownPopover();
              setOption('Internship');
            }}
          >
            Internship
          </div>
          <div
            className={`text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent cursor-pointer${
              color === 'white' ? ' text-slate-700' : 'text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              closeDropdownPopover();
              setOption('Seminar');
            }}
          >
            Seminar
          </div>
          <div
            className={`text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent cursor-pointer${
              color === 'white' ? ' text-slate-700' : 'text-white'
            }`}
            onClick={(e) => {
              e.preventDefault();
              closeDropdownPopover();
              setOption('Contest');
            }}
          >
            Contest
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
