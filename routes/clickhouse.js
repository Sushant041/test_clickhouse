const express = require('express');
const router = express.Router();
const clickhouseService = require('../services/clickhouseService');

router.post('/connect', async (req, res, next) => {
  try {
    const { host, port, database, user, jwt } = req.body;
    await clickhouseService.testConnection({ host, port, database, user, jwt });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.get('/tables', async (req, res, next) => {
  try {
    const tables = await clickhouseService.getTables(req.query);
    res.json({ tables });
  } catch (err) {
    next(err);
  }
});

router.post('/columns', async (req, res, next) => {
  try {
    const { table, config } = req.body;
    const columns = await clickhouseService.getColumns(table, config);
    res.json({ columns });
  } catch (err) {
    next(err);
  }
});

module.exports = router;