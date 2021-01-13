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
    acc.push(`${indentSize}${innerKey}: ${makeString(innerValue, depth + 1)}`);
    return acc;
  }, []);
  const joinedStr = innerStr.join('\n');
  const result = `{\n${joinedStr}\n${finalIndent}}`;
  return result;
};

const stylish = (tree) => {
  const initialDepth = 1;
  const iter = (innerTree, depth) => {
    const indent = ' ';
    const currentIndent = indent.repeat(depth * 2);
    const finalIndent = indent.repeat(depth * 2 + 2);
    const reduced = innerTree.reduce((acc, current) => {
      const currentKey = current.key;
      const currentValue = current.value;
      const currentStatus = current.status;
      const currentChildren = current.children;
      const newCurrentValue = current.newValue;
      if (currentStatus === 'deleted') {
        const currentStr = `${currentIndent}- ${currentKey}: ${makeString(currentValue, depth + 1)}`;
        acc.push(currentStr);
        return acc;
      }
      if (currentStatus === 'added') {
        const currentStr = `${currentIndent}+ ${currentKey}: ${makeString(currentValue, depth + 1)}`;
        acc.push(currentStr);
        return acc;
      }
      if (currentStatus === 'changed') {
        const currentStr1 = `${currentIndent}- ${currentKey}: ${makeString(currentValue, depth)}`;
        acc.push(currentStr1);
        const currentStr2 = `${currentIndent}+ ${currentKey}: ${makeString(newCurrentValue, depth)}`;
        acc.push(currentStr2);
      }
      if (currentStatus === 'nested') {
        const currentStr = [`${currentIndent}  ${currentKey}: `, iter(currentChildren, depth + 1)].join('');
        acc.push(currentStr);
        return acc;
      }
      const currentStr = `${currentIndent}  ${currentKey}: ${makeString(currentValue, depth)}`;
      acc.push(currentStr);
      return acc;
    }, []);
    const joinedStr = reduced.join('\n');
    const result = `{\n${joinedStr}\n${finalIndent}}`;
    return result;
  };

  return iter(tree, initialDepth);
};
export default stylish;

/*
const obj1 = {
  group3: {
    fee: 100500,
    deep: {
      id: {
        number: 45,
      },
    },
  },
};
const str = makeString(obj1, 1);
console.log(str);
*/
