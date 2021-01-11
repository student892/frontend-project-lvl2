import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parsers = (filepath) => {
  const format = path.extname(filepath);
  const content = fs.readFileSync(filepath, 'utf-8');
  if (format === '.json') {
    return JSON.parse(content);
  }
  if (format === '.yml') {
    return yaml.load(content);
  }
  return false;
};
export default parsers;
