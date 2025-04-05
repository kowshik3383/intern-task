import React from 'react';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';
import Patient from './Patient';



const Pa = () => {
  return (
   <>
	  <div className="flex">
		<Sidebar />
		<div className="flex-1">
		  <Navbar />
	  <Patient/>
		</div>
	  </div>
	  <div className="flex-1"></div>
	</>
  );
};

export default Pa;
