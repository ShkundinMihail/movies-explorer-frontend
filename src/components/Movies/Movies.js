import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';
import { CYRILLIC_REGEX, SCREEN_WIDTH_1280,SCREEN_WIDTH_768, DURATION_SHORT_FILM } from '../../utils/constants';

const Movies = ({ windowWidth, shortFilmsCheckbox, setShortFilmsCheckbox, numberFilms, setNumberFilms, addFilmToUser, setPreloader, preloader, savedFilms, setSavedFilms, deleteUsersFilm, searchText, setSearchText, infoText, setInfoText, searchResult, setSearchResult }) => {

    const handleMoreFilms = () => {
        if (windowWidth >= SCREEN_WIDTH_1280) {
            setNumberFilms(numberFilms + 3)
        } else if (windowWidth > SCREEN_WIDTH_768 && windowWidth < SCREEN_WIDTH_1280) {
            setNumberFilms(numberFilms + 2)
        } else {
            setNumberFilms(numberFilms + 1)//Если карточки уже были отображены на странице в блоке результатов, клик по чекбоксу «Короткометражки» приводит к повторной фильтрации результата.
            
        }
    };

    const moreFilmsButtonVisible = () => {
        if (searchResult.length === 0 || (searchResult.length <= 12 && windowWidth >= SCREEN_WIDTH_1280) || (searchResult.length <= 8 && windowWidth > SCREEN_WIDTH_768 && windowWidth < SCREEN_WIDTH_1280) || (searchResult.length <= 5 && windowWidth < SCREEN_WIDTH_768) || (searchResult.length <= numberFilms)) {
            return 'movies__button-more movies__button-more_hidden'
        } else {
            return 'movies__button-more'
        }
    };

    const handleFilms = () => {
        setPreloader(true);
        localStorage.setItem('searchText', searchText);
        let data
        getMovies()
            .then((res) => {
                if (CYRILLIC_REGEX.test(String(searchText).toLowerCase())) {
                    data = res.filter(({ nameRU }) => nameRU.toLowerCase().includes(searchText.toLowerCase()));
                } else {
                    data = res.filter(({ nameEN }) => nameEN.toLowerCase().includes(searchText.toLowerCase()));
                }
                if (shortFilmsCheckbox) {
                    data = data.filter(({ duration }) => duration <= DURATION_SHORT_FILM)
                }
                if (data.length === 0) {
                    setSearchResult([]);
                    localStorage.setItem('movies', []);
                    setInfoText('Ничего не найдено');
                } else {
                    localStorage.setItem('movies', JSON.stringify(data));
                    setSearchResult(data);
                };
            })
            .catch(() => {
                localStorage.setItem('movies', []);
                setSearchResult([]);
                setInfoText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
            })
            .finally(() => {
                setPreloader(false);
            })
    };

    return (
        <div className='movies'>
            <SearchForm searchText={searchText} setSearchText={setSearchText} handleFilms={handleFilms} shortFilmsCheckbox={shortFilmsCheckbox} setShortFilmsCheckbox={setShortFilmsCheckbox} />
            {preloader ? <Preloader /> :
                <>
                    {(searchResult === null || searchResult.length === 0) ? <p className='movies__info-text'>{infoText}</p> :
                        <>
                            <MoviesCardList numberFilms={numberFilms} movies={searchResult} addFilmToUser={addFilmToUser} savedFilms={savedFilms} setSavedFilms={setSavedFilms} deleteUsersFilm={deleteUsersFilm} />
                            <button className={moreFilmsButtonVisible()} onClick={handleMoreFilms}>Ещё</button>
                        </>}

                </>}
        </div>
    );
};

export default Movies;