import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import SideMenu from './SideMenu';

function MainLayout() {
  return (
    <div className='px-4 py-2 w-full h-full'>

      <div className='w-full h-full m-0 mb-4'>
        <Header />
      </div>

      <div className='h-full flex w-full'>
        <div className='me-4 '>
          <SideMenu />
        </div>
        <div className='w-full'>
          <Outlet />
        </div>
      </div>

      <div className='w-full h-full'><Footer /></div>
    </div>
  );
}

export default MainLayout;