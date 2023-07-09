import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { CYRILLIC_REGEX, SCREEN_WIDTH_1280, SCREEN_WIDTH_768, DURATION_SHORT_FILM } from '../../utils/constants';

const SavedMovies = ({ windowWidth, shortFilmsCheckbox, setShortFilmsCheckbox, numberFilms, setNumberFilms, savedFilms, infoTextSavedMovies, setInfoTextSavedMovies, preloader, deleteUsersFilm, setSavedFilms, searchText, setSearchText }) => {

    const [shortsSavedFilms, setShortsSavedFilms] = React.useState([]);
    React.useEffect(() => {
        setInfoTextSavedMovies('У вас нет сохранненных фильмов');
        setShortsSavedFilms(savedFilms.filter(({ duration }) => duration <= DURATION_SHORT_FILM))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        if (!shortFilmsCheckbox && (savedFilms.length === 0 || (savedFilms.length <= 12 && windowWidth >= SCREEN_WIDTH_1280) || (savedFilms.length <= 8 && windowWidth > SCREEN_WIDTH_768 && windowWidth < SCREEN_WIDTH_1280) || (savedFilms.length <= 5 && windowWidth < SCREEN_WIDTH_768) || (savedFilms.length <= numberFilms))) {
            return 'saved-movies__button-more saved-movies__button-more_hidden'
        } else if (shortFilmsCheckbox && ((shortsSavedFilms.length === 0 || (shortsSavedFilms.length <= 12 && windowWidth >= SCREEN_WIDTH_1280) || (shortsSavedFilms.length <= 8 && windowWidth > SCREEN_WIDTH_768 && windowWidth < SCREEN_WIDTH_1280) || (shortsSavedFilms.length <= 5 && windowWidth < SCREEN_WIDTH_768) || (shortsSavedFilms.length <= numberFilms)))) {
            return 'saved-movies__button-more saved-movies__button-more_hidden'
        } else {
            return 'saved-movies__button-more'
        }
    };
    const handleFilms = () => {
        localStorage.setItem('searchText', searchText);
        if (!shortFilmsCheckbox) {
            if (savedFilms.length > 0) {
                if (CYRILLIC_REGEX.test(String(searchText).toLowerCase())) {
                    setSavedFilms(savedFilms.filter(({ nameRU }) => nameRU.toLowerCase().includes(searchText.toLowerCase())));
                } else {
                    setSavedFilms(savedFilms.filter(({ nameEN }) => nameEN.toLowerCase().includes(searchText.toLowerCase())));
                }
            } else if (savedFilms.length === 0) {
                setInfoTextSavedMovies('Ничего не найдено');
            }
        } else if (shortFilmsCheckbox) {
            setShortsSavedFilms(savedFilms.filter(({ duration }) => duration <= DURATION_SHORT_FILM))
            if (shortsSavedFilms.length > 0) {
                if (CYRILLIC_REGEX.test(String(searchText).toLowerCase())) {
                    setShortsSavedFilms(shortsSavedFilms.filter(({ nameRU }) => nameRU.toLowerCase().includes(searchText.toLowerCase())));
                    if (shortFilmsCheckbox.length === 0) { setInfoTextSavedMovies('Ничего не найдено'); }
                } else {
                    setShortsSavedFilms(shortsSavedFilms.filter(({ nameEN }) => nameEN.toLowerCase().includes(searchText.toLowerCase())));
                    if (shortFilmsCheckbox.length === 0) { setInfoTextSavedMovies('Ничего не найдено'); }
                }
            } else if (shortsSavedFilms.length === 0) {
                setInfoTextSavedMovies('Ничего не найдено');
            }
        }
    }


    return (
        <section className='saved-movies'>
            <SearchForm searchText={searchText} setSearchText={setSearchText} handleFilms={handleFilms} shortFilmsCheckbox={shortFilmsCheckbox} setShortFilmsCheckbox={setShortFilmsCheckbox} />
            {preloader ? <Preloader /> :
                <>
                    {(savedFilms === null || savedFilms.length === 0) ? <p className='saved-movies__info-text'>{infoTextSavedMovies}</p> :
                        <>
                            <MoviesCardList movies={!shortFilmsCheckbox ? savedFilms : shortsSavedFilms} numberFilms={numberFilms} savedFilms={savedFilms} deleteUsersFilm={deleteUsersFilm} />
                            <button className={moreFilmsButtonVisible()} onClick={handleMoreFilms}>Ещё</button>
                        </>}
                </>}
        </section>
    )
};

export default SavedMovies;