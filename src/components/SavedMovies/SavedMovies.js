import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { SEARCH_TEXT_FROM_LOCAL_STORAGE } from '../../utils/constants';

const SavedMovies = ({ windowWidth, shortFilmsCheckbox, setShortFilmsCheckbox, numberFilms, setNumberFilms, savedFilms, infoTextSavedMovies, setInfoTextSavedMovies, preloader, deleteUsersFilm }) => {
    const [searchText, setSearchText] = React.useState('');
    console.log(shortFilmsCheckbox)
    React.useEffect(() => {
        setInfoTextSavedMovies('У вас нет сохранненных фильмов');
        if (SEARCH_TEXT_FROM_LOCAL_STORAGE) {
            setSearchText(SEARCH_TEXT_FROM_LOCAL_STORAGE);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (savedFilms.length === 0 || (savedFilms.length <= 12 && windowWidth >= 1280) || (savedFilms.length <= 8 && windowWidth > 767 && windowWidth < 1280) || (savedFilms.length <= 5 && windowWidth < 767) || (savedFilms.length <= numberFilms)) {
            return 'saved-movies__button-more saved-movies__button-more_hidden'
        } else {
            return 'saved-movies__button-more'
        }
    };
    console.log(shortFilmsCheckbox)
    return (
        <section className='saved-movies'>
            <SearchForm searchText={searchText} setSearchText={setSearchText} handleFilms={null} shortFilmsCheckbox={shortFilmsCheckbox} setShortFilmsCheckbox={setShortFilmsCheckbox} />
            {preloader ? <Preloader /> :
                <>
                    {(savedFilms === null || savedFilms.length === 0) ? <p className='saved-movies__info-text'>{infoTextSavedMovies}</p> :
                        <>
                            <MoviesCardList movies={savedFilms} numberFilms={numberFilms} savedFilms={savedFilms} deleteUsersFilm={deleteUsersFilm} />
                            <button className={moreFilmsButtonVisible()} onClick={handleMoreFilms}>Ещё</button>
                        </>}
                </>}
        </section>
    )
};

export default SavedMovies;