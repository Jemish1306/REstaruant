const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  selectedRestaurant: { type: String, required: false },
  password: { type: String, required: true },
  agreedToTerms: { type: Boolean, required: false },
  otp: {  type: String, default: null },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
