import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React from 'react';

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
        deadline: docSnap.data().deadline.toDate().toString(),
        date: docSnap.data().date.toDate().toString(),
      },
    },
  };
};

const Detail: React.FC = ({ content }: detailProps) => {
  return (
    <div>
      <h1>{content.title}</h1>
      <h3>{content.type}</h3>
    </div>
  );
};

export default Detail;
