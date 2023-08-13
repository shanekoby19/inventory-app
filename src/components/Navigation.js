import { NavLink } from "react-router-dom";

import '../styles/components/Navigation.scss';

const Navigation = () => {
    return (
        <nav className='nav'>
            <div className='nav__items'>
                <NavLink
                    to="/" 
                    className='nav__item'
                >Manage</NavLink>
                <NavLink
                    to="/reports" 
                    className='nav__item'
                >Reports</NavLink>
            </div>

            <div className='nav__icon'>
            </div>
        </nav>
    )
}

export default Navigation;