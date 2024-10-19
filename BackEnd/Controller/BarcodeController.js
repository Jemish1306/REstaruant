// controllers/barcodeController.js
const Barcode = require('../Model/BarcodeSchema');
const QRCode = require('qrcode');
const bwipjs = require('bwip-js'); // For barcodes


const generateQRCode = async (req, res) => {
  const { name, link, additionalText, qrColor, frameBackground, qrBackground, contentCategory } = req.body;
  
    try {
  
  const qrCodeData = await QRCode.toDataURL(link,{ color: {
        dark: qrColor || '#000000',  // Set the dark color (default black)
        light: qrBackground || '#ffffff' , // Set the light color (default white)
        frem:frameBackground ||'#ffffff'
      }}); // Use 'link' instead of 'url'

    
    const newBarcode = new Barcode({
      name,
      link,
      qrCode: qrCodeData, // Save the QR code as base64
      additionalText,
      qrColor,
      frameBackground,
      qrBackground,
      contentCategory
    });

    await newBarcode.save();

    // Send back the saved data and QR code
    res.status(201).json({ newBarcode, qrCode: qrCodeData });
  } catch (error) {
    console.error("Error generating QR code in Backend:", error);
    res.status(500).json({ error: "Error generating QR code" });
  }
};

const generateBarcode = async (req, res) => {
  const { name, link, type } = req.body;

  try {
   
    bwipjs.toBuffer({
      bcid: 'code128', // Barcode type
      text: link,      // The text to encode
      scale: 3,       // Scaling factor
      height: 10,     // Bar height
      includetext: false, // Show text below barcode
      textxalign: 'center', // Align text to the center
    }, async (err, png) => {
      if (err) {
        console.error("Error generating barcode in Backend:", err);
        res.status(500).json({ error: "Error generating barcode" });
      } else {
      
        const barcodeImage = `data:image/png;base64,${png.toString('base64')}`;
        const newBarcode = new Barcode({
          name,
          link,
          qrCode: barcodeImage, 
          type
        });

        await newBarcode.save();

        // Send back the saved data and barcode image
        res.status(201).json(newBarcode);
      }
    });
  } catch (error) {
    console.error("Error generating barcode in Backend:", error);
    res.status(500).json({ error: "Error generating barcode" });
  }
};



// Import your Barcode model
const getBarcode = async (req, res) => {
  try {
    const barcodes = await Barcode.find({}); 
    res.status(200).json(barcodes ); 

    
  } catch (error) {
    console.error('Error fetching barcodes:', error);
    res.status(500).json({ error: 'Server error while fetching barcodes' }); // Return error with 500 status
  }
};

module.exports = {
  generateQRCode,
  generateBarcode,getBarcode
};
