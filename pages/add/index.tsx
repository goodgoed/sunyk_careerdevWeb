/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/label-has-associated-control */
import { format } from 'date-fns';
import { addDoc, collection, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TiDeleteOutline } from 'react-icons/ti';
import ReactLoading from 'react-loading';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '../../lib/firebase/initFirebase';

Modal.setAppElement('#__next');
const Add: React.FC = () => {
  const [state, setState] = useState({
    title: '',
    type: 'Select type of the content',
    deadline: new Date(),
    date: new Date(),
  });
  const [images, setImages] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState('');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(e) {
    e.stopPropagation();
    setIsOpen(false);
    setPreviewURL('');
  }

  async function handleAdd(e) {
    setIsLoading(true);
    const imgURL = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const image of images) {
      const key = uuidv4();
      const imgRef = ref(storage, key);
      // eslint-disable-next-line no-await-in-loop
      await uploadBytes(imgRef, image, 'data_url').then(async (result) => {
        imgURL.push({ key, url: await getDownloadURL(result.ref) });
      });
    }

    const docRef = await addDoc(collection(db, 'contents'), {
      ...state,
      images: imgURL,
    })
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Content was successfully added!',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/contents/${res.id}`;
          }
        });
      })
      .catch(() => {
        Swal.fire({
          title: 'Something went wrong',
          icon: 'error',
          text: 'Try Again',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      });
  }

  function handleChange(e, name) {
    if ('target' in e) {
      if (e.target.files && e.target.files.length > 0) {
        Object.values(e.target.files).forEach((file) => {
          setImages((prev) => {
            return [...prev, file];
          });
        });
      } else {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setState({
        ...state,
        [name]: e,
      });
    }
  }

  function handleImageDelete(name) {
    setImages(
      images.filter((image) => {
        return image.name !== name;
      })
    );
  }

  function openPreview(image) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      setPreviewURL(reader.result.toString());
    };
  }

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div className="bg-lightsteelblue flex justify-center">
      <div className="w-2/4 px-6 bg-white rounded my-8">
        <div className="flex justify-center flex-col w-3/4 mx-auto pt-10">
          <h1 className="mx-auto font-bold">Add a content</h1>
          <hr className="my-8 h-px bg-lightsteelblue border-0" />
          <form>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5 mb-6"
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
                <div className="relative mb-6">
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
                <div className="relative mb-6">
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
            <div className="flex flex-col justify-center items-center w-full mb-6 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed ">
              {images[0] ? (
                <div className="py-4">
                  <h1 className="font-bold mb-4">Selected</h1>
                  <div className="flex flex-col">
                    {images.map((image) => {
                      return (
                        <div
                          key={uuidv4()}
                          className="flex flex-row align-middle"
                        >
                          <p
                            className="mr-auto text-s cursor-pointer hover:text-darkcyan ease-linear transition-all duration-150"
                            onClick={() => {
                              openModal();
                              openPreview(image);
                            }}
                          >
                            <Modal
                              isOpen={modalIsOpen}
                              onRequestClose={closeModal}
                            >
                              <Image
                                src={previewURL}
                                alt="preview image"
                                layout="fill"
                              />
                            </Modal>
                            {image.name}
                          </p>
                          <TiDeleteOutline
                            className="cursor-pointer ml-3 mt-1"
                            onClick={() => {
                              handleImageDelete(image.name);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col justify-center items-center w-full h-64 cursor-pointer hover:bg-gray-100 "
                >
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="mb-3 w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    name="images"
                    multiple
                    onChange={(e) => {
                      handleChange(e, 'images');
                    }}
                  />
                </label>
              )}
            </div>
            <div className="flex mb-6">
              <button
                type="button"
                className="mx-auto ease-linear transition-all duration-150 ml-auto bg-darkcyan  font-semibold text-white hover:shadow-lg py-2 px-4 border border-darkcyan hover:border-transparent rounded mb-1"
                onClick={handleAdd}
              >
                Confirm
              </button>
            </div>
          </form>

          {loading && (
            <Modal
              isOpen
              style={{
                content: {
                  posiition: 'relative',
                  border: 'none',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  height: '100vh',
                  inset: '0px',
                },
              }}
            >
              <ReactLoading
                type="bubbles"
                color="#067CBD"
                height={200}
                width={200}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
