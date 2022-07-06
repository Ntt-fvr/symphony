export const csvToArray = (str, delimiter = ',') => {
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
  const rows = str.slice(str.indexOf('\n') + 1).split('\n');

  const arrayValues = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });
  return arrayValues;
};

export const ValidateHeader = (str, delimiter, header) => {
  const headers = str.slice(0, str.indexOf('\n')).split(delimiter);
  let arrHeader = [];

  headers.map(function (row) {
    arrHeader.push(row);
  });

  return JSON.stringify(header) === JSON.stringify(arrHeader);
};
