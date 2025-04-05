import React from 'react';
import Sidebar from './Sidebar';

import UserList from './UserList';



const Admin2 = () => {
  return (
   <>
	  <div className="flex">
		<Sidebar />
		<div className="flex-1">
   
<UserList/>
	  
		</div>
	  </div>
	  <div className="flex-1"></div>
	</>
  );
};

export default Admin2;
