import React from 'react'
import Header from './Header';
import SideMenu from './SideMenu';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function MainLayout() {
  return (
    <div className='px-4 py-2 w-full h-full'>
      <div className='w-full h-full m-0 mb-4'> <Header /></div>
      <div className='h-screen flex w-full'>
        <div className='me-4 w-1/6'> <SideMenu /></div>
        <div> <Outlet /></div>
      </div>
      <div className='w-full h-full'><Footer /></div>
    </div>
  );
}

export default MainLayout;