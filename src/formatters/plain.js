import _ from 'lodash';

const formatValue = (value) => {
  const isObject = _.isPlainObject(value);
  if (isObject) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (innerTree, ancestry) => {
    const changesList = innerTree.flatMap((node) => {
      const value = formatValue(node.value);
      const newValue = formatValue(node.newValue);
      const { type, key, children } = node;
      const path = `${ancestry}${key}`;

      switch (type) {
        case 'deleted': return `Property '${path}' was removed`;
        case 'added': return `Property '${path}' was added with value: ${value}`;
        case 'changed': return `Property '${path}' was updated. From ${value} to ${newValue}`;
        case 'nested': return iter(children, `${path}.`);
        case 'unchanged': return [];
        default: throw new Error(`unknown format: ${type}`);
      }
    });
    return changesList.join('\n');
  };
  return iter(tree, '');
};
export default plain;
