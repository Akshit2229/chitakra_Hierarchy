const express = require('express');
const router = express.Router();
const { handleBfhlPost } = require('../controllers/bfhlController');

// Route: POST /bfhl
router.post('/', handleBfhlPost);

module.exports = router;
