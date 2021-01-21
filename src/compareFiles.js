import _ from 'lodash';

const compareData = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);

  const differencies = sortedKeys.map((current) => {
    const hasData1 = _.has(data1, current);
    const hasData2 = _.has(data2, current);
    const data1Value = data1[current];
    const data2Value = data2[current];
    const isObjectValue1 = _.isPlainObject(data1Value);
    const isObjectValue2 = _.isPlainObject(data2Value);

    if (!hasData2) {
      const descriptObject = { key: current, value: data1Value, type: 'deleted' };
      return descriptObject;
    }

    if (!hasData1) {
      const descriptObject = { key: current, value: data2Value, type: 'added' };
      return descriptObject;
    }

    if (data1Value === data2Value) {
      const descriptObject = { key: current, value: data1Value, type: 'unchanged' };
      return descriptObject;
    }

    if (isObjectValue1 && isObjectValue2) {
      const children = compareData(data1Value, data2Value);
      const descriptObject = {
        key: current,
        value: 'nested',
        type: 'nested',
        children,
      };
      return descriptObject;
    }

    if (hasData1 && hasData2 && data1Value !== data2Value) {
      const descriptObject = {
        key: current,
        value: data1Value,
        type: 'changed',
        newValue: data2Value,
      };
      return descriptObject;
    }
    return current;
  });

  return differencies;
};
export default compareData;
