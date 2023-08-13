import { Outlet } from 'react-router-dom';

import Navigation from '../components/Navigation';

import '../styles/pages/Layout.scss';

const Layout = () => {
    return (
        <body>
            <Navigation/>
            <main>
                <Outlet/>
            </main>
        </body>
    )
}

export default Layout;