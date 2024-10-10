import React, { useEffect, useState } from 'react';
import Layout from '../Shared/Layout';
import axios from 'axios';

// icons 
import trash from '../../assets/icons/trash.svg';
import closesquare from '../../assets/icons/close-square.svg';
import transh2 from  '../../assets/icons/close-circle.svg'

const AddItem = () => {
    const [itemdata, setItemdata] = useState({
        isVegSelected: true,
        itemName: '',
        ingredients: '',
        itemPrice: '',   
        category:'',
        isVeg:'',
        itemImage: null,
        discount: '',
        description:'',
        itemType: '',
        spicyLevel: '',
        customizationSteps: [{ id: 1, customizations: [{ name: '', detail: '', rate: '' }] }],
    });

    // const handleChange = (e) => {
    //     const { name, value, type, files, checked } = e.target;
    //     setItemdata((prevData) => ({
    //         ...prevData,
    //         [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    //     }));
    // };
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setItemdata((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    }

    
    // Check the updated itemdata in useEffect
    useEffect(() => {
        console.log('Updated itemdata:', itemdata);
    }, [itemdata]);
    
    

    const handleAddStep = () => {
        setItemdata((prevData) => ({
            ...prevData,
            customizationSteps: [
                ...prevData.customizationSteps,
                { id: prevData.customizationSteps.length + 1, customizations: [{ name: '', detail: '', rate: '' }] }
            ]
        }));
    };

    const handleAddCustomization = (stepIndex) => {
        const newSteps = itemdata.customizationSteps.map((step, index) => {
            if (index === stepIndex) {
                return {
                    ...step,
                    customizations: [...step.customizations, { name: '', detail: '', rate: '' }],
                };
            }
            return step;
        });
        setItemdata((prevData) => ({
            ...prevData,
            customizationSteps: newSteps,
        }));
    };

    const handleCustomizationChange = (stepIndex, customizationIndex, field, value) => {
        const newSteps = itemdata.customizationSteps.map((step, index) => {
            if (index === stepIndex) {
                const newCustomizations = step.customizations.map((customization, idx) => {
                    if (idx === customizationIndex) {
                        return {
                            ...customization,
                            [field]: value,
                        };
                    }
                    return customization;
                });
                return {
                    ...step,
                    customizations: newCustomizations,
                };
            }
            return step;
        });
        setItemdata((prevData) => ({
            ...prevData,
            customizationSteps: newSteps,
        }));
    };

    const handleVegSelection = () => {
        setItemdata((prevData) => ({
            ...prevData,
            isVegSelected: true,
        }));
    };

    const handleNonVegSelection = () => {
        setItemdata((prevData) => ({
            ...prevData,
            isVegSelected: false,
        }));
    };

    const handleRemoveCustomization = (stepIndex, customizationIndex) => {
        const newSteps = itemdata.customizationSteps.map((step, index) => {
            if (index === stepIndex) {
                const newCustomizations = step.customizations.filter((_, idx) => idx !== customizationIndex);
                return {
                    ...step,
                    customizations: newCustomizations,
                };
            }
            return step;
        });
        setItemdata((prevData) => ({
            ...prevData,
            customizationSteps: newSteps,
        }));
    };
    const handleRemoveStep = (stepIndex) => {
        const newSteps = itemdata.customizationSteps.filter((_, index) => index !== stepIndex);
        setItemdata((prevData) => ({
            ...prevData,
            customizationSteps: newSteps,
        }));
    };

    const handleSaveItem = async () => {
        try {
            const formData = new FormData();
    
            // Append each key in itemdata to FormData
            for (const key in itemdata) {
                if (key === 'customizationSteps') {
                    // Handle complex object like customizationSteps by converting to JSON
                    formData.append(key, JSON.stringify(itemdata[key]));
                } else if (key === 'itemImage' && itemdata[key] instanceof File) {
                    formData.append(key, itemdata[key]);
                } else {
                    formData.append(key, itemdata[key]);
                }
            }
    
            // Debug: Log formData contents
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
    
            // Make the POST request to save the item
            const response = await axios.post('http://localhost:3229/api/item', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            console.log('Saved item:', response.data);
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };
    
    





    // const handleSaveItem = async () => {
    //     const formData = new FormData();
    //     formData.append("itemName", itemdata.itemName);
    //     formData.append("ingredients", itemdata.ingredients);
    //     formData.append("itemPrice", itemdata.itemPrice);
    //     formData.append("itemCategory", itemdata.itemCategory);
    //     formData.append("spicyLevel", itemdata.spicyLevel);
    //     formData.append("itemImage", itemdata.itemImage);  // Add file to FormData
    
    //     try {
    //         const response = await axios.post("http://localhost:3229/api/item", formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         console.log("Item saved:", response.data);
    //     } catch (error) {
    //         console.error("Error saving item:", error);
    //     }
    // };
    
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];  // Get the selected file
        setItemdata({
            ...itemdata,
            itemImage: file  // Save the file object in state
        });
        console.log("Selected File: ", file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3229/api/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemdata),
            });
            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
            <div className="p-4 bg-secondary text-white rounded-lg">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold">Add Item</h1>
                    <div className="flex space-x-4 font-bold">
                        <label className={`flex items-center space-x-2 ${itemdata.isVegSelected ? 'text-green-500' : ''}`}>
                            <input type="radio" className="form-radio" name="isVegSelected" onClick={handleVegSelection} />
                            <span>Veg</span>
                        </label>
                        <label className={`flex items-center space-x-2 ${!itemdata.isVegSelected ? 'text-red-500' : ''}`}>
                            <input type="radio" className="form-radio" name="isVegSelected" onClick={handleNonVegSelection} />
                            <span>Non-Veg</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-secondary text-white mt-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="text-gray-400">Item Name</label>
                        <input
                            className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                            type="text"
                            name="itemName"
                            placeholder="Enter Item Name"
                            
                            value={itemdata.itemName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Ingredients</label>
                        <input
                            className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                            type="text"
                            name="ingredients"
                            placeholder="Enter Ingredients Name"
                            value={itemdata.ingredients}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Item Price</label>
                        <input
                            className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                            type="text"
                            name="itemPrice"
                            placeholder="Enter Item Price"
                            value={itemdata.itemPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Upload Item Image</label>
                        <input
                            className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                            type="file"
                            name="itemImage"
                            // value={itemdata.itemImage}
                            onChange={(e)=>handleFileChange(e)}
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Add Discount</label>
                        <input
                            className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                            type="text"
                            name="discount"
                            placeholder="Enter Discount"
                            value={itemdata.discount}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-gray-400">Select Item Category</label>
                        <select
                            className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                            name="category"
                            value={itemdata.category}
                            onChange={handleChange}
                        >
                           
                <option value="Burgar">Burgar</option>
                <option value="Icecreme">Icecreme</option>
                <option value="French Fries">French Fries</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Drink Juice">Drink Juice</option>
                           
                        </select>
                    </div>
                    <div className="col-span-1">

                    
                         <label className="text-gray-400">Select Spicy Level</label>
                        <select
                            className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                            name="spicyLevel"
                            value={itemdata.spicyLevel}
                            onChange={handleChange}
                        >
                           
                <option value="Less Spicy">Less Spicy</option>
                <option value="Regular Spicy">Regular Spicy</option>
                <option value="Extra Spicy">Extra Spicy</option>
          
                           
                        </select>
                        
                    </div>
                    <div className=''>
                    <label className="flex flex-col">
    <span className='text-gray-400'>Description:</span>
    <input
        type="text"
        name="description"
        value={itemdata.description}
        onChange={handleChange}
        className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
        placeholder="Enter item description"
    />
</label>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isInStock"
                            className="form-checkbox"
                            checked={itemdata.isInStock || true}
                            onChange={handleChange}
                            onClick={handleAddCustomization}
                        />
                        <span>Add costomization?</span>
                    </label>
                </div>
            </div>
            <div className="p-4 bg-secondary text-white mt-8 rounded-lg">
                <div>
                    <label className="text-gray-400 font-bold">Customization</label>
                </div>
                {itemdata.customizationSteps.map((step, stepIndex) => (
                    <div key={step.id} className="mt-4 border border-accent rounded-xl p-4">
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <h3 className="text-gray-400 font-bold mr-2">Step {step.id}</h3>
                            </div>
                            <button className="text-red-500 " type='button'  onClick={() => handleRemoveStep(stepIndex)}>
                                <img src={transh2} className='text-white hover:bg-red-500 bg-yellow-300 rounded-md ' alt="Remove"  />
                            </button>
                            
                        </div>
                        {step.customizations.map((customization, customizationIndex) => (
    <div key={customizationIndex} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
            <label className="text-gray-400">Customization Name</label>
            <input
                className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                type="text"
                placeholder="Enter Customization Name"
                value={customization.name}
                onChange={(e) => handleCustomizationChange(stepIndex, customizationIndex, 'name', e.target.value)}
            />
        </div>
        <div>
            <label className="text-gray-400">Detail</label>
            <input
                className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                type="text"
                placeholder="Enter Detail"
                value={customization.detail}
                onChange={(e) => handleCustomizationChange(stepIndex, customizationIndex, 'detail', e.target.value)}
            />
        </div>
        <div className='grid grid-cols-2'>
            <div className='w-full'>
                <label className="text-gray-400">Rate</label>
                <input
                    className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-96"
                    type="text"
                    placeholder="Enter Rate"
                    value={customization.rate}
                    onChange={(e) => handleCustomizationChange(stepIndex, customizationIndex, 'rate', e.target.value)}
                />
            </div>
            <div className='flex items-center justify-end mt-4'>
                <button
                    onClick={() => handleRemoveCustomization(stepIndex, customizationIndex)}
                    className="p-1 mt-2 bg-yellow-400 rounded-lg hover:bg-red-500"
                >
                    <img src={trash} alt="Delete Step" />
                </button>
            </div>
        </div>
    </div>
))}

                        <button className="mt-4  font-semibold border  rounded-lg p-1 shadow-sm bg-gradient-to-br from-yellow-500 to-blue-600  hover:from-yellow-500 hover:to-yellow-400 hover:text-black"
                        
                        onClick={() => handleAddCustomization(stepIndex)}>
                            + Add Customization
                        </button>
                    </div>
                ))}
                
                <button className="mt-4   border rounded-md bg-gradient-to-r from-yellow-500 to-blue-600 hover:from-yellow-500 hover:to-yellow-400 hover:text-black  p-2 font-bold shadow-sm " onClick={handleAddStep}>
                    + Add Step
                </button>
            </div>
            <button className="p-2  text-white mt-4 rounded-lg w-full bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-500 hover:to-yellow-500 hover:text-black font-semibold" onClick={handleSaveItem}>
                Save Item
            </button>
            </form>
        </Layout>
    );
};

export default AddItem;
  