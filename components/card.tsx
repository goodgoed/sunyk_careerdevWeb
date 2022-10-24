import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { AiFillCaretRight } from 'react-icons/ai';

interface Props {
  type: string;
  title: string;
  deadline: string;
  date: string;
  id: string;
}

const Card = ({ type, title, deadline, date, id }: Props) => {
  const formattedRsvp = format(new Date(deadline), 'MMM dd');
  const formattedDate = format(new Date(date), 'MMM dd');

  let borderColor;
  let textColor;
  if (type.toLowerCase() === 'internship') {
    borderColor = `border-oldrose`;
    textColor = `text-oldrose`;
  } else if (type.toLowerCase() === 'seminar') {
    borderColor = `border-emerald`;
    textColor = `text-emerald`;
  } else if (type.toLowerCase() === 'contest') {
    borderColor = `border-violet`;
    textColor = `text-violet`;
  }

  return (
    <div
      className={`w-90 bg-white rounded-md px-4 py-1 border-t-8 ${borderColor}`}
    >
      <div>
        <h4 className={`text-2xl pt-1 ${textColor}`}>{type}</h4>
        <h4 className="font-bold py-4 pb-10 pr-5">{title}</h4>
        <div>
          <p className="text-sm">RSVP: {formattedRsvp}</p>
          <p className="text-sm">Date: {formattedDate}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <Link href={`/contents/${id}`}>
          <a className="text-xs -mr-1">
            Detail <AiFillCaretRight className="inline-block" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Card;
