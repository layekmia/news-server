const express = require('express');
const { getAllPublisher } = require('../controller/Publisher.controller');

const router= express.Router();

router.get('/publishers', getAllPublisher);

module.exports = router;