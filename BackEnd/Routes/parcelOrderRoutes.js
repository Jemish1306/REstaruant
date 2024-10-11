const express = require('express');
const { getParcelOrders, updateParcelOrderStatus } = require('../Controller/parcelOrderController');

const router = express.Router();


router.all('*', (req,res)=>{
    res.status(404).json({msg:"routes not found"})
})
router.get("/percelorders", getParcelOrders);
router.put('/percelorder/:id', updateParcelOrderStatus);

// router.route("/percelorder").get(getParcelOrders)

router.put('/percelorder/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedOrder = await ParcelOrder.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;



