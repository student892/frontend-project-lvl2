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
      const currentKey = node.key;
      const currentValue = node.value;
      const value = formatValue(currentValue);
      const newValue = formatValue(node.newValue);
      const currentType = node.type;
      const currentChildren = node.children;
      const currentPath = `${ancestry}${currentKey}`;

      switch (currentType) {
        case 'deleted': return `Property '${currentPath}' was removed`;
        case 'added': return `Property '${currentPath}' was added with value: ${value}`;
        case 'changed': return `Property '${currentPath}' was updated. From ${value} to ${newValue}`;
        case 'nested': return iter(currentChildren, `${currentPath}.`);
        case 'unchanged': return [];
        default: throw new Error(`unknown format: ${currentType}`);
      }
    });
    return changesList.join('\n');
  };
  return iter(tree, '');
};
export default plain;
