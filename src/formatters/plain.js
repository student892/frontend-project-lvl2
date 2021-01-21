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
  const iter = (innerTree, objPaths) => {
    const changesList = innerTree.flatMap((current) => {
      const currentKey = current.key;
      const currentValue = current.value;
      const currentNewValue = current.newValue;
      const value = formatValue(currentValue);
      const newValue = formatValue(currentNewValue);
      const currentType = current.type;
      const currentChildren = current.children;
      const currentPath = `${objPaths}${currentKey}`;

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
