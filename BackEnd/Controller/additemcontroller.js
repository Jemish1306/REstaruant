const { AsyncLocalStorage } = require('async_hooks');
const AddItem = require('../Model/ItemSchema');

// Create new item
const createItem = async (req, res) => {
    const {
        isVegSelected,
        itemName,
        ingredients,
        itemPrice,
        category,
        description,
        isVeg,
        discount,
        itemType,
        spicyLevel,
        customizationSteps // Add customizationSteps from req.body
    } = req.body;

    // Access the file through req.file (for image upload)
    const itemImage = req.file ? `uploads/${req.file.filename}` : null;

    try {
        // Create a new item with customizationSteps included
        const newItem = new AddItem({
            isVegSelected,
            itemName,
            ingredients,
            itemPrice,
            category,
            description,
            isVeg,
            itemImage,
            discount,
            itemType,
            spicyLevel,
            customizationSteps: JSON.parse(customizationSteps) // Parse the JSON string if it's sent as a string
        });
        
        await newItem.save();
        res.status(201).json(newItem);
        console.log("Item created successfully:", newItem);
    } catch (err) {
        console.error('Error creating item:', err.message);
        res.status(400).json({ message: err.message });
    }
};


// Get all items
const getItems = async (req, res) => {
    try {
        const items = await AddItem.find({});
        res.json(items);
        console.log("get item sussfully ")
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log("getiotems api error")
    }
};

// Get single item
const getItemById = async (req, res) => {
    try {
        const item = await AddItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message:'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update item
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await AddItem.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete item
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await AddItem.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
        // TODO: Remove the item from the categories that contain it
        const categories = await Category.find({ items: id });
        categories.forEach(category => {
            category.items.pull(id);
            category.save();
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const deletemongoosItem = async()=>{
    try {
        await AddItem.deleteMany({});
        console.log('item deleteed')
        
    } catch (error) {
        console.log('error', error)
        console.log("delete error")
    }
    
}




module.exports = {
    createItem,getItems,updateItem,deleteItem,getItemById, deletemongoosItem
}