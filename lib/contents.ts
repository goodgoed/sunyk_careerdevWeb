import { contentType, optionType } from '../globals/types';
import contents from './contents.json';

// later will be changed to firebase fetching query
export default function fetchContents(option: optionType) {
  const result = contents.filter((content: contentType) => {
    // check type
    if (option.type.toLowerCase() === 'all') {
      return content;
    }

    if (option.type.toLowerCase() === content.type.toLowerCase()) {
      return content;
    }
  });

  return result;
}
