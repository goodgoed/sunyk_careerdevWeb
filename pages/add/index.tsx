import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { db } from '../../lib/firebase/initFirebase';

const Add: React.FC = () => {
  const [deadline, setDeadline] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [showDeadline, setShowDeadline] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const [state, setState] = useState({
    title: '',
    type: 'Internship',
  });

  async function handleAdd(e) {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'contents'), {
      ...state,
      deadline,
      date,
    });
  }

  function handleShowDeadline() {
    setShowDeadline((prev) => {
      return !prev;
    });
  }

  function handleShowDate() {
    setShowDate((prev) => {
      return !prev;
    });
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1>Add a content</h1>
      <form>
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" onChange={handleChange} />
        </label>
        <select
          name="type"
          id="type"
          value={state.type}
          onChange={handleChange}
        >
          <option value="Internship">Internship</option>
          <option value="Seminar">Seminar</option>
          <option value="Contest">Contest</option>
        </select>
        <button type="button" onClick={handleShowDeadline}>
          Set Deadline
        </button>
        {showDeadline && (
          <div>
            <Calendar onChange={setDeadline} value={deadline} />
          </div>
        )}
        <button type="button" onClick={handleShowDate}>
          Set Date
        </button>
        {showDate && (
          <div>
            <Calendar onChange={setDate} value={date} />
          </div>
        )}
        <button type="submit" onClick={handleAdd}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Add;
