/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.js";
import Preloader from "../Preloader/Preloader.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { getMovies } from "../../utils/MoviesApi";
import {
  CYRILLIC_REGEX,
  SCREEN_WIDTH_1280,
  SCREEN_WIDTH_768,
  DURATION_SHORT_FILM,
} from "../../utils/constants";

const Movies = ({
  searchTextFromMovies,
  setSearchTextFromMovies,
  windowWidth,
  addFilmToUser,
  setPreloader,
  preloader,
  savedFilms,
  setSavedFilms,
  deleteUsersFilm,
  infoText,
  setInfoText,
  searchResult,
  setSearchResult,
}) => {
  const [shortFilmsCheckbox, setShortFilmsCheckbox] = React.useState(
    localStorage.getItem("checkboxShortFilms") === "true" ? true : false
  );
  const [numberFilms, setNumberFilms] = React.useState(0);

  React.useEffect(() => {
    if (shortFilmsCheckbox && getShortFilms(searchResult).length === 0) {
      setInfoText("Ничего не найдено");
    }
  }, [shortFilmsCheckbox]);

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
      return "movies__button-more movies__button-more_hidden";
    } else {
      return "movies__button-more";
    }
  };

  const handleFilms = () => {
    setPreloader(true);
    localStorage.setItem("searchText", searchTextFromMovies);
    if (!localStorage.getItem("allMovies")) {
      getMovies()
        .then((res) => {
          localStorage.setItem("allMovies", JSON.stringify(res));
          movieSearchLogic(res);
        })
        .catch((err) => {
          localStorage.setItem("movies", []);
          setSearchResult([]);
          setInfoText(
            `Во время запроса произошла ошибка ${err.message}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`
          );
        })
        .finally(() => {
          setPreloader(false);
        });
    } else {
      const allMovies = JSON.parse(localStorage.getItem("allMovies"));
      movieSearchLogic(allMovies);
      setPreloader(false);
    }
  };
  const movieSearchLogic = (array) => {
    let data;
    if (CYRILLIC_REGEX.test(String(searchTextFromMovies).toLowerCase())) {
      data = array.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(searchTextFromMovies.toLowerCase())
      );
    } else {
      data = array.filter(({ nameEN }) =>
        nameEN.toLowerCase().includes(searchTextFromMovies.toLowerCase())
      );
    }
    if (data.length === 0) {
      setSearchResult([]);
      localStorage.setItem("movies", []);
      setInfoText("Ничего не найдено");
    } else {
      localStorage.setItem("movies", JSON.stringify(data));
      setSearchResult(data);
    }
  };

  const getShortFilms = (films) => {
    return films.filter(({ duration }) => duration <= DURATION_SHORT_FILM);
  };

  return (
    <div className="movies">
      <SearchForm
        searchText={searchTextFromMovies}
        setSearchText={setSearchTextFromMovies}
        handleFilms={handleFilms}
        shortFilmsCheckbox={shortFilmsCheckbox}
        setShortFilmsCheckbox={setShortFilmsCheckbox}
      />
      {preloader ? (
        <Preloader />
      ) : (
        <>
          {!searchResult ||
          searchResult.length === 0 ||
          (shortFilmsCheckbox && getShortFilms(searchResult).length === 0) ? (
            <p className="movies__info-text">{infoText}</p>
          ) : (
            <>
              <MoviesCardList
                numberFilms={numberFilms}
                movies={
                  !shortFilmsCheckbox
                    ? searchResult
                    : getShortFilms(searchResult)
                }
                addFilmToUser={addFilmToUser}
                savedFilms={savedFilms}
                setSavedFilms={setSavedFilms}
                deleteUsersFilm={deleteUsersFilm}
              />
              <button
                className={
                  !shortFilmsCheckbox
                    ? moreFilmsButtonVisible(searchResult)
                    : moreFilmsButtonVisible(getShortFilms(searchResult))
                }
                onClick={handleMoreFilms}
              >
                Ещё
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Movies;
