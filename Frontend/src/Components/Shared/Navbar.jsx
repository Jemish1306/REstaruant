 //Restaurant/src/Components/Shared/Navbar.jsx
import { Navigate, useNavigate } from 'react-router-dom'
import profileImg from '../../assets/Img/jemish.png'

 
 
 const Navbar =()=>{

 const nevigate=useNavigate();

 const handlenavigate=()=>{
  nevigate('/profile')
 }


    return(
      <header className="flex justify-between items-center p-4 bg-mainbg text-white shadow-md">
      <div>
        <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
        <p className="text-gray-400">Jds Restro</p>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search Here Your Delicious Food..."
          className="p-2 rounded-xl bg-secondary text-white"
        />
        <div className="flex items-center ml-4">
          <span>Musabbir Hossain</span>
          <img src={profileImg} alt="Profile" className="rounded-full w-8 h-8 ml-2" onClick={handlenavigate} />
        </div>
      </div>
    </header>

    )
 }
 export default Navbar