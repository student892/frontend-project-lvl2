import fs from 'fs';
import path from 'path';

const readFile = (filename) => fs.readFileSync(path.join('./', filename), 'utf-8');
const readed = readFile('file5.json');
console.log(JSON.parse(readed));
