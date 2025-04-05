import React from 'react';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';
import Help from './Help';



const Helps = () => {
  return (
   <>
	  <div className="flex">
		<Sidebar />
		<div className="flex-1">
		  <Navbar />
	  <Help/>
		</div>
	  </div>
	  <div className="flex-1"></div>
	</>
  );
};

export default Helps;
