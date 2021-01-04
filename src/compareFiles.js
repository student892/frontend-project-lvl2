import _ from 'lodash';

const compareFiles = (data1, data2) => {
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const joinedKeys = _.uniq([...data1Keys, ...data2Keys]).sort();

  const differencies = {};
  const result = joinedKeys.reduce((acc, current) => {
    const hasData1 = _.has(data1, current);
    const hasData2 = _.has(data2, current);
    const data1Value = data1[current];
    const data2Value = data2[current];

    if (hasData1 && !hasData2) {
      differencies[`- ${current}`] = data1[current];
    }

    if (!hasData1 && hasData2) {
      differencies[`+ ${current}`] = data2[current];
    }

    if (hasData1 && hasData2 && data1Value === data2Value) {
      differencies[`  ${current}`] = data1[current];
    }

    if (hasData1 && hasData2 && data1Value !== data2Value) {
      differencies[`- ${current}`] = data1[current];
      differencies[`+ ${current}`] = data2[current];
    }

    return differencies;
  }, differencies);

  return result;
};
export default compareFiles;
