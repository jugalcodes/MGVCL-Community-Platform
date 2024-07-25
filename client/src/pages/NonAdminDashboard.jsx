import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
// import DashUsers from '../components/DashUsers'
// import DashComments from '../components/DashComments';
// import DashboardComp from '../components/DashboardComp';

export default function NonAdminDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen ">
      <div className="w-full md:w-56">
        <DashSidebar />
      </div>
      <div className="flex-grow flex p-4">

        {/* profile  */}
        {tab === 'profile' && <DashProfile />}

        {/* posts  */}
        {tab === 'posts' && <DashPosts />}

        {/* users
        {tab === 'users' && <DashUsers />} */}

        {/* comments 
        {tab === 'comments' && <DashComments />} */}

        {/* dashboard component 
        {tab === 'dash' && <DashboardComp />} */}
      </div>
    </div>
  );
}
