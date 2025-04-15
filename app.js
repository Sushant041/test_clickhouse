const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const clickhouseRoutes = require('./routes/clickhouse');
const flatfileRoutes = require('./routes/flatfile');
const ingestRoutes = require('./routes/ingest');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/clickhouse', clickhouseRoutes);
app.use('/flatfile', flatfileRoutes);
app.use('/ingest', ingestRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));