const axios = require('axios');

exports.testConnection = async ({ host, port, database, user, jwt }) => {
  const url = `${host}:${port}/ping?database=${database}`;
  await axios.get(url, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
};

exports.getTables = async ({ host, port, database, jwt }) => {
  const query = 'SHOW TABLES';
  const url = `${host}:${port}/?database=${database}`;
  const response = await axios.post(url, query, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response.data.split('\n').filter(Boolean);
};

exports.getColumns = async (table, config) => {
  const query = `DESCRIBE TABLE ${table}`;
  const url = `${config.host}:${config.port}/?database=${config.database}`;
  const response = await axios.post(url, query, {
    headers: { Authorization: `Bearer ${config.jwt}` },
  });
  return response.data.split('\n').map(line => line.split('\t')[0]);
};
