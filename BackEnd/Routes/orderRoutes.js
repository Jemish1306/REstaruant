//BackEnd/Routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../Controller/OrderController');


router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.route("/get").get(orderController.getAllOrders)




module.exports = router;





