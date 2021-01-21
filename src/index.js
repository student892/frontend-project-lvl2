import path from 'path';
import fs from 'fs';
import compareData from './compareFiles.js';
import parseData from './parsers.js';
import format from './formatters/index.js';

const getFullPath = (filepath) => path.resolve(filepath);
const getFormat = (filepath) => {
  const ext = path.extname(filepath);
  switch (ext) {
    case '.json': return 'json';
    case '.yml': return 'yaml';
    case '.yaml': return 'yaml';
    default: throw new Error(`unknown format: ${ext}`);
  }
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const fullPath1 = getFullPath(filepath1);
  const fullPath2 = getFullPath(filepath2);

  const format1 = getFormat(fullPath1);
  const format2 = getFormat(fullPath2);

  const data1 = fs.readFileSync(fullPath1, 'utf8');
  const data2 = fs.readFileSync(fullPath2, 'utf8');

  const parsedData1 = parseData(data1, format1);
  const parsedData2 = parseData(data2, format2);

  const diffs = compareData(parsedData1, parsedData2);
  const result = format(formatter, diffs);

  return result;
};
export default genDiff;
