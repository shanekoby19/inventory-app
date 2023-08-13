import { NavLink } from "react-router-dom";

import '../styles/components/Navigation.scss';

const Navigation = () => {
    return (
        <nav className='nav'>
            <NavLink
                to="/home" 
                className='nav__item'
            >Home</NavLink>
        </nav>
    )
}

export default Navigation;