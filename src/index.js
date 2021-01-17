import path from 'path';
import compareFiles from './compareFiles.js';
import parsers from './parsers.js';
import chooseFormat from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fullPath1 = getFullPath(filepath1);
  const fullPath2 = getFullPath(filepath2);
  const data1 = parsers(fullPath1);
  const data2 = parsers(fullPath2);

  const diffs = compareFiles(data1, data2);
  const result = chooseFormat(format, diffs);

  return result;
};
export default genDiff;
