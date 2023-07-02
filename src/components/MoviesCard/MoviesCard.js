import React from "react";
import './MoviesCard.css';
import addFavorites from '../../images/save9.svg';
import addFavoritesActive from '../../images/save9d.svg';
import deleteCard from '../../images/deleteCard.svg';
import { MOVIE_URL } from "../../utils/constants";

const MoviesCard = ({ image, nameRU, duration, addFilmToUser, country, director, year, description, trailerLink, movieId, nameEN, savedFilms, locationMovies, deleteUsersFilm }) => {
    const isFavorite = locationMovies ? savedFilms.some(item => { return item.movieId === movieId }) : false;
    const [id, setId] = React.useState('');

    React.useEffect(() => {
        savedFilms.forEach(item => {
            if (item.movieId === movieId) {
                setId(item._id)
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toHoursAndMinutes = (time) => {
        const minutes = time % 60;
        const hours = Math.floor(time / 60);
        return `${padTo2Digits(hours)}ч ${padTo2Digits(minutes)}м`;
    };
    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    };

    const handlerCardButton = () => {
        if (locationMovies && !isFavorite) {
            addFilmToUser({ country: country, director: director, duration: duration, year: year, description: description, image: MOVIE_URL + image.url, trailerLink: trailerLink, thumbnail: MOVIE_URL + image.url, movieId: movieId, nameRU: nameRU, nameEN: nameEN })
        } else if ((locationMovies && isFavorite) || !locationMovies) {
            deleteUsersFilm(id)
        }
    };
    return (
        <div className="movies-card">
            <div className="movies-card__container-info">
                <div className="movies-card__container-text">
                    <h3 className="movies-card__title">{nameRU}</h3>
                    <p className="movies-card__time">{toHoursAndMinutes(duration)}</p>
                </div>
                <button className="movies-card__button"
                    onClick={handlerCardButton}
                >
                    <img className="movies-card__button-image"
                        src={locationMovies ? (isFavorite ? addFavoritesActive : addFavorites) : deleteCard} alt={locationMovies ? 'добавить' : 'удалить'} />
                </button>
            </div>
            <a className="movies-card__trailer-link" href={trailerLink} target="__blank">
                <img className="movies-card__image" src={locationMovies ? (MOVIE_URL + image.url) : image} alt={`Кард из фильма ${nameRU}`} />
            </a>
        </div>
    );
};

export default MoviesCard;
