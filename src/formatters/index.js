import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const chooseFormat = (format, diffTree) => {
  switch (format) {
    case 'plain': return plain(diffTree);
    case 'stylish': return stylish(diffTree);
    case 'json': return json(diffTree);
    default: throw new Error(`unknown format ${format}`);
  }
};
export default chooseFormat;
