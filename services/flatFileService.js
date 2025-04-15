const fs = require('fs');
const csv = require('csv-parser');

exports.getSchema = (filePath) => {
  return new Promise((resolve, reject) => {
    const schema = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('headers', (headers) => resolve(headers))
      .on('error', reject);
  });
};

exports.readFile = (filePath, columns = []) => {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const filtered = columns.length
          ? Object.fromEntries(columns.map(col => [col, row[col]]))
          : row;
        data.push(filtered);
      })
      .on('end', () => resolve(data))
      .on('error', reject);
  });
};