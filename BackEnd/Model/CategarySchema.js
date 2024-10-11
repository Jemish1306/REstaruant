const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: false }, // Stores the filename of the uploaded image
});

module.exports = mongoose.model('Category', categorySchema);
