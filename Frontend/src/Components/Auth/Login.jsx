import { useState } from 'react';
import bg from '../../assets/Img/restobg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Img/Group.png';
import axios from 'axios';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate('/profile');
    // try {
    //   const response = await axios.post('http://localhost:3229/api/auth/login', { email, password });
    //   if (response.data.success) {
    //     alert('Login successful');
       
    //   } else {
    //     setError(response.data.message);
    //   }
    //   console.log("login sussfully")
    // } catch (err) {
    //   setError('An error occurred. Please try again.');
    //   console.log("login error")
    // }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row">
      <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bg})`, filter: 'blur(8px)' }}></div>

      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-opacity-0 p-8 rounded-lg shadow-lg">
        <div className="w-full max-w-2xl bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="email">Email or Phone*</label>
              <input
                type="text"
                id="email"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your Email or Phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2" htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="inline-flex items-center text-white">
                <input type="checkbox" className="form-checkbox text-yellow-500" />
                <span className="ml-2">Remember Me</span>
              </label>
              <Link to="/forgetpassword" className="text-sm text-yellow-500 hover:text-yellow-700">Forgot Password?</Link>
            </div>
            <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              Login
            </button>
          </form>
          <p className="text-white text-sm mt-4">
            Dont have an account? <Link to="/register" className="text-yellow-500 hover:text-yellow-700">Register</Link>
          </p>
        </div>
      </div>

      <div className="relative hidden md:flex w-full md:w-1/2 flex-col items-center justify-center text-center text-white p-8 bg-opacity-90">
        <div className='flex gap-4 items-center'>
          <img src={logo} alt="Restaurants Logo" className="w-28 h-28 mb-4" />
          <h2 className="text-3xl font-bold text-orange-400 ">Restaurants</h2>
        </div>
        <p className="italic mb-4">Your Tagline</p>
        <p className="max-w-md">
          Aenean blandit id nisl et pretium. Sed efficitur lectus ipsum,
          <p className='text-orange-300 font-sans text-3xl'>ac dapibus turpis auctor.
          </p>
        </p>
      </div>
    </div>
  );
}
