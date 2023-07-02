import React from "react";
import { Link } from "react-router-dom";
import './PopupMenu.css';
import closePopupIcon from '../../images/closePopup.svg';
import AccountButton from "../AccountButton/AccountButton";

const PopupMenu = ({ openMenu, handleCloseMenu }) => {
    const ref = React.useRef();
    return (
        <div className={openMenu ? 'popup-menu popup-menu_opened' : 'popup-menu'}>

            <div className='popup-menu__content' onClick={e => (e.target === e.currentTarget) && handleCloseMenu}>
                <button className="popup-menu__close-button" onClick={handleCloseMenu}>
                    <img src={closePopupIcon} alt="closePopupIcon" />
                </button>
                <div className="popup-menu__container">
                    <Link to='/' className="popup-menu__container-link" onClick={handleCloseMenu}>Главная</Link>
                    <Link to='/movies' className="popup-menu__container-link" onClick={handleCloseMenu}>Фильмы</Link>
                    <Link to='/saved-movies' className="popup-menu__container-link" onClick={handleCloseMenu}>Сохранённые фильмы</Link>
                </div>
                <AccountButton handleCloseMenu={handleCloseMenu} />
            </div>
        </div>
    )
};

export default PopupMenu;
