import yaml from 'js-yaml';

const parseData = (data, format) => {
  switch (format) {
    case 'json': return JSON.parse(data);
    case 'yaml': return yaml.load(data);
    default: throw new Error(`unknown format: ${format}`);
  }
};
export default parseData;
