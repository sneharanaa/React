import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoArrowUpRight } from "react-icons/go";
import { RiLogoutCircleLine } from "react-icons/ri";
import './Home.css';
import backvideo from '/Background/backvideo.mp4';
import travel from '/travel.gif'; 

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('authtoken')) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('userid');
    setIsLoggedIn(false);
    alert("Logged out successfully!");
    navigate('/login');
  };

  const handlelink = (e) => {
    e.preventDefault(); 
    if (isLoggedIn) {
      navigate('/allcards');
    } else {
      alert("You need to login first!");
      navigate('/login');
    }
  };
  
  const handledata = () => {
    if(isLoggedIn) {
      navigate('/showbooking');
    }
    else {
      alert("You need to login first");
      navigate('/login');
    }
  };

  const handlelogin = () => {
    navigate('/login');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-white bg-opacity-10">
          <img src={travel} alt="Loading..." className="w-[500px] h-[400px]" />
        </div>
      )}

      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={backvideo}
        autoPlay
        loop
        muted
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 backdrop-blur-sm z-10">
        <div className="relative z-20 h-full w-full text-white">
          <div className="w-full flex justify-between items-center p-5">
            <div className="flex items-center space-x-4">
              <div className='flex font-bold'>
                <p>Book</p>
                <p className='bg-red-700 px-1 text-center rounded-lg'>my </p>
                <p> Tr!p</p>
              </div>
            </div>
            <div className="relative w-full flex justify-center text-center text-lg p-1">
              <div className='font-semibold w-80 flex p-2 items-center justify-center gap-5'>
                <Link to="/about" className="relative group hover:underline hover:text-gray-300">About Us</Link>
                <button className='hover:underline relative group hover:text-gray-300' onClick={handledata} to={'/showbooking'}>Your Booking</button>
              </div>
            </div>
            <div className="text-4xl ml-auto relative ">
              {!isLoggedIn ? (
                <button className="group p-2 text-black" onClick={handlelogin} to={'/login'}>
                  <GoArrowUpRight color="black" className="rounded-full bg-white hover:bg-green-500 transition-all duration-300" />
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 p-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Login
                  </span>
                </button>
              ) : (
                <button
                  className="group p-2 text-white"
                  onClick={handleLogout}
                >
                  <RiLogoutCircleLine className='rounded-full transition-all duration-300 hover:text-red-500' />
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 p-1 bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Logout
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className="text-center mt-20">
            <div className="w-full text-5xl relative bg-cover bg-center text-center items-center justify-center">
              <div className="flex flex-col justify-center items-center text-[110px] font-extrabold ">
                <div className='flex gap-5 '>
                  <p className='text1'>Find </p>
                  <p className='text2'>Yourself</p>
                </div>
                <div>
                  <p className='text3'>Outside</p>
                </div>
              </div>
            </div><br />
            <div className="text-3xl text-gray-400 font-semibold tracking-tighter">
              <p>Visit the most </p>
              <p>Beautiful place in the world</p>
            </div>
          </div>
          <div>
            <div className="flex justify-center mt-24">
              <a
                href="/Allcards.jsx"
                onClick={handlelink}
                className="hover:scale-105 font-bold text-center rounded-lg border text-xl px-3 py-1 w-28 text-black bg-white hover:bg-gray-600 transition-all duration-300"
              >
                Let's Go!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
