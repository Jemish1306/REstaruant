// const mongoose = require('mongoose');
// const { type } = require('os');

// const customizationSchema = new mongoose.Schema({
//   name: { type: String, required: false },
//   detail: { type: String, required: false },
//   rate: { type: Number, required: false }
// }, { _id: false });


// const itemSchema = new mongoose.Schema({
//   itemName: { type: String, required: false },
//   ingredients: { type: String, required: false, default: 'N/A' }, // Default value
//   itemPrice: { type: Number, required: false, default: 0 }, // Default value
//   itemImage: { type: String, required: false },
//   discount: { type: Number, default: 0 },
//   category: { type: String, required: false, default: 'Uncategorized' }, // Default value
//   description: { type: String, required: false },
//   spicyLevel: { type: String,  default: 'Mild' },
//   isVegSelected: { type: Boolean, required: false, default: false }, // Default value
//   category:{type:String ,require:false},
//   categortImage:{type:String,require:false},
//   customizationSteps: [customizationSchema]
// }, { timestamps: false });


// const  AddItem = mongoose.model('Item', itemSchema)
// module.exports=AddItem 




const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
  name: { type: String, required: false },
  detail: { type: String, required: false },
  rate: { type: Number, required: false }
}, { _id: false });

const itemSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Correct usage of ObjectId
  itemName: { type: String, required: false },
  ingredients: { type: String, required: false, default: 'N/A' },
  itemPrice: { type: Number, required: false, default: 0 },
  itemImage: { type: String, required: false },
  discount: { type: Number, default: 0 },
  category: { type: String, required: false, default: 'Uncategorized' },
  description: { type: String, required: false },
  spicyLevel: { type: String, default: 'Mild' },
  isVegSelected: { type: Boolean, required: false, default: false },
  categoryImage: { type: String, required: false },
  customizationSteps: [customizationSchema]
}, { timestamps: true });

const AddItem = mongoose.model('Item', itemSchema);
module.exports = AddItem;


