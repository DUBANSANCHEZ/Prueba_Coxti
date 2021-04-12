const express = require('express');
const loginCtrl = require('../controllers/login.controller');
const router = express.Router();

router.post('/', loginCtrl.authentication);
router.get('/logout', loginCtrl.logout);

module.exports = router;