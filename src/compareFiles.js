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

    if (hasData1 && !hasData2) {
      acc.push(` - ${current}: ${data1[current]}`);
    }

    if (!hasData1 && hasData2) {
      acc.push(` + ${current}: ${data2[current]}`);
    }

    if (hasData1 && hasData2 && data1Value === data2Value) {
      acc.push(`   ${current}: ${data1[current]}`);
    }

    if (hasData1 && hasData2 && data1Value !== data2Value) {
      acc.push(` - ${current}: ${data1[current]}`);
      acc.push(` + ${current}: ${data2[current]}`);
    }

    return acc;
  }, []);

  return `{\n ${differencies.join('\n ')}\n}`;
};
export default compareFiles;
