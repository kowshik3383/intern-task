import React from 'react';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';

const Home = () => {
  return (
   <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
         
        </div>
      </div>
      <div className="flex-1"></div>
    </>
  );
};

export default Home;
