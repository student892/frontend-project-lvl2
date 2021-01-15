import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const chooseFormat = (format, diffTree) => {
  if (format === 'plain') {
    return plain(diffTree);
  }
  if (format === 'stylish') {
    return stylish(diffTree);
  }
  if (format === 'json') {
    return json(diffTree);
  }
  throw new Error('unknown format');
};
export default chooseFormat;
