const express = require('express');
const multer = require('multer');
const flatFileService = require('../services/flatFileService');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/schema', upload.single('file'), async (req, res, next) => {
  try {
    const schema = await flatFileService.getSchema(req.file.path);
    res.json({ schema });
  } catch (err) {
    next(err);
  }
});

module.exports = router;