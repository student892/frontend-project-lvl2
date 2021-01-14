import _ from 'lodash';

const plain = (tree) => {
  const iter = (innerTree, objPaths) => {
    const mapped = innerTree.flatMap((current) => {
      const currentKey = current.key;
      const currentValue = current.value;
      const currentNewValue = current.newValue;
      const isObjectValue = _.isPlainObject(currentValue);
      const isObjectNewValue = _.isPlainObject(currentNewValue);
      const value = isObjectValue ? '[complex value]' : currentValue;
      const newValue = isObjectNewValue ? '[complex value]' : currentNewValue;
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
      return '';
    });
    return mapped.join('\n');
  };
  return iter(tree, '');
};
export default plain;
