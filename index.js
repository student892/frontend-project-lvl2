import fs from 'fs';
import path from 'path';
import compareFiles from './src/compareFiles.js';

const absolutePath = (filepath) => path.resolve(filepath);
const jsonToObject = (json) => JSON.parse(json);

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = absolutePath(filepath1);
  const absolutePath2 = absolutePath(filepath2);

  const contentOfFile1 = fs.readFileSync(absolutePath1, 'utf-8');
  const contentOfFile2 = fs.readFileSync(absolutePath2, 'utf-8');
  const data1 = jsonToObject(contentOfFile1);
  const data2 = jsonToObject(contentOfFile2);

  const result = compareFiles(data1, data2);

  return result;
};
export default genDiff;
