import { Outlet } from 'react-router-dom';

import Navigation from '../components/Navigation';

import '../styles/pages/Layout.scss';

const Layout = () => {
    return (
        <div className='layout'>
            <Navigation/>
            <main>
                <Outlet className='outlet'/>
            </main>
        </div>
    )
}

export default Layout;