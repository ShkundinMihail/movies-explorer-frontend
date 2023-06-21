import React from 'react';
import './NavTab.css';

const NavTab = () => {
 return (
    <div className="nav-tab">
        <a href='#about-project' className='nav-tab__link'>О проекте</a>
        <a href='#techs' className='nav-tab__link'>Технологии</a>
        <a href='#student' className='nav-tab__link'>Студент</a>
    </div>
 )
};

export default NavTab;
