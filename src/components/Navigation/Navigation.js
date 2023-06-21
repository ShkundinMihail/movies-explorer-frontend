import React from 'react';
import './Navigation.css';
import burger from '../../images/icon__COLOR_icon-main.svg'
import { Link } from 'react-router-dom';
import AccountButton from '../AccountButton/AccountButton';
import useResize from 'use-resize';

const Navigation = ({ handleOpenMenu, loggedIn }) => {
    const windowWidth = useResize().width;

    return (
        <> {(loggedIn && windowWidth >= 1280) ? <div className='nav-container-left'>
            <>
                <Link to='/movies' className='nav-container-left__navlink nav-container-left__navlink_weight'>Фильмы</Link>
                <Link to='/saved-movies' className='nav-container-left__navlink nav-container-left__navlink_position'>Сохранённые фильмы</Link>
            </>
        </div> : ''}
            <div className='nav-container-right'>
                {loggedIn ?
                    <>
                        {(windowWidth >= 1280) ? <AccountButton/> :
                            <button className='nav-container-right__burger' onClick={handleOpenMenu}><img className='nav-container-right__burger-img' src={burger} alt='burger' /></button>}
                    </>
                    :
                    <>
                        <Link to='/signup' className='nav-container-right__register'>Регистрация</Link>
                        <Link to='/signin' className='nav-container-right__login'>Войти</Link>
                    </>

                }
            </div>
        </>
    )
}

export default Navigation;
