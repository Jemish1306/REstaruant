const express = require('express');
const { addCategory } = require('../Controller/AddCategory.js');
const router = express.Router();

// POST route to add a new category
router.post('/category', addCategory);

module.exports = router;
