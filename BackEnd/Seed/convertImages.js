const fs = require('fs');

const path = require('path');
const mongoose = require('mongoose');
const MenuPage = require('../Model/ItemSchema');
const dotenv = require('dotenv');
dotenv.config();
const menupage = require('../menupage.json');

// Function to convert an image file to base64
const convertImageToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject(err);
      }
      const base64Image = `data:image/png;base64,${data.toString('base64')}`;
      resolve(base64Image);
    });
  });
};

// Function to process all images in the directory and add to MongoDB
const processImages = async () => {
  try {
    const directoryPath = 'C:/Restaurants/Frontend/src/assets/Img';
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      try {
        const base64Image = await convertImageToBase64(filePath);

        // Construct itemData based on menupage.json data
        const itemData = {
          itemName: itemName, // Ensure menupage contains this data
          ingredients: ingredients,
          itemPrice:itemPrice,
          itemImage: base64Image,
          discount:discount,
          category: category,
          description: description,
          spicyLevel: spicyLevel,
          isVeg:isVeg,
          customizations:customizations || [], // Optional field
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await MenuPage.create(itemData);
       
        console.log(`Item data for ${file} added successfully.`);
      } catch (error) {
        console.error(`Error processing image ${file}:`, error);
      }
    }
  } catch (error) {
    console.error('Error processing images:', error);
  }
};

// Export the processImages function
module.exports = { processImages };
