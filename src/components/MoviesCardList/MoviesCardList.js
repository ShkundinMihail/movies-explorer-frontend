import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard.js';


const MoviesCardList = ({ numberFilms, filmdb }) => {

    return (
        <div className="movies-card-list">
            {filmdb.slice(0, numberFilms).map(item => (
                <MoviesCard
                    time={item.duration}
                    key={item._id}
                    title={item.nameRU}
                    image={item.image}
                />
            ))
            }
        </div>
    )
};

export default MoviesCardList;
