import { collection, getDocs, query } from 'firebase/firestore';

import { contentType, optionType } from '../globals/types';
import contents from './contents.json';
import { db } from './firebase/initFirebase';

// later will be changed to firebase fetching query
export default async function fetchContents(option: optionType) {
  const querySnapshot = await getDocs(collection(db, 'contents'));
  return querySnapshot;
  // const result = contents.filter((content: contentType) => {
  //   // check type
  //   if (option.type.toLowerCase() === 'all') {
  //     return content;
  //   }

  //   if (option.type.toLowerCase() === content.type.toLowerCase()) {
  //     return content;
  //   }
  // });

  // return result;
}
