import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { expect, test } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json files', () => {
  const expectedResult = readFile('diffs.txt');
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const diffs = genDiff(file1Path, file2Path);
  expect(typeof diffs).toEqual('string');
  expect(diffs).toEqual(expectedResult);
});

test('yml files', () => {
  const expectedResult = readFile('diffs.txt');
  const file1Path = getFixturePath('file1.yml');
  const file2Path = getFixturePath('file2.yml');
  const diffs = genDiff(file1Path, file2Path);
  expect(typeof diffs).toEqual('string');
  expect(diffs).toEqual(expectedResult);
});
