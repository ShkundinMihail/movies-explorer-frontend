import React from 'react';
import useResize from 'use-resize';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import { Circles } from 'react-loader-spinner';
import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({ filmdb }) => {
    const windowWidth = useResize().width;
    const preloader = false;
    const [numberFilms, setNumberFilms] = React.useState(0);

    const moreFilms = () => {
        if (windowWidth >= 1280) {
            setNumberFilms(numberFilms + 3)
        } else if (windowWidth > 767 && windowWidth < 1280) {
            setNumberFilms(numberFilms + 2)
        } else {
            setNumberFilms(numberFilms + 1)
        }
    }

    React.useEffect(() => {
        if (windowWidth >= 1280) {
            setNumberFilms(12)
        } else if (windowWidth > 767 && windowWidth < 1280) {
            setNumberFilms(8)
        } else {
            setNumberFilms(5)
        }
    }, [windowWidth]);

    return (
        <section className='movies'>
            <SearchForm />
            {preloader && < Circles type="ThreeDots" color="#2BE080" height={120} width={120} />}
            {preloader && <Preloader />}
            <MoviesCardList numberFilms={numberFilms} filmdb={filmdb} />
            <button className='movies__button-more' onClick={moreFilms}>Ещё</button>
        </section>
    );
};

export default Movies;