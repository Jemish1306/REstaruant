import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './../Components/Shared/Layout';
import { useNavigate } from 'react-router-dom';
import burgericon from '../assets/Img/pngwing 3.png';
import shendwichicon from '../assets/Img/pngwing 5.png';
import iceicon from '../assets/Img/pngwing 6.png';
import juiceicon from '../assets/Img/pngwing 11.png';
import friesicon from '../assets/Img/pngwing 7.png';
import AddCategoryModal from '../Components/Shared/AddCategoryModal';
import burgerimg from '../assets/Img/Group 1000006124.jpg';
import moreIcon from '../assets/icons/3dot.svg'; 

const categories = [
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
  const navigate = useNavigate();

  const handleAddItem = () => { navigate('/add-item') };
  // const handleAddOrder = ()=>{navigate('/customer-percel')}
  




  useEffect(() => {
    // Fetch items from the backend API
    axios.get('http://localhost:3229/api/additem')
      .then(response => {
        setItems(response.data);
        setFilteredItems(response.data); 
        console.log(response.data) 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filterItems = (category) => {
    // Filter items based on the selected category
    if (category === 'All') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === category));
    }
    setSelectedCategory(category); 
  };
  

  const handleAddCategory = () => {
    setIsModalVisible(true);
  };

  const handleSaveCategory = (newCategory) => {
    categories.push(newCategory);
    setIsModalVisible(false);

  };

  const handleEdit = (itemId) => {
    navigate(`/edit-item/${itemId}`);
  };


  const handleDelete = (itemId) => {
    // Add delete functionality here
    console.log('Delete item with ID:', itemId);

  };

  const toggleDropdown = (itemId) => {
    setDropdownVisible(dropdownVisible === itemId ? null : itemId);
  };

  // const [selectedItem, setSelectedItem] = useState(null);
  // const handleOrderClick = (item) => {
  //   setSelectedItem(item);
  // };

  const handleAddOrder = (item) => {
    navigate('/item-details', { state: { item } });
    // navigate(`/item-details/${item.id}`);

  };

  return (
    <Layout>
  <div className="p-4 bg-mainbg ">
    <div className="bg-secondary p-4">
      {/* Categories Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h5 className=" sm:text-xl text-yellow-500 md:text-4xl">Categories</h5>
        <button
  type="button"
  className="rounded-lg bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-500 hover:to-yellow-500 w-full md:w-1/6 h-12 mt-2 md:mt-0 transition-all text-black font-semibold hover:text-xl"
  onClick={handleAddCategory}
>
  + Add Category
</button>

      </div>

      {/* Categories Buttons */}
      <div className="w-full flex flex-wrap justify-center md:justify-start">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`bg-accent px-4   m py-2 m-2 rounded-lg ${
              selectedCategory === category.name ? 'bg-yellow-500 text-black text-2xl'  : ''
            }`}
            onClick={() => filterItems(category.name)}
          >
            {category.icon && (
              <img
                src={category.icon}
                alt={category.name}
                className="w-6 h-6 md:w-10 md:h-10 inline-block mr-2"
              />
            )}
            {category.name}
          </button>
        ))}
      </div>

      {/* Add Item Button */}
      <div className="w-full flex justify-center md:justify-end">
        <button
          className="rounded-lg bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-500 hover:to-yellow-500  md:w-1/6 h-12 mt-2 md:mt-0 transition-all text-black font-semibold hover:text-xl"
          onClick={handleAddItem}
        >
          + Add Item
        </button>
      </div>
    </div>

    {/* Item List */}
    <div className="flex flex-wrap justify-center bg-secondary p-4">
      {filteredItems.map((item) => (
        <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-4 relative">
          <div className="bg-accent p-4 rounded-lg">
            <div className="relative">
              {item.discount && (
                <span className="absolute top-0 left-0 bg-yellow-500 text-white px-2 py-1 rounded-tr-lg rounded-bl-lg">
                  {item.discount}% Off
                </span>
              )}
             <img
  src={item.itemImage && item.itemImage.startsWith('uploads/')
        ? `http://localhost:3229/${item.itemImage}` // Prepend server URL for 'uploads/' images
        : item.itemImage || '/uploads/placeholder.jpg'} // Use the HTTP URL, or fallback to a placeholder image
  alt={item.itemName || 'No Image Available'}
  className="w-full h-32 md:h-48 object-cover rounded-t-lg shadow-xl"
/>

              
              <img
                src={moreIcon}
                alt="More options"
                className="absolute top-2 right-2 w-4 h-4 md:w-6 md:h-6 cursor-pointer"
                onClick={() => toggleDropdown(item.itemId)}
              />

              {dropdownVisible === item.id && (
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
              <h3 className="text-lg text-yellow-400  hover:text-xl  font-semibold">{item.itemName}</h3>
              <h3 className="text-white text-sm">{item.description}</h3>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-semi
                bold text-white">₹{item.itemPrice}</span>
                <span
                  className={`w-4 h-4 rounded-full ${
                    item.isVeg ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                <button type='button' className=' rounded-md shadow  p-1 bg-gradient-to-r from-yellow-500 to-blue-400 hover:from-yellow-500 hover:to-yellow-400 hover:text-black font-semibold'
                 onClick={() => handleAddOrder(item)}
                >Order</button>
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
