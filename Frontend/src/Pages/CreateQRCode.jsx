import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../Components/Shared/Layout';
import bar54 from '../assets/Barcode/qrcode_undefined.png';
import cup from '../assets/Barcode/cup.png';
import Group from '../assets/Barcode/Group.png';
import met from '../assets/Barcode/met.png';
import menu from '../assets/Barcode/menu.png';
import teacup from '../assets/Barcode/teacup.png';
const QRCodeGenerator = () => {
  const [formData, setFormData] = useState({
    link: '',
    name: '',
    additionalText: '',
    qrColor: '',
    frameBackground: '',
    qrBackground: '',
    theme: '',
    contentCategory: '',
    type:" "

  });
console.log('fromdata', formData)
  const [qrCode, setQrCode] = useState(null);


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleColorChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3229/api/qrcode', formData);
      setQrCode(response.data.qrCode);  
    } catch (error) {
      console.error("Error generating QR code in Front:", error);
    }
  };


  return (
    <Layout>
      {/* Header with navigation links */}
      

      <div className="p-6 bg-secondary min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-extrabold text-yellow-400">Create QR Code Table Counter</h1>

  <div className="flex items-center gap-4 p-2">
    <div className="flex items-center gap-2">
      <input type="radio" id="table" name="option" value={formData.type} />
      <label htmlFor="table" className="text-gray-300 font-semibold">Table</label>
    </div>

    <div className="flex items-center gap-2">
      <input type="radio" id="counter" name="option" value={formData.type}/>
      <label htmlFor="counter" className="text-gray-300 font-semibold">Counter</label>
    </div>
  </div>
</div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section with Input Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Put Your Link Here</label>
              <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="w-full p-3 bg-innerinput text-white rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Name Your QR (Optional)</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Food & Drink"
                className="w-full p-3 bg-accent text-white rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Select Content Category</label>
              <select
                name="contentCategory"
                value={formData.contentCategory}
                onChange={handleInputChange}
                className="w-full p-3 bg-accent text-white rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <option value="Food & Drink">Food & Drink</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 font-semibold mb-1">Additional Text</label>
              <input
                type="text"
                name="additionalText"
                value={formData.additionalText}
                onChange={handleInputChange}
                placeholder="Additional"
                className="w-full p-3 bg-accent text-white rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>

            {/* Color pickers */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
  <div>
    <label className="block text-gray-400 font-semibold mb-1">Choose QR Color</label>
    <input
      type="color"
      name="qrColor"
      value={formData.qrColor}
      onChange={(e) => handleColorChange('qrColor', e.target.value)}
      className="w-full h-10 rounded-lg"
    />
  </div>
  <div>
    <label className="block text-gray-400 font-semibold mb-1">Frame Background</label>
    <input
      type="color"
      name="frameBackground"
      value={formData.frameBackground}
      onChange={(e) => handleColorChange('frameBackground', e.target.value)}
      className="w-full h-10 rounded-lg"
    />
  </div>
  <div>
    <label className="block text-gray-400 font-semibold mb-1">QR Code Background</label>
    <input
      type="color"
      name="qrBackground"
      value={formData.qrBackground}
      onChange={(e) => handleColorChange('qrBackground', e.target.value)}
      className="w-full h-10 rounded-lg"
    />
  </div>

  <div className="ml-auto w-full">
    <button
      className="p-3 mt-4 bg-gradient-to-r from-yellow-500 w-full to-blue-500 text-black font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-all"
      onClick={handleSubmit}
    >
      Generate QR
    </button>
  </div>
</div>

          </div>

          {/* Right Section with QR Preview */}
          <div className="flex flex-col items-center justify-center">
            <label className="block text-gray-400 mb-4 font-semibold text-center">QR Code Preview</label>
            {qrCode ? (
              <img src={qrCode} alt="Generated QR Code" className="w-auto md:w-80 rounded-lg border-4 border-yellow-500 shadow-xl " />
            ) : (
              <div className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-lg border border-gray-600">
                <span className="text-white">No QR code generated yet.</span>
              </div>
            )}
            {/* SVG and PNG download buttons */}
            <div className="flex gap-4 mt-4">
              <button
                className="p-3 bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-all"
                onClick={handleSubmit}
              >
                Download SVG
              </button>
              <button
                className="p-3 bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-500 transition-all"
                onClick={handleSubmit}
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>

        {/* Thematic Standard Section */}

<div className="mt-12">
  <h2 className="text-xl font-extrabold mb-6 text-yellow-400">Thematic Standard</h2>
  <div className="p-4 rounded-lg text-white">
    {/* Image Row */}
    <div className="flex justify-between gap-4 items-center">
      <img src={bar54} alt="Barcode" className="p-4 bg-accent rounded-md shadow-xl transform hover:scale-110 hover:-rotate-6 duration-300" />
      <img src={cup} alt="Cup" className="p-4 bg-accent rounded-md shadow-xl transform hover:scale-110 hover:-rotate-6 duration-300" />
      <img src={Group} alt="Group" className="p-4 bg-accent rounded-md shadow-xl transform hover:scale-110 hover:-rotate-6 duration-300" />
      <img src={met} alt="Met" className="p-4 bg-accent rounded-md shadow-xl transform hover:scale-110 hover:-rotate-6 duration-300" />
      <img src={menu} alt="Menu" className="p-4 bg-accent rounded-md shadow-xl transform hover:scale-110 hover:-rotate-6 duration-300" />
      <img src={teacup} alt="Teacup" className="p-4 bg-accent rounded-md shadow-xl transform hover:scale-110 hover:-rotate-6 duration-300" />
    </div>
  </div>
</div>



      </div>
    </Layout>
  );
};

export default QRCodeGenerator;
