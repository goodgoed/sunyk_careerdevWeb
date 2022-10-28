import { uuidv4 } from '@firebase/util';
import { format } from 'date-fns';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import React from 'react';
import Swal from 'sweetalert2';

import { contentType } from '../../globals/types';
import { db } from '../../lib/firebase/initFirebase';

type detailProps = {
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

const Detail: React.FC = ({ content }: detailProps) => {
  function handleDelete() {
    const docRef = doc(db, 'contents', content.id);
    deleteDoc(docRef).then(() => {
      Swal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Content was successfully deleted!',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/';
        }
      });
    });
  }

  return (
    <div className="bg-lightsteelblue flex justify-center">
      <div className="w-2/4 px-6 bg-white rounded my-8">
        <div className="flex justify-center flex-col w-3/4 mx-auto pt-10">
          <h1 className="font-bold text-4xl">{content.type}</h1>
          <hr className="my-4 h-px bg-lightsteelblue border-0" />
          <div className="mb-6">
            <h2 className="text-2xl inline mr-5">{content.title}</h2>
            <p className="inline text-cyan-800 text-xs">
              on {format(new Date(content.date), 'MMM dd yyyy')}
            </p>
            <span className="mx-3 ">/</span>
            <p className="inline text-red-800 text-xs">
              close at {format(new Date(content.deadline), 'MMM dd yyyy')}
            </p>
          </div>
          <div className="mb-6">
            {content.images[0] &&
              content.images.map((image, idx) => {
                return (
                  <img src={image} alt={`${idx}-description`} key={uuidv4()} />
                );
              })}
          </div>

          <div className="flex space-x-2 mr-auto mb-6">
            <button
              type="button"
              className="ease-linear transition-all duration-150 ml-auto bg-darkcyan  font-semibold text-white hover:shadow-lg py-2 px-4 border border-darkcyan hover:border-transparent rounded"
              onClick={() => {
                window.location.href = `/edit/${content.id}`;
              }}
            >
              Edit
            </button>
            <button
              type="button"
              className="ease-linear transition-all duration-150 ml-auto bg-red-500 font-semibold text-white hover:shadow-lg py-2 px-4 border border-red-500 hover:border-transparent rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
