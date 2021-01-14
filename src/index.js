import path from 'path';
import compareFiles from './compareFiles.js';
import parsers from './parsers.js';
import plain from './plain.js';

const absolutePath = (filepath) => path.resolve(filepath);

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = absolutePath(filepath1);
  const absolutePath2 = absolutePath(filepath2);
  const data1 = parsers(absolutePath1);
  const data2 = parsers(absolutePath2);

  const diffs = compareFiles(data1, data2);

  const result = plain(diffs);

  return result;
};
export default genDiff;
