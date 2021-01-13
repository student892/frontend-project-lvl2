import fs from 'fs';
import path from 'path';
import genDiff from './index.js';
import stylish from './src/formatters/stylish.js';

/*
const readFile = (filename) => fs.readFileSync(path.join('./', filename), 'utf-8');
const readed = readFile('file5.json');
console.log(JSON.parse(readed));
*/
const newObj = genDiff('file3.json', 'file4.json');
const obj = stylish(newObj);
console.log(obj);
