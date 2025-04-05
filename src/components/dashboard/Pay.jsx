import React from 'react';
import Sidebar from '../ui/Sidebar';
import Navbar from '../ui/Navbar';
import Patient from './Patient';
import PaymentManager from './Payment';



const Pay = () => {
  return (
   <>
	  <div className="flex">
		<Sidebar />
		<div className="flex-1">
		  <Navbar />
	  <PaymentManager/>
		</div>
	  </div>
	  <div className="flex-1"></div>
	</>
  );
};

export default Pay;
