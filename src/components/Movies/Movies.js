import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import Preloader from '../Preloader/Preloader.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMovies } from '../../utils/MoviesApi';
import { CYRILLIC_REGEX, SCREEN_WIDTH_1280, SCREEN_WIDTH_768, DURATION_SHORT_FILM, ALL_MOVIES_FROM_LOCAL_STORAGE, STATUS_SHORT_FILMS_CHECKBOX_FROM_LOCAL_STORAGE, SEARCH_TEXT_FROM_LOCAL_STORAGE,} from '../../utils/constants';

const Movies = ({ windowWidth, addFilmToUser, setPreloader, preloader, savedFilms, setSavedFilms, deleteUsersFilm, infoText, setInfoText, searchResult, setSearchResult }) => {
    const [shortFilmsCheckbox, setShortFilmsCheckbox] = React.useState(STATUS_SHORT_FILMS_CHECKBOX_FROM_LOCAL_STORAGE === 'true' ? true : false);
    const [searchText, setSearchText] = React.useState(SEARCH_TEXT_FROM_LOCAL_STORAGE);
    const [numberFilms, setNumberFilms] = React.useState(0);

    React.useEffect(() => {
        if (windowWidth >= SCREEN_WIDTH_1280) {
            setNumberFilms(12)
        } else if (windowWidth > SCREEN_WIDTH_768 && windowWidth < SCREEN_WIDTH_1280) {
            setNumberFilms(8)
        } else {
            setNumberFilms(5)
        }
    }, [windowWidth]);

    const handleMoreFilms = () => {
        if (windowWidth >= SCREEN_WIDTH_1280) {
            setNumberFilms(numberFilms + 3)
        } else if (windowWidth > SCREEN_WIDTH_768 && windowWidth < SCREEN_WIDTH_1280) {
            setNumberFilms(numberFilms + 2)
        } else {
            setNumberFilms(numberFilms + 1)

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
        if (!ALL_MOVIES_FROM_LOCAL_STORAGE) {
            getMovies()
                .then((res) => {
                    localStorage.setItem('allMovies', JSON.stringify(res));
                    movieSearchLogic(res);
                })
                .catch((err) => {
                    localStorage.setItem('movies', []);
                    setSearchResult([]);
                    setInfoText(`Во время запроса произошла ошибка ${err.message}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`);
                })
                .finally(() => {
                    setPreloader(false);
                });
        } else {
            const allMovies = JSON.parse(ALL_MOVIES_FROM_LOCAL_STORAGE);
            movieSearchLogic(allMovies);
            setPreloader(false);
        }
    };
    const movieSearchLogic = (object) => {
        let data
        if (CYRILLIC_REGEX.test(String(searchText).toLowerCase())) {
            data = object.filter(({ nameRU }) => nameRU.toLowerCase().includes(searchText.toLowerCase()));
        } else {
            data = object.filter(({ nameEN }) => nameEN.toLowerCase().includes(searchText.toLowerCase()));
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