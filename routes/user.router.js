const express = require('express');
//const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.json({
      message: 'No hay query params',
    });
  }
});

module.exports = router;
