import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../Components/Shared/Layout';
import { useNavigate } from 'react-router-dom';

const BarcodeGrid = () => {
  const [barcodes, setBarcodes] = useState([]); 


  const nevigate = useNavigate();

  const handleCreateQRCode =()=>{nevigate('/createbarcode')}
 
 
  useEffect(() => {
    const fetchBarcodes = async () => {
      try {
        const response = await axios.get('http://localhost:3229/api/barcode'); 
          setBarcodes(response.data  || [] ); 
        console.log('response', response)
      } catch (error) {
        console.error("Error fetching barcode data:", error);
      }
    };

    fetchBarcodes();
  }, []);




  
  return (
    <Layout>
     
    <div className="p-6 bg-secondary shadow-xl min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">QR Codes</h1>
        <button className="bg-gradient-to-r from-yell text-white py-2 px-4 rounded-lg hover:bg-yellow-600 from-yellow-500 to-blue-500 hover:from-yellow-500 hover:to-yellow-500 hover:text-black" onClick={handleCreateQRCode}>
          + Create QR Code
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-6">
       
          {barcodes.map((barcode, index) => (
            <div key={index} className="bg-accent p-4 rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg text-white font-medium">Table No - {barcode.name}</h2>
                <button className="text-white">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
              <img 
                src={barcode.qrCode} 
                alt={`QR for Table ${barcode.name}`} 
                // alt='barcodeImage'
                className="w-full object-contain bg-white p-2 rounded-lg" 
              />
              <div className="text-white flex justify-end mt-2 space-x-4">
                <button className="text-sm text-yellow-400 hover:underline">Edit</button>
                <button className="text-sm text-red-400 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        
      </div>
    </div>
    </Layout>
  );
};

export default BarcodeGrid;
