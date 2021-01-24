import _ from 'lodash';

const compareData = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);

  const differences = sortedKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }

    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const children = compareData(data1[key], data2[key]);
      return {
        key,
        value: 'nested',
        type: 'nested',
        children,
      };
    }

    if (data1[key] !== data2[key]) {
      return {
        key,
        value: data1[key],
        type: 'changed',
        newValue: data2[key],
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });

  return differences;
};
export default compareData;
