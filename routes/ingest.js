const express = require('express');
const ingestionService = require('../services/ingestionService');
const router = express.Router();

router.post('/from-clickhouse', async (req, res, next) => {
  try {
    const result = await ingestionService.ingestClickhouseToFile(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/to-clickhouse', async (req, res, next) => {
  try {
    const result = await ingestionService.ingestFileToClickhouse(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;