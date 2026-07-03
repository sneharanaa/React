import React, { useEffect, useState } from 'react';
import AddItems from './AddItems';
import Allitems from './Allitems';
import axios from 'axios';

function Adminpanel() {
  const [auth, setAuth] = useState(false);  
  const [view, setView] = useState("add"); 

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/adminroute/logout");
      setAuth(false);
      alert("Logged out successfully!");
      window.location.href = "/adminpanel";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/adminroute")
      .then(res => {
        if (res.data.status === "Success") {
          setAuth(true);  
        } else {
          setAuth(false);
        }
      })
      .catch(err => {
        console.log("Error checking authentication:", err);
        setAuth(false);  
      });
  }, []);

  return (
    <div className="w-full h-screen flex p-3">
      
      <div className="p-3 w-80 rounded-xl bg-zinc-300 text-white fixed h-[700px]">
        <h1 className="font-bold text-blue-500 text-4xl">Admin Panel</h1><br /><br />
        <div className='w-full flex flex-col gap-5'>
          <button
            onClick={() => setView("add")}
            className="font-xl font-semibold cursor-pointer border p-2 text-center rounded bg-red-700"
          >
            Add Items
          </button>
          <button
            onClick={() => setView("all")}
            className="font-xl font-semibold cursor-pointer border p-2 text-center rounded bg-red-700"
          >
            All Items
          </button>
        </div>

        <div className="absolute bottom-5 w-full text-center">
          <button
            className='border p-2 bg-red-700 rounded w-28'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="ml-80 p-5 w-full">
        {view === "add" && <AddItems />}
        {view === "all" && <Allitems />}
      </div>
    </div>
  );
}

export default Adminpanel;
