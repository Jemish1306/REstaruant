// models/Barcode.js
const mongoose = require('mongoose');

const barcodeSchema = new mongoose.Schema({
    name: String,
    url: String,
    qrCode: String, // We'll store the QR code image as a base64 string or image URL
    type: String, // e.g., 'Table' or 'Counter'
    createdAt: { type: Date, default: Date.now },
    frameBackground:String,
    qrColor:String,
    link:String,
    qrBackground:String,
    additionalText:String,
    contentCategory:String,
    name:String,


});

module.exports = mongoose.model('Barcode', barcodeSchema);
 