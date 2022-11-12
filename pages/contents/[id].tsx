import { format } from 'date-fns';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../components/button';
import { contentType } from '../../globals/types';
import { db, storage } from '../../lib/firebase/initFirebase';

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
  async function handleDelete() {
    if (content.images[0]) {
      // eslint-disable-next-line no-restricted-syntax
      for (const image of content.images) {
        const imgRef = ref(storage, image.key);
        // eslint-disable-next-line no-await-in-loop
        await deleteObject(imgRef);
      }
    }
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
    <section className="h-screen bg-lightsteelblue">
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
                    <Image
                      src={image.url}
                      alt={`${idx}-description`}
                      key={uuidv4()}
                      width={400}
                      height={400}
                      layout="responsive"
                    />
                  );
                })}
            </div>

            <div className="flex space-x-2 mr-auto mb-6">
              <Button type="edit">
                <Link href={`/edit/${content.id}`} passHref>
                  <a>Edit</a>
                </Link>
              </Button>
              <Button type="delete" onClickHandler={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
