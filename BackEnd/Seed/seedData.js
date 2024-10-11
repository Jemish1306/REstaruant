const connectDB = require('../DB/CannectDB');
const MenuPage =require('../menupage.json')
const OnsiteOrder = require('../Model/OnsiteorderSchema');
const ParcelOrder = require('../Model/ParcelOrderSchema');
const ParcelPayment = require('../Model/PercelPaymentSchema')
const parcelOrderData = require('../parcelOrders.json');
const onsiteOrderData=require('../onsiteOrder.json')
const itemschema =require('../Model/ItemSchema')
const dotenv = require('dotenv');
const AddItem = require('../Model/ItemSchema');
const PercalPaymentData = require('../PercalOrderPayment.json')
const OnsitePaymentData =require('../OnsiteOrderPayment.json')
const OnsitePayment = require('../Model/OnsitePaymentSchema')
const Barcode = require('../Model/BarcodeSchema')

dotenv.config();
require('dotenv').config();

const startAddData = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        
       // Clear existing data
        await ParcelOrder.create(parcelOrderData); 
        await OnsiteOrder.create(onsiteOrderData)
        await AddItem.create(MenuPage)
        console.log('Database seeded with dummy data');
        process.exit();
    } catch (error) {
        console.error("data seed error",error);
        process.exit(1);
       
    }
};


// Add mongo Data
const Perceldataadd = async()=>{
    await ParcelOrder.create(parcelOrderData)
console.log("perceldata add sussfully ")
} 
const OnsiteOrderdataadd = async()=>{
    await OnsiteOrder.create(onsiteOrderData)
console.log("onsitedata add sussfully ")
} 
const additemdataadd = async()=>{
    await AddItem.create(MenuPage)
console.log("additem data  add sussfully ")
} 

const PercalOrderPaymentsAdd = async()=>{
    await ParcelPayment.create(PercalPaymentData)
    console.log("PercalPaymentsDataAdd")

}
const OnsitePaymentAdd = async()=> {
    await OnsitePayment.create(OnsitePaymentData)
    console.log("OnsiteDataAdd successfully")
}

// Delete mongo Data
const  mongopercelorderDeleta=async()=>{
    await ParcelOrder.deleteMany({});
    console.log("many dataa deleteed")
}
const onsitemongodatadelete = async ()=>{
    await OnsiteOrder.deleteMany({})
    console.log("ONSITE dataa deleteed")
}

const itemmongodelete= async ()=>{
    await AddItem.deleteMany({})
    console.log("itemdelete dataa deleteed")
}

const DeletePercalPayment = async ()=>{
    await ParcelPayment.deleteMany({})
}

const DeleteOnsitePayment=async()=>{
    await OnsitePayment.deleteMany({})
}

const updateImagePaths = (AddItem) => {
    return AddItem.map(item => {
        if (item.itemImage) {
            // Example: Replace the image path here with your URL
            item.itemImage = item.itemImage.replace('C:/Restaurants/Restaurant/src/assets/Img/');
            console.log('done')
        }
        return item;
    });
};

const deletemongooBarcode = async ()=>{
    await Barcode.deleteMany({})
}






module.exports={startAddData, mongopercelorderDeleta, onsitemongodatadelete, itemmongodelete, Perceldataadd,OnsiteOrderdataadd,additemdataadd,PercalOrderPaymentsAdd ,DeletePercalPayment,OnsitePaymentAdd,DeleteOnsitePayment,updateImagePaths , deletemongooBarcode};
