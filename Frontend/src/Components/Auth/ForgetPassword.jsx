import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bg from '../../assets/Img/restobg.jpg';
import logo from '../../assets/Img/Group.png';

 export function ForgetPassword  () {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track if OTP is sent

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    alert('OTP has been sent to your email.');
    setIsOtpSent(true); // Switch to OTP input stage
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    alert('OTP verified successfully.');
    
  };
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-gray-900 shadow-lg">
      {/* Background with blur and opacity */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-transparent"
        style={{ backgroundImage: `url(${bg})`, filter: 'blur(5px)' }}
      ></div>

      {/* Flex container for the split layout */}
      <div className="relative w-full md:w-1/2 flex items-center justify-center bg-opacity-90 p-8 rounded-lg shadow-lg">
        {/* Left side for the form */}
        <div className="w-full max-w-2xl rounded-md shadow-lg bg-slate-900 opacity-90">
          <h1 className="text-3xl text-white mb-6 text-center">
            {isOtpSent ? 'Enter OTP' : 'Forgot Password'}

          </h1>
          <form onSubmit={isOtpSent ? handleVerifyOTP : handleForgotPassword}>
            {isOtpSent ? (
              <div className="mb-4 m-8">
                <label className="block text-white mb-2" htmlFor="otp">Enter OTP</label>
                <input
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  id="otp"
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
            ) : (
              <div className="mb-4 m-8">
                <label className="block text-white mb-2" htmlFor="email">Enter Email</label>
                <input
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-center justify-between m-8">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {isOtpSent ? 'Verify OTP' : 'Get OTP'}
              </button>
            </div>
          </form>
          {isOtpSent && (
            <p className="mt-4 text-white m-8">
              Didn t receive the OTP? <button onClick={() => setIsOtpSent(false)} className="text-blue-500">Resend OTP</button>
            </p>
          )}
          {!isOtpSent && (
            <p className="mt-4 text-white m-8">
              Remember your password? <Link to="/" className="text-blue-500">Login</Link>
            </p>
          )}
        </div>
      </div>

      {/* Right side for the logo and text */}
      <div className="relative hidden md:flex w-full md:w-1/2 flex-col items-center justify-center text-center text-white p-8 bg-opacity-50 rounded-r-lg">
        <div className="flex gap-4 items-center">
          <img src={logo} alt="Restaurants Logo" className="w-24 h-24 mb-4" />
          <h2 className="text-2xl font-bold" style={{ color: '#DE9739' }}>Restaurants</h2>
        </div>
        <p className="italic mb-4">Your Tagline</p>
        <p className="max-w-md font-barlow">
          Aenean blandit id nisl et pretium. Sed efficitur lectus ipsum, ac dapibus turpis auctor.
        </p>
      </div>
    </div>
  );
}


