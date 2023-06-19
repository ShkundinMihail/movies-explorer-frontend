import React from 'react';
import './Header.css';
import logo from '../../images/logo.png'
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

const Header = ({ handleOpenMenu, loggedIn}) => {

    return (
        <header className="header">
            <Link to='/' className='header__link'><img className='header__logo' src={logo} alt="logo" /></Link>
            <Navigation handleOpenMenu={handleOpenMenu} loggedIn={loggedIn}/>
        </header>
    )
};

export default Header;