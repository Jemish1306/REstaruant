import React, { useState } from 'react';
import Layout from '../Shared/Layout';
import axios from 'axios';

// icons 
import trash from '../../assets/icons/trash.svg';
import closesquare from '../../assets/icons/close-square.svg';

const AddItem = () => {
    const [itemdata, setItemdata] = useState({
        isVegSelected: false,
        itemName: '',
        ingredients: '',
        itemPrice: '',
        itemImage: null,
        discount: '',
        itemType: '',
        spicyLevel: '',
        customizationSteps: [{ id: 1, customizations: [{ name: '', detail: '', rate: '' }] }],
    });

    const handleChange = (e) => {
        const { name, value, type, files, checked } = e.target;
        setItemdata((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        }));
        console.log('setItemdata', setItemdata);
    };

    const handleAddStep = () => {
        setItemdata((prevData) => ({
            ...prevData,
            customizationSteps: [...prevData.customizationSteps, { id: prevData.customizationSteps.length + 1, customizations: [{ name: '', detail: '', rate: '' }] }],
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
            for (const key in itemdata) {
                if (key === 'customizationSteps') {
                    formData.append(key, JSON.stringify(itemdata[key]));
                } else {
                    formData.append(key, itemdata[key]);
                }
            }

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

    return (
        <Layout>
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
                            onChange={handleChange}
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
                        <label className="text-gray-400">Select Item Type</label>
                        <select
                            className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                            name="itemType"
                            value={itemdata.itemType}
                            onChange={handleChange}
                        >
                            <option value="">Select Type</option>
                            <option value="Spicy">Spicy</option>
                            <option value="Sweet">Sweet</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label className="text-gray-400">Spicy Level</label>
                        <div className="flex items-center space-x-5 bg-accent p-2 rounded-xl">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="spicyLevel"
                                    className="form-radio"
                                    value="Less Spicy"
                                    checked={itemdata.spicyLevel === 'Less Spicy'}
                                    onChange={handleChange}
                                />
                                <span>Less Spicy</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="spicyLevel"
                                    className="form-radio"
                                    value="Medium Spicy"
                                    checked={itemdata.spicyLevel === 'Medium Spicy'}
                                    onChange={handleChange}
                                />
                                <span>Medium Spicy</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="spicyLevel"
                                    className="form-radio"
                                    value="Highly Spicy"
                                    checked={itemdata.spicyLevel === 'Highly Spicy'}
                                    onChange={handleChange}
                                />
                                <span>Highly Spicy</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-600 mb-4">Customizations</h2>
                {itemdata.customizationSteps.map((step, stepIndex) => (
                    <div key={step.id} className="p-4 bg-secondary text-white rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Customization Step {stepIndex + 1}</h3>
                            <button onClick={() => handleRemoveStep(stepIndex)} className="text-red-500">
                                <img src={trash} alt="Delete Step" />
                            </button>
                        </div>
                        {step.customizations.map((customization, customizationIndex) => (
                            <div key={customizationIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="text-gray-400">Name</label>
                                    <input
                                        className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                                        type="text"
                                        name={`customizationName-${stepIndex}-${customizationIndex}`}
                                        placeholder="Enter Customization Name"
                                        value={customization.name}
                                        onChange={(e) =>
                                            handleCustomizationChange(stepIndex, customizationIndex, 'name', e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400">Detail</label>
                                    <input
                                        className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                                        type="text"
                                        name={`customizationDetail-${stepIndex}-${customizationIndex}`}
                                        placeholder="Enter Customization Detail"
                                        value={customization.detail}
                                        onChange={(e) =>
                                            handleCustomizationChange(stepIndex, customizationIndex, 'detail', e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400">Rate</label>
                                    <input
                                        className="p-2 bg-accent text-white rounded-xl focus:border-cyan-500 border-2 border-transparent focus:outline-none w-full"
                                        type="text"
                                        name={`customizationRate-${stepIndex}-${customizationIndex}`}
                                        placeholder="Enter Customization Rate"
                                        value={customization.rate}
                                        onChange={(e) =>
                                            handleCustomizationChange(stepIndex, customizationIndex, 'rate', e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex justify-end col-span-1 md:col-span-3">
                                    <button onClick={() => handleRemoveCustomization(stepIndex, customizationIndex)} className="text-red-500">
                                        <img src={closesquare} alt="Remove Customization" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => handleAddCustomization(stepIndex)}
                            className="text-white bg-blue-500 px-4 py-2 rounded-lg"
                        >
                            Add Customization
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleAddStep}
                    className="text-white bg-blue-500 px-4 py-2 rounded-lg mt-4"
                >
                    Add Step
                </button>
            </div>
            <div className="mt-8">
                <button
                    onClick={handleSaveItem}
                    className="text-white bg-green-500 px-6 py-2 rounded-lg"
                >
                    Save Item
                </button>
            </div>
        </Layout>
    );
};

export default AddItem;
