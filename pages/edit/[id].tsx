/* eslint-disable jsx-a11y/label-has-associated-control */
import { format } from 'date-fns';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

import { contentType } from '../../globals/types';
import { db } from '../../lib/firebase/initFirebase';

type IProps = {
  content: contentType;
};

export const getStaticPaths = async () => {
  const querySnapshot = await getDocs(collection(db, 'contents'));
  const paths = querySnapshot.docs.map((ele) => {
    return {
      params: { id: ele.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const docRef = doc(db, 'contents', id);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      content: {
        ...docSnap.data(),
        id: docSnap.id,
        deadline: docSnap.data().deadline.toDate().toString(),
        date: docSnap.data().date.toDate().toString(),
      },
    },
  };
};

const Edit: React.FC = ({ content }: IProps) => {
  const [state, setState] = useState({
    title: content.title,
    type: content.type,
    deadline: new Date(content.deadline),
    date: new Date(content.date),
  });

  function handleChange(e, name) {
    if ('target' in e) {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    } else {
      setState({
        ...state,
        [name]: e,
      });
    }
  }

  function handleEdit() {
    const docRef = doc(db, 'contents', content.id);
    updateDoc(docRef, {
      ...state,
    }).then(() => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Content was successfully edited!',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `/contents/${content.id}`;
        }
      });
    });
  }

  return (
    <div className="h-screen bg-lightsteelblue flex justify-center">
      <div className="w-2/4 px-6 bg-white rounded my-8">
        <div className="flex justify-center flex-col w-3/4 mx-auto pt-10">
          <h1 className="mx-auto font-bold">Edit a content</h1>
          <hr className="my-8 h-px bg-lightsteelblue border-0" />
          <form className="space-y-16">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="title"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-lightsteelblue peer"
                placeholder=" "
                required
                onChange={(e) => {
                  handleChange(e, 'title');
                }}
                value={state.title}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lightsteelblue peer-focus:dark:text-lightsteelblue peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Title
              </label>
            </div>

            <select
              name="type"
              id="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
              value={state.type}
              onChange={(e) => {
                handleChange(e, 'type');
              }}
            >
              <option value="initial">Select type of the content</option>
              <option value="Internship">Internship</option>
              <option value="Seminar">Seminar</option>
              <option value="Contest">Contest</option>
            </select>

            <DatePicker
              selected={state.deadline}
              onChange={(e) => {
                handleChange(e, 'deadline');
              }}
              dateFormat="MMM dd, yyyy"
              customInput={
                <div className="relative ">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="deadline"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Select the deadline"
                    value={format(state.deadline, 'MMM dd, yyyy')}
                  />
                </div>
              }
            />

            <DatePicker
              selected={state.date}
              onChange={(e) => {
                handleChange(e, 'date');
              }}
              dateFormat="MMM dd, yyyy"
              customInput={
                <div className="">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Select the date"
                    value={format(state.date, 'MMM dd, yyyy')}
                  />
                </div>
              }
            />
            <div className="flex ">
              <button
                type="button"
                className="mx-auto ease-linear transition-all duration-150 ml-auto bg-darkcyan  font-semibold text-white hover:shadow-lg py-2 px-4 border border-darkcyan hover:border-transparent rounded mb-1"
                onClick={handleEdit}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
