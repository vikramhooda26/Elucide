import React from 'react'
import Header from './Header';
import SideMenu from './SideMenu';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function MainLayout() {
  return (
    <div className='px-4 py-2'>
      <div> <Header /></div>
      <div className='h-screen'>
        <div> <SideMenu /></div>
        <div> <Outlet /></div>
      </div>
      <div><Footer /></div>
    </div>
  );
}

export default MainLayout;