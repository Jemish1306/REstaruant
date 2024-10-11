const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const errorMiddleware = require('./Middlewares/errorMiddleware');
const cors = require('cors');
const connectDB = require('./DB/CannectDB.js');
const DataSeed = require('./Seed/seedData.js');
// Routes
const authRoutes = require('./Routes/authRoutes.js');
const orderRoutes = require('./Routes/orderRoutes.js');
const itemRoutes = require('./routes/ItemRoutes.js');
const ProductRouter = require('./Routes/parcelOrderRoutes.js');
const { register, login, forgotPassword } = require('./Controller/authController.js');
const { getParcelOrders } = require('./Controller/parcelOrderController.js');
const { createItem, getItems, deletemongoosItem } = require('./Controller/additemcontroller.js');
const { getOnsiteOrders } = require("./Controller/OnsiteOrderController.js");
const { getServers } = require("dns");
const { getParcelPaymentHistory, getParcelPaymentBill } = require("./Controller/percelpaymenthcontroller.js");
const { getOnsitePaymentHistory, updateOnsitePaymentHistory, getOnsitePaymentBill } = require("./Controller/onsitepaymentcontroller.js");
const { processImages, updateItemImages } = require("./Seed/convertImages.js");

const menuData = require('./menupage.json');
const handleImageUploadAndSave = require("./Seed/convertImages.js");
const { GenrateBarcode, generateQRCode, generateBarcode, getBarcode } = require("./Controller/BarcodeController.js");
const { CreateCetegory } = require("./Controller/AddCategory.js");


dotenv.config();
console.log("Environment variables loaded");

const Server = express();
Server.use(cors());
Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({ extended: true }));
Server.use('/assets', express.static('src/assets'));
// Check Route
Server.get('/', (req, res) => {
  res.send("vercel run");
  console.log("Server Routes work");
});





// Get APIs
Server.get('/api/percel', getParcelOrders);
Server.get('/api/onsiteorder', getOnsiteOrders);
Server.get('/api/additem', getItems);
Server.get('/api/parcelpayment', getParcelPaymentHistory);
Server.get('/api/onsitepayment', getOnsitePaymentHistory);


// POST APIs
Server.post('/api/auth/login', login);
Server.post('/api/auth/register', register);
Server.post('/api/auth/forgotpassword', forgotPassword);
Server.get(`/api/parcelpayment/:orderId`, getParcelPaymentBill);
Server.post(`/api/onsitepayment/:id`, getOnsitePaymentBill);
// Server.post('/api/item', createItem);
// Server.post('/api/item/category',addCategory);


// Route APIs
Server.use('/api/auth', authRoutes);
Server.use('/api/admin', orderRoutes);
Server.use('/api/admin', itemRoutes);
Server.use('/api/admin', ProductRouter);
// Server.use('/api/admin', categoryRoute)

// DELETE APIs 

Server.delete(' ', deletemongoosItem);
Server.delete('/api/detele/barcode' , DataSeed.deletemongooBarcode)

// PUT APIs 
Server.put('/api/put/item', getServers);
Server.put('/api/put/onsitepayment', updateOnsitePaymentHistory);


// Barcode APIs
Server.post('/api/barcode',generateBarcode);
Server.post('/api/qrcode',generateQRCode)
Server.get('/api/barcode',getBarcode)


// Seed ips 
Server.get('/api/additemseed', DataSeed.additemdataadd)









// Error handling middleware (must be defined after all routes)
Server.use(errorMiddleware);

try {
  connectDB();
  console.log("Database connected");
} catch (error) {
  console.error("Error connecting to database:", error);
}

const Port = process.env.PORT || 9898;
const start = async () => {
  try {
    await Server.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  } catch (error) {
    console.error("Server error:", error);
  }
};


start();


const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
    }
});

// Initialize Multer with the storage config
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/; // Accept only jpeg, jpg, and png files
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});
Server.use('/uploads', express.static('uploads'));




// Route for creating an item with file upload using multer
// img Post Apis

Server.post('/api/item', upload.single('itemImage'), createItem);
Server.post('/api/cetegory' , upload.single('Image'),CreateCetegory)

