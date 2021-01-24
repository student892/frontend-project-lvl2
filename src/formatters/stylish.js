import _ from 'lodash';

const formatValue = (value, depth) => {
  const isObjectValue = _.isPlainObject(value);
  if (!isObjectValue) {
    return value;
  }
  const indent = ' ';
  const indentNumber = 4;
  const indentSize = indent.repeat(depth * indentNumber);
  const finalIndent = indent.repeat(depth * indentNumber - indentNumber);
  const objectValues = Object.entries(value);
  const innerStr = objectValues.map((current) => {
    const [innerKey, innerValue] = current;
    const childObj = `${indentSize}${innerKey}: ${formatValue(innerValue, depth + 1)}`;
    return childObj;
  });
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
    const mapped = innerTree.flatMap((current) => {
      const currentKey = current.key;
      const currentValue = current.value;
      const currentType = current.type;
      const currentChildren = current.children;
      const newCurrentValue = current.newValue;

      switch (currentType) {
        case 'deleted':
          return `${currentIndent}- ${currentKey}: ${formatValue(currentValue, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${currentKey}: ${formatValue(currentValue, depth + 1)}`;
        case 'changed':
          return [`${currentIndent}- ${currentKey}: ${formatValue(currentValue, depth + 1)}`,
            `${currentIndent}+ ${currentKey}: ${formatValue(newCurrentValue, depth + 1)}`];
        case 'nested':
          return [`${currentIndent}  ${currentKey}: `, iter(currentChildren, depth + 1)].join('');
        case 'unchanged':
          return `${currentIndent}  ${currentKey}: ${formatValue(currentValue, depth + 1)}`;
        default: throw new Error(`unknown format: ${currentType}`);
      }
    });
    const joinedStr = mapped.join('\n');
    const result = `{\n${joinedStr}\n${finalIndent}}`;
    return result;
  };

  return iter(tree, initialDepth);
};
export default stylish;
