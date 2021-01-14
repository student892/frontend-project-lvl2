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
      const currentStatus = current.status;
      const currentChildren = current.children;
      const currentPath = `${objPaths}${currentKey}`;
      if (currentStatus === 'deleted') {
        const innerStr = `Property '${currentPath}' was removed`;
        return innerStr;
      }
      if (currentStatus === 'added') {
        const innerStr = `Property '${currentPath}' was added with value: ${value}`;
        return innerStr;
      }
      if (currentStatus === 'changed') {
        const innerStr = `Property '${currentPath}' was updated. From ${value} to ${newValue}`;
        return innerStr;
      }
      if (currentStatus === 'nested') {
        return iter(currentChildren, `${currentPath}.`);
      }
      return 'unchanged';
    });
    return changesList.filter((element) => element !== 'unchanged').join('\n');
  };
  return iter(tree, '');
};
export default plain;
