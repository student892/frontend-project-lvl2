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
  ['file1.json', 'file2.json', 'stylish', 'stylishDiffs.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'stylishDiffs.txt'],
  ['file1.json', 'file2.json', undefined, 'stylishDiffs.txt'],
  ['file1.yml', 'file2.yml', undefined, 'stylishDiffs.txt'],
  ['file1.json', 'file2.json', 'plain', 'plainDiffs.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'plainDiffs.txt'],
  ['file1.json', 'file2.json', 'json', 'jsonDiffs.txt'],
  ['file1.yml', 'file2.yml', 'json', 'jsonDiffs.txt'],
])('.add(%s, %s, %s)', (file1, file2, format, expectedResult) => {
  const diffs = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  expect(diffs).toEqual(readFile(expectedResult));
  expect(typeof diffs).toEqual('string');
});
