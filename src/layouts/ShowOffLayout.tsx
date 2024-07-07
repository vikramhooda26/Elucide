import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function ShowOffLayout() {
    return (
        <div className=''>
            <div className='w-full h-full m-0 mb-4'> <Header /></div>
            <div className=''>
                <div><Outlet /></div>
            </div>
            <div className=''><Footer /></div>
        </div>
    )
}

export default ShowOffLayout