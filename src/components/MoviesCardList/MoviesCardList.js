import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard.js';
import { useLocation } from 'react-router-dom';


const MoviesCardList = ({ numberFilms, movies, addFilmToUser, savedFilms, deleteUsersFilm }) => {
    const locationMovies = useLocation().pathname === '/movies';
    return (
        <div className="movies-card-list">
            {movies.slice(0, numberFilms).map(item => (
                < MoviesCard
                    duration={item.duration}
                    key={locationMovies ? item.id : item._id}
                    nameRU={item.nameRU}
                    image={item.image}
                    addFilmToUser={addFilmToUser}
                    country={item.country}
                    director={item.director}
                    year={item.year}
                    description={item.description}
                    trailerLink={item.trailerLink}
                    movieId={locationMovies ? item.id : item.movieId}
                    nameEN={item.nameEN}
                    savedFilms={savedFilms}
                    locationMovies={locationMovies}
                    deleteUsersFilm={deleteUsersFilm}
                />
            ))
            }
        </div>
    )
};

export default MoviesCardList;
