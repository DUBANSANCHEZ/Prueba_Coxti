const express = require('express');
const rangeofValuesCtrl = require('../controllers/rangeofValues.controller');
const router = express.Router();

router.get('/:Salario', rangeofValuesCtrl.getSalario);

module.exports = router;