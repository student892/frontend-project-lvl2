import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const joinedKeys = _.uniq([...data1Keys, ...data2Keys]).sort();

  const differencies = joinedKeys.reduce((acc, current) => {
    const hasData1 = _.has(data1, current);
    const hasData2 = _.has(data2, current);
    const data1Value = data1[current];
    const data2Value = data2[current];
    const isObjectValue1 = _.isPlainObject(data1Value);
    const isObjectValue2 = _.isPlainObject(data2Value);

    if (!hasData2) {
      const descriptObject = { key: current, value: data1Value, status: 'deleted' };
      acc.push(descriptObject);
    }

    if (!hasData1) {
      const descriptObject = { key: current, value: data2Value, status: 'added' };
      acc.push(descriptObject);
    }

    if (data1Value === data2Value) {
      const descriptObject = { key: current, value: data1Value, status: 'unchanged' };
      acc.push(descriptObject);
    }

    if (isObjectValue1 && isObjectValue2) {
      const children = compareFiles(data1Value, data2Value);
      const descriptObject = {
        key: current,
        value: 'nested',
        status: 'changed',
        children,
      };
      acc.push(descriptObject);
      return acc;
    }

    if (hasData1 && hasData2 && data1Value !== data2Value) {
      const descriptObject = { key: current, value: data1Value, status: 'changed' };
      acc.push(descriptObject);
    }

    return acc;
  }, []);

  return JSON.stringify(differencies, null, '  ');
};
export default compareFiles;
