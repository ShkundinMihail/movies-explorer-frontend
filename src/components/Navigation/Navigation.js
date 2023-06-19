import React from 'react';
import './Navigation.css';
import burger from '../../images/icon__COLOR_icon-main.png'
import { Link } from 'react-router-dom';
import AccountButton from '../AccountButton/AccountButton';
import useResize from 'use-resize';

const Navigation = ({ handleOpenMenu, loggedIn }) => {
    const windowWidth = useResize().width;

    return (
        <> {(loggedIn && windowWidth >= 1280) ? <div className='navigation__container-left'>
            <>
                <Link to='/movies' className='navigation__navlink navigation__navlink_weight'>Фильмы</Link>
                <Link to='/saved-movies' className='navigation__navlink navigation__navlink_position'>Сохранённые фильмы</Link>
            </>
        </div> : ''}
            <div className='navigation__container-right'>
                {loggedIn ?
                    <>
                        {(windowWidth >= 1280) ? <AccountButton/> :
                            <button className='navigation__burger' onClick={handleOpenMenu}><img className='navigation__burger-img' src={burger} alt='burger' /></button>}
                    </>
                    :
                    <>
                        <Link to='/signup' className='navigation__register'>Регистрация</Link>
                        <Link to='/signin' className='navigation__login'>Войти</Link>
                    </>

                }
            </div>
        </>
    )
}

export default Navigation;
