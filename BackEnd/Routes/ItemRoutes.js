const express = require('express');
const router = express.Router();
const {
    getItems,
    getItemById,
    updateItem,
    deleteItem,
    createItem
} = require('../Controller/additemcontroller');

// Routes for items
router.route('/items')
    .get(getItems)
    .post(createItem);

router.route('/items/:id')
    .get(getItemById)
    .put(updateItem)
    .delete(deleteItem);

// Test route
router.get('/test', (req, res) => {
    res.send('Route system is working');
});

module.exports = router;
