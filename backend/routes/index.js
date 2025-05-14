const express = require('express');
const db = require('../config/mongoose');
const router = express.Router();

router.use('/api', require('./user'));
router.use('/api/priority', require('./priority'));
router.use('/api/task', require('./task'));
module.exports = router;