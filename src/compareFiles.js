import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const joinedKeys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = _.sortBy(joinedKeys);

  const differencies = sortedKeys.reduce((acc, current) => {
    const hasData1 = _.has(data1, current);
    const hasData2 = _.has(data2, current);
    const data1Value = data1[current];
    const data2Value = data2[current];
    const isObjectValue1 = _.isPlainObject(data1Value);
    const isObjectValue2 = _.isPlainObject(data2Value);

    if (!hasData2) {
      const descriptObject = { key: current, value: data1Value, status: 'deleted' };
      return [...acc, descriptObject];
    }

    if (!hasData1) {
      const descriptObject = { key: current, value: data2Value, status: 'added' };
      return [...acc, descriptObject];
    }

    if (data1Value === data2Value) {
      const descriptObject = { key: current, value: data1Value, status: 'unchanged' };
      return [...acc, descriptObject];
    }

    if (isObjectValue1 && isObjectValue2) {
      const children = compareFiles(data1Value, data2Value);
      const descriptObject = {
        key: current,
        value: 'nested',
        status: 'nested',
        children,
      };
      return [...acc, descriptObject];
    }

    if (hasData1 && hasData2 && data1Value !== data2Value) {
      const descriptObject = {
        key: current,
        value: data1Value,
        status: 'changed',
        newValue: data2Value,
      };
      return [...acc, descriptObject];
    }

    return acc;
  }, []);

  return differencies;
};
export default compareFiles;
