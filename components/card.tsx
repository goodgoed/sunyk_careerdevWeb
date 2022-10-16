import { AiFillCaretRight } from 'react-icons/ai';
import { format } from 'date-fns';
import React from 'react';

interface Props {
  type: string;
  title: string;
  rsvp: string;
  date: string;
}

const Card = ({ type, title, rsvp, date }: Props) => {
  const formattedRsvp = format(new Date(rsvp), 'MMM dd');
  const formattedDate = format(new Date(date), 'MMM dd');

  let borderColor;
  let textColor;
  if (type.toLowerCase() === 'internship') {
    borderColor = 'border-red-900';
    textColor = 'text-red-900';
  } else if (type.toLowerCase() === 'seminar') {
    borderColor = 'border-blue-900';
    textColor = 'text-blue-900';
  } else if (type.toLowerCase() === 'contest') {
    borderColor = 'border-cyan-900';
    textColor = 'text-cyan-900';
  }

  return (
    <div
      className={`w-90 bg-white rounded-md px-4 py-1 border-t-8 ` + borderColor}
    >
      <div>
        <h4 className={`text-2xl pt-1 ` + textColor}>{type}</h4>
        <h4 className="font-bold py-4 pr-5">{title}</h4>
        <div>
          <p>RSVP: {formattedRsvp}</p>
          <p>Date: {formattedDate}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <a href="#">
          Detail <AiFillCaretRight className="inline-block" />
        </a>
      </div>
    </div>
  );
};

export default Card;
