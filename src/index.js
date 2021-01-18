import path from 'path';
import fs from 'fs';
import compareFiles from './compareFiles.js';
import parseData from './parsers.js';
import chooseFormat from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(filepath);
const getFormat = (filepath) => {
  const format = path.extname(filepath);
  switch (format) {
    case '.json': return 'json';
    case '.yml': return 'yaml';
    default: throw new Error(`unknown format: ${format}`);
  }
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fullPath1 = getFullPath(filepath1);
  const fullPath2 = getFullPath(filepath2);

  const format1 = getFormat(fullPath1);
  const format2 = getFormat(fullPath2);

  const data1 = fs.readFileSync(fullPath1, 'utf8');
  const data2 = fs.readFileSync(fullPath2, 'utf8');

  const parsedData1 = parseData(data1, format1);
  const parsedData2 = parseData(data2, format2);

  const diffs = compareFiles(parsedData1, parsedData2);
  const result = chooseFormat(format, diffs);

  return result;
};
export default genDiff;
