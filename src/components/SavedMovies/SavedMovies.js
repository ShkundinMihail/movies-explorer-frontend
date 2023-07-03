import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { CYRILLIC_REGEX } from '../../utils/constants';

const SavedMovies = ({ windowWidth, shortFilmsCheckbox, setShortFilmsCheckbox, numberFilms, setNumberFilms, savedFilms, infoTextSavedMovies, setInfoTextSavedMovies, preloader, deleteUsersFilm, setSavedFilms, searchText, setSearchText }) => {

    const [shortsSavedFilms, setShortsSavedFilms] = React.useState([]);
    React.useEffect(() => {
        setInfoTextSavedMovies('У вас нет сохранненных фильмов');
        setShortsSavedFilms(savedFilms.filter(({ duration }) => duration <= 40))
    }, []);

    const handleMoreFilms = () => {
        if (windowWidth >= 1280) {
            setNumberFilms(numberFilms + 3)
        } else if (windowWidth > 767 && windowWidth < 1280) {

            setNumberFilms(numberFilms + 2)
        } else {
            setNumberFilms(numberFilms + 1)
        }
    };

    const moreFilmsButtonVisible = () => {
        if (!shortFilmsCheckbox && (savedFilms.length === 0 || (savedFilms.length <= 12 && windowWidth >= 1280) || (savedFilms.length <= 8 && windowWidth > 767 && windowWidth < 1280) || (savedFilms.length <= 5 && windowWidth < 767) || (savedFilms.length <= numberFilms))) {
            return 'saved-movies__button-more saved-movies__button-more_hidden'
        } else if (shortFilmsCheckbox && ((shortsSavedFilms.length === 0 || (shortsSavedFilms.length <= 12 && windowWidth >= 1280) || (shortsSavedFilms.length <= 8 && windowWidth > 767 && windowWidth < 1280) || (shortsSavedFilms.length <= 5 && windowWidth < 767) || (shortsSavedFilms.length <= numberFilms)))) {
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
            setShortsSavedFilms(savedFilms.filter(({ duration }) => duration <= 40))
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