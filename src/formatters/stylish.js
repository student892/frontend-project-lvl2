import _ from 'lodash';

const makeString = (value, depth) => {
  const isObjectValue = _.isPlainObject(value);
  if (!isObjectValue) {
    return value;
  }
  const indent = ' ';
  const indentNumber = 4;
  const indentSize = indent.repeat(depth * indentNumber);
  const finalIndent = indent.repeat(depth * indentNumber - indentNumber);
  const objectValues = Object.entries(value);
  const innerStr = objectValues.reduce((acc, current) => {
    const [innerKey, innerValue] = current;
    const childObj = `${indentSize}${innerKey}: ${makeString(innerValue, depth + 1)}`;
    return [...acc, childObj];
  }, []);
  const joinedStr = innerStr.join('\n');
  const result = `{\n${joinedStr}\n${finalIndent}}`;
  return result;
};

const stylish = (tree) => {
  const initialDepth = 1;
  const iter = (innerTree, depth) => {
    const indentNumber = 4;
    const indent = ' ';
    const currentIndent = indent.repeat(depth * indentNumber - 2);
    const finalIndent = indent.repeat(depth * indentNumber - 4);
    const reduced = innerTree.reduce((acc, current) => {
      const currentKey = current.key;
      const currentValue = current.value;
      const currentStatus = current.status;
      const currentChildren = current.children;
      const newCurrentValue = current.newValue;
      if (currentStatus === 'deleted') {
        const currentStr = `${currentIndent}- ${currentKey}: ${makeString(currentValue, depth + 1)}`;
        return [...acc, currentStr];
      }
      if (currentStatus === 'added') {
        const currentStr = `${currentIndent}+ ${currentKey}: ${makeString(currentValue, depth + 1)}`;
        return [...acc, currentStr];
      }
      if (currentStatus === 'changed') {
        const currentStr1 = `${currentIndent}- ${currentKey}: ${makeString(currentValue, depth + 1)}`;
        const currentStr2 = `${currentIndent}+ ${currentKey}: ${makeString(newCurrentValue, depth + 1)}`;
        return [...acc, currentStr1, currentStr2];
      }
      if (currentStatus === 'nested') {
        const currentStr = [`${currentIndent}  ${currentKey}: `, iter(currentChildren, depth + 1)].join('');
        return [...acc, currentStr];
      }
      const currentStr = `${currentIndent}  ${currentKey}: ${makeString(currentValue, depth + 1)}`;
      return [...acc, currentStr];
    }, []);
    const joinedStr = reduced.join('\n');
    const result = `{\n${joinedStr}\n${finalIndent}}`;
    return result;
  };

  return iter(tree, initialDepth);
};
export default stylish;
