import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yml'],
  ['file1.json', 'file2.yml'],
])('.add(%s, %s)', (file1, file2) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  expect(genDiff(filepath1, filepath2)).toEqual(readFile('stylishDiffs.txt'));
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFile('plainDiffs.txt'));
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(readFile('jsonDiffs.txt'));
});
