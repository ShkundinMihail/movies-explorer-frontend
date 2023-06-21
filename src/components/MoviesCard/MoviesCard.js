import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';
import addFavorites from '../../images/save9.svg';
import addFavoritesActive from '../../images/save9d.svg';
import deleteCard from '../../images/deleteCard.svg';

const MoviesCard = ({ image, title, time }) => {
    const [addFavoritesState, setAddFavoritesState] = React.useState(addFavorites);
    const location = useLocation();

    const toHoursAndMinutes = (time) => {
        const minutes = time % 60;
        const hours = Math.floor(time / 60);
        return `${padTo2Digits(hours)}ч ${padTo2Digits(minutes)}м`;
    };

    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    };

    const addFavoritesHandler = () => {
        if (addFavoritesState === addFavoritesActive) {
            setAddFavoritesState(addFavorites);
        } else {
            setAddFavoritesState(addFavoritesActive);
        }
    };

    return (
        <div className="movies-card">
            <div className="movies-card__container-info">
                <div className="movies-card__container-text">
                    <h3 className="movies-card__title">{title}</h3>
                    <p className="movies-card__time">{toHoursAndMinutes(time)}</p>
                </div>
                <button className="movies-card__button"
                    onClick={location.pathname === '/movies' ? addFavoritesHandler : undefined}
                >
                    <img className="movies-card__button-image"
                        src={location.pathname === '/movies' ? addFavoritesState : deleteCard} alt='button card' />
                </button>
            </div>
            <img className="movies-card__image" src={image} alt={title} />
        </div>
    );
};

export default MoviesCard;
