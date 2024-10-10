import { useState } from 'react';
import bg from '../../assets/Img/restobg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



export function Registration() {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    state: '',
    city: '',
    selectedRestaurant: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  };
  const navigate=useNavigate();

  const [formData, setformData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setformData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    navigate('/')

    try {
      const response = await axios.post('http://localhost:3229/api/auth/register', formData);
      setSuccess('Registration successful! Redirecting...');
      console.log(response.data); // Handle response as needed
      // Optionally, redirect or handle success
    } catch (error) {
      setError(error.response.data.message || 'An error occurred during registration');
      console.log('friemterror')
    }
  };



  console.log('formdata', formData)
  const countries = ['Country A', 'Country B', 'Country C'];
  const states = ['State A', 'State B', 'State C'];
  const cities = ['City A', 'City B', 'City C'];
  const restaurants = ['Restaurant A', 'Restaurant B', 'Restaurant C'];

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-gray-900 shadow-lg">
      <div
        className="absolute inset-0 bg-center bg-cover bg-transparent"
        style={{ backgroundImage: `url(${bg})`, filter: 'blur(5px)' }}
      ></div>
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-opacity-90 p-8 rounded-lg shadow-lg">
        <div className="w-full max-w-2xl rounded-md shadow-lg bg-slate-900 opacity-90">
          <h1 className="text-3xl text-white mb-6 text-center">Registration</h1>
          <form >
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 m-8">
              <div>
                <label className="block text-white mb-2">First Name</label>
                <input
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Last Name</label>
                <input
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
            <div className="mb-4 m-8">
              <label className="block text-white mb-2">Email Address</label>
              <input
                className="w-full p-2 rounded bg-secondary border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
              />
            </div>
            <div className="mb-4 m-8">
              <label className="block text-white mb-2">Phone Number</label>
              <input
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 m-8">
              <div>
                <label className="block text-white mb-2">Country</label>
                <select
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option>Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white mb-2">State</label>
                <select
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option>Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white mb-2">City</label>
                <select
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option>Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4 m-8">
              <label className="block text-white mb-2">Select Restaurant</label>
              <select
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                name="selectedRestaurant"
                value={formData.selectedRestaurant}
                onChange={handleChange}
              >
                <option>Select Restaurant</option>
                {restaurants.map((restaurant, index) => (
                  <option key={index} value={restaurant}>
                    {restaurant}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 m-8">
              <label className="block text-white mb-2">Password</label>
              <input
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>
            <div className="mb-4 m-8">
              <label className="block text-white mb-2">Confirm Password</label>
              <input
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </div>
            <div className="mb-4 m-8">
              <label className="block text-white mb-2">Terms and Conditions</label>
              <div className="flex items-center">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-200">I agree to the terms and conditions.</span>
              </div>
            </div>
            {error && <p className="text-red-500 m-8">{error}</p>}
            {success && <p className="text-green-500 m-8">{success}</p>}
            <div className="text-center m-8">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>
            <div className="text-center m-8">
              <Link to="/" className="text-yellow-500 hover:text-yellow-600">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
