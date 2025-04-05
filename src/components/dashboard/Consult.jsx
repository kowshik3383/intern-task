import React from 'react';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';
import Consultation from './Consultation';


const Consult = () => {
  return (
   <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
         <Consultation/>
        </div>
      </div>
      <div className="flex-1"></div>
    </>
  );
};

export default Consult;
