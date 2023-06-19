import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ filmdb }) => {
    const preloader = false;
    return (
        <section className='saved-movies'>
            <SearchForm />{/* макет сломан, это можно увидеть в фмгме SearchForm по высоте отличается между блоками RESULT__768_MAIN и RESULT_768_SAVED*/}
            {preloader && <Preloader />}
            <MoviesCardList filmdb={filmdb} />
        </section>
    )
};

export default SavedMovies;