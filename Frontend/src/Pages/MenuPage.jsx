import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './../Components/Shared/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import burgericon from '../assets/Img/pngwing 3.png';
import shendwichicon from '../assets/Img/pngwing 5.png';
import iceicon from '../assets/Img/pngwing 6.png';
import juiceicon from '../assets/Img/pngwing 11.png';
import friesicon from '../assets/Img/pngwing 7.png';
import AddCategoryModal from '../Components/Shared/AddCategoryModal';
import moreIcon from '../assets/icons/3dot.svg'; 

const initialCategories = [
  { name: 'All', icon: '' },
  { name: 'Burger', icon: burgericon },
  { name: 'Ice Cream', icon: iceicon },
  { name: 'French Fries', icon: friesicon },
  { name: 'Sandwich', icon: shendwichicon },
  { name: 'Drink Juice', icon: juiceicon }
];

const MenuPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const { state } = useLocation();
  const { cartItems = [] } = state || {}; // Retrieve cart items from state
  const [categories, setCategories] = useState(initialCategories); // Now using state for categories

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3229/api/additem')
      .then(response => {
        setItems(response.data);
        setFilteredItems(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filterItems = (category) => {
    if (category === 'All') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === category));
    }
    setSelectedCategory(category);
  };

  const handleAddItem = () => {
    navigate('/add-item');
  };

  const handleEdit = (itemId) => {
    navigate(`/edit-item/${itemId}`);
  };

  const handleDelete = (itemId) => {
    console.log('Delete item with ID:', itemId);
  };

  const toggleDropdown = (itemId) => {
    setDropdownVisible(dropdownVisible === itemId ? null : itemId);
  };

  const handleAddOrder = (item) => {
    
    navigate('/item-details', { state: { item, cartItems } });
  };

  // Updated handleSaveCategory to update the categories state
  const handleSaveCategory = (newCategory) => {
    setCategories(prevCategories => [...prevCategories, newCategory]); // Add new category to the list
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <div className="p-4 bg-mainbg">
        {/* Categories Section */}
        <div className="bg-secondary p-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h5 className="text-xl md:text-4xl text-yellow-500">Categories</h5>
            {/* Hide Add Item button on mobile */}
            <button
              type="button"
              className="rounded-lg bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-500 hover:to-yellow-500 w-full md:w-1/6 h-12 mt-2 md:mt-0 transition-all text-black font-semibold hidden md:block"
              onClick={handleAddItem}
            >
              + Add Item
            </button>
          </div>

          {/* Categories List */}
          <div className="grid grid-cols-3 gap-4">
            {categories.slice(0, 3).map((category) => (
              <button
                key={category.name}
                className={`bg-accent px-4 py-2 flex flex-col items-center justify-center rounded-lg ${
                  selectedCategory === category.name ? 'bg-yellow-500 text-black text-xl' : ''
                }`}
                onClick={() => filterItems(category.name)}
              >
                {category.icon && (
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-6 h-6 md:w-10 md:h-10 inline-block"
                  />
                )}
                {category.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {categories.slice(3).map((category) => (
              <button
                key={category.name}
                className={`bg-accent px-4 py-2 flex flex-col items-center justify-center rounded-lg ${
                  selectedCategory === category.name ? 'bg-yellow-500 text-black text-xl' : ''
                }`}
                onClick={() => filterItems(category.name)}
              >
                {category.icon && (
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-6 h-6 md:w-10 md:h-10 inline-block"
                  />
                )}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Menu */}
        <div className="flex flex-wrap justify-center bg-secondary p-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4">
              <div className="bg-accent p-4 rounded-lg relative">
                <div className="relative">
                  {item.discount && (
                    <span className="absolute top-0 left-0 bg-yellow-500 text-white px-2 py-1 rounded-tr-lg rounded-bl-lg">
                      {item.discount}% Off
                    </span>
                  )}
                  <img
                    src={item.itemImage && item.itemImage.startsWith('uploads/')
                      ? `http://localhost:3229/${item.itemImage}`
                      : item.itemImage || '/uploads/placeholder.jpg'}
                    alt={item.itemName || 'No Image Available'}
                    className="w-full h-32 md:h-48 object-cover rounded-t-lg shadow-xl"
                  />
                  <img
                    src={moreIcon}
                    alt="More options"
                    className="absolute top-2 right-2 w-4 h-4 md:w-6 md:h-6 cursor-pointer"
                    onClick={() => toggleDropdown(item.itemId)}
                  />
                 {dropdownVisible === item.itemId && (
  <div className="absolute top-10 right-2 bg-accent shadow-md rounded-md py-1">
    <button
      className="block px-4 py-2 text-sm text-white"
      onClick={() => handleEdit(item.itemId)}
    >
      Edit
    </button>
    <button
      className="block px-4 py-2 text-sm text-white"
      onClick={() => handleDelete(item.itemId)}
    >
      Delete
    </button>
  </div>
)}

                </div>

                <div className="p-4">
                  <h3 className="text-lg text-yellow-400 font-semibold hover:text-xl">{item.itemName}</h3>
                  <p className="text-white text-sm">{item.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold text-white">₹{item.itemPrice}</span>
                    <span
                      className={`w-4 h-4 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}
                    ></span>
                    <button
                      type="button"
                      className="rounded-md shadow p-1 bg-gradient-to-r from-yellow-500 to-blue-400 hover:from-yellow-500 hover:to-yellow-400 hover:text-black font-semibold"
                      onClick={() => handleAddOrder(item)}
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddCategoryModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleSaveCategory}
      />
    </Layout>
  );
};

export default MenuPage;
