// import React, { useState } from 'react';
import Sidebar from '../../components/Teacher/Sidebar';
import Header from '../../components/Teacher/Header';
import { Outlet } from 'react-router-dom';

const Home = () => {
  // const [currentPage] = useState('home');

  // const handleNavItemClick = (page: string) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed inset-y-0 left-0">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-64">
        {/* Header */}
        <div className="fixed top-0 right-0 w-[calc(100%-16rem)]">
          <Header />
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto mt-16 p-4">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-200">
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  )
};

export default Home;
