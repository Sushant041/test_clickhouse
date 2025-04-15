const fs = require('fs');
const { readFile } = require('./flatFileService');
const { executeQuery } = require('./clickhouseService');

exports.ingestClickhouseToFile = async ({ query, jwt, config, outputPath }) => {
  const result = await executeQuery(query, jwt, config);
  fs.writeFileSync(outputPath, result);
  return { recordsProcessed: result.split('\n').length - 1 };
};

exports.ingestFileToClickhouse = async ({ filePath, tableName, config, columns }) => {
  const data = await readFile(filePath, columns);
  const values = data.map(row => `(${columns.map(col => `'${row[col]}'`).join(',')})`).join(',');
  const query = `INSERT INTO ${tableName} (${columns.join(',')}) VALUES ${values}`;
  await executeQuery(query, config.jwt, config);
  return { recordsProcessed: data.length };
};