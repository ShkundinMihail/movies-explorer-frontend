import React from 'react';
import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard.js';


const MoviesCardList = ({ numberFilms, filmdb }) => {

    return (
        <section className="movies-card-list">
            {filmdb.slice(0, numberFilms).map(item => (
                <MoviesCard
                    time={item.duration}
                    key={item._id}
                    title={item.nameRU}
                    image={item.image}
                />
            ))
            }
        </section>
    )
};

export default MoviesCardList;
