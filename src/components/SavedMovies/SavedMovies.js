/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {
  CYRILLIC_REGEX,
  SCREEN_WIDTH_1280,
  SCREEN_WIDTH_768,
  DURATION_SHORT_FILM,
} from "../../utils/constants";

const SavedMovies = ({
  windowWidth,
  savedFilms,
  infoTextSavedMovies,
  setInfoTextSavedMovies,
  preloader,
  deleteUsersFilm,
}) => {
  const [searchText, setSearchText] = React.useState("");
  const [shortFilmsCheckbox, setShortFilmsCheckbox] = React.useState(false);
  const [numberFilms, setNumberFilms] = React.useState(0);
  const [searchBySavedFilms, setSearchBySavedFilms] = React.useState([]);
  const [searchStatus, setSearchStatus] = React.useState(false);

  React.useEffect(() => {
    if (windowWidth >= SCREEN_WIDTH_1280) {
      setNumberFilms(12);
    } else if (
      windowWidth > SCREEN_WIDTH_768 &&
      windowWidth < SCREEN_WIDTH_1280
    ) {
      setNumberFilms(8);
    } else {
      setNumberFilms(5);
    }
  }, [windowWidth]);

  const handleMoreFilms = () => {
    if (windowWidth >= SCREEN_WIDTH_1280) {
      setNumberFilms(numberFilms + 3);
    } else if (
      windowWidth > SCREEN_WIDTH_768 &&
      windowWidth < SCREEN_WIDTH_1280
    ) {
      setNumberFilms(numberFilms + 2);
    } else {
      setNumberFilms(numberFilms + 1);
    }
  };

  const moreFilmsButtonVisible = (films) => {
    if (
      films.length === 0 ||
      (films.length <= 12 && windowWidth >= SCREEN_WIDTH_1280) ||
      (films.length <= 8 &&
        windowWidth > SCREEN_WIDTH_768 &&
        windowWidth < SCREEN_WIDTH_1280) ||
      (films.length <= 5 && windowWidth < SCREEN_WIDTH_768) ||
      films.length <= numberFilms
    ) {
      return "saved-movies__button-more saved-movies__button-more_hidden";
    } else {
      return "saved-movies__button-more";
    }
  };

  const getShortFilms = (films) => {
    return films.filter(({ duration }) => duration <= DURATION_SHORT_FILM);
  };

  const searchInSavedMovies = () => {
    let films;
    setSearchBySavedFilms([]);
    setInfoTextSavedMovies("");
    setSearchStatus(true);
    if (CYRILLIC_REGEX.test(String(searchText).toLowerCase())) {
      films = savedFilms.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      films = savedFilms.filter(({ nameEN }) =>
        nameEN.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (films.length === 0) {
      setInfoTextSavedMovies("Ничего не найдено");
    } else {
      setSearchBySavedFilms(films);
    }
  };

  return (
    <section className="saved-movies">
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        handleFilms={searchInSavedMovies}
        shortFilmsCheckbox={shortFilmsCheckbox}
        setShortFilmsCheckbox={setShortFilmsCheckbox}
      />
      {preloader ? (
        <Preloader />
      ) : (
        <>
          {!savedFilms ||
          savedFilms.length === 0 ||
          infoTextSavedMovies ||
          (shortFilmsCheckbox &&
            searchStatus &&
            getShortFilms(searchBySavedFilms).length === 0) ? (
            <p className="saved-movies__info-text">
              {infoTextSavedMovies
                ? infoTextSavedMovies
                : savedFilms.length === 0
                ? "У вас нет сохраненных фильмов"
                : "Ничего не найдено"}
            </p>
          ) : (
            <>
              <MoviesCardList
                movies={
                  !searchStatus
                    ? !shortFilmsCheckbox
                      ? savedFilms
                      : getShortFilms(savedFilms)
                    : !shortFilmsCheckbox
                    ? searchBySavedFilms
                    : getShortFilms(searchBySavedFilms)
                }
                numberFilms={numberFilms}
                savedFilms={savedFilms}
                deleteUsersFilm={deleteUsersFilm}
              />
              <button
                className={moreFilmsButtonVisible(
                  !searchStatus
                    ? !shortFilmsCheckbox
                      ? savedFilms
                      : getShortFilms(savedFilms)
                    : !shortFilmsCheckbox
                    ? searchBySavedFilms
                    : getShortFilms(searchBySavedFilms)
                )}
                onClick={handleMoreFilms}
              >
                Ещё
              </button>
            </>
          )}
        </>
      )}
    </section>
  );
};
//обычный форматер сломался ))))) Пришлось ставить Prettier
export default SavedMovies;
