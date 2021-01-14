import genDiff from './index.js';
import plain from './src/plain.js';

/*
const readFile = (filename) => fs.readFileSync(path.join('./', filename), 'utf-8');
const readed = readFile('file5.json');
console.log(JSON.parse(readed));
*/
const newObj = genDiff('file1.json', 'file2.json');
const obj = plain(newObj);
console.log(obj);
