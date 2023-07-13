import React from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useResize from "use-resize";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Footer from "../Footer/Footer.js";
import Profile from "../Profile/Profile.js";
import PopupMenu from "../PopupMenu/PopupMenu";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import NotFoundPage from "../NotFoundPage/NotFoundPage.js";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
  createUserMovies,
  deleteUserMovies,
  getUserMovies,
} from "../../utils/MainApi";
import {
  TOKEN,
  FILMS_FROM_LOCAL_STORAGE,
  FIRST_VISIT_SITE,
  SEARCH_TEXT_FROM_LOCAL_STORAGE,
} from "../../utils/constants";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(TOKEN ? true : false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [animation, setAnimation] = React.useState(false);
  const [infoToolTipVisible, setInfoToolTipVisible] = React.useState(false);
  const [messageText, setMessageText] = React.useState("");
  const [searchTextFromMovies, setSearchTextFromMovies] = React.useState(
    SEARCH_TEXT_FROM_LOCAL_STORAGE
  );
  const [savedFilms, setSavedFilms] = React.useState([]);
  const [infoTextSavedMovies, setInfoTextSavedMovies] = React.useState("");
  const [preloader, setPreloader] = React.useState(false);
  const [infoText, setInfoText] = React.useState("Введите запрос");
  const [searchResult, setSearchResult] = React.useState(
    FILMS_FROM_LOCAL_STORAGE ? JSON.parse(FILMS_FROM_LOCAL_STORAGE) : []
  );
  const { pathname } = useLocation();
  const windowWidth = useResize().width;
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
  });
  React.useEffect(() => {
    if (
      loggedIn &&
      !FIRST_VISIT_SITE &&
      (pathname === "movies" || pathname === "/")
    ) {
      navigate("/movies", { replace: true });
    }
    if (loggedIn) {
      sessionStorage.setItem("entrance", true);
      handleSavedFilms();
      handleUserInfo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //userBlock////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleRegisterUser = ({ name, email, password }) => {
    setAnimation(true);
    registerUser({ name, email, password })
      .then(() => {
        loginUser({ email, password })
          .then((res) => {
            localStorage.setItem("token", res.token);
            setLoggedIn(true);
            handleSavedFilms();
            handleUserInfo();
            setInfoToolTipVisible(true);
            setMessageText("Регистрация прошла успешно!");
            navigate("/movies", { replace: true });
          })
          .catch((err) => {
            setInfoToolTipVisible(true);
            setMessageText(`${err}...Попробуйте еще раз...`);
          })
          .finally(() => {
            setAnimation(false);
            setTimeout(() => {
              setInfoToolTipVisible(false);
            }, 1500);
          });
      })
      .catch((err) => {
        setInfoToolTipVisible(true);
        setMessageText(`${err}...Попробуйте еще раз...`);
      })
      .finally(() => {
        setAnimation(false);
        setTimeout(() => {
          setInfoToolTipVisible(false);
        }, 1500);
      });
  };
  const handleLoginUser = ({ email, password }) => {
    setAnimation(true);
    loginUser({ email, password })
      .then((res) => {
        localStorage.setItem("token", res.token);
        setInfoToolTipVisible(true);
        setMessageText("Добро пожаловать!");
        navigate("/movies", { replace: true });
        setLoggedIn(true);
        handleSavedFilms();
        handleUserInfo();
      })
      .catch((err) => {
        setInfoToolTipVisible(true);
        setMessageText(`${err}...Попробуйте еще раз...`);
      })
      .finally(() => {
        setAnimation(false);
        setTimeout(() => {
          setInfoToolTipVisible(false);
        }, 1500);
      });
  };
  const handleUserUpdate = ({ name, email }) => {
    setAnimation(true);
    updateUserInfo({ name, email })
      .then((res) => {
        setInfoToolTipVisible(true);
        setMessageText("Профиль успешно изменён!");
        setUserInfo({ name: res.name, email: res.email });
      })
      .catch((err) => {
        setInfoToolTipVisible(true);
        setMessageText(`Произошла ошибка ${err}, попробуйте ещё раз.`);
      })
      .finally(() => {
        setAnimation(false);
        setTimeout(() => {
          setInfoToolTipVisible(false);
        }, 1500);
      });
  };

  const handleUserInfo = () => {
    setAnimation(true);
    getUserInfo()
      .then((res) => {
        setUserInfo({
          name: res.user.name,
          email: res.user.email,
        });
      })
      .catch((err) => {
        setInfoToolTipVisible(true);
        localStorage.removeItem("token");
        setMessageText(
          `Ошибка входа. Авторизуйтесь или пройдите регистрацию: ${err}`
        );
        setTimeout(() => {
          setInfoToolTipVisible(false);
        }, 1500);
        handleLogout();
      })
      .finally(() => {
        setAnimation(false);
      });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("checkboxShortFilms");
    localStorage.removeItem("searchText");
    sessionStorage.removeItem("entrance");
    setUserInfo({ name: "", email: "", password: "" });
    setSearchResult([]);
    setLoggedIn(false);
    setSearchTextFromMovies("");
    navigate("/", { replace: true });
  };
  ///burger////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleOpenMenu = () => {
    setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };
  ////moviesBlock//////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSavedFilms = () => {
    setPreloader(true);
    getUserMovies()
      .then((res) => {
        setSavedFilms(res.movie.reverse());
      })
      .catch((err) => {
        setInfoTextSavedMovies(`Ошибка:${err}`);
      })
      .finally(() => {
        setPreloader(false);
      });
  };
  const addFilmToUser = ({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  }) => {
    setPreloader(true);
    createUserMovies({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    })
      .then((res) => {
        setSavedFilms([res.data, ...savedFilms]);
      })
      .catch((err) => {
        setInfoToolTipVisible(true);
        setMessageText(`Ошибка:${err}. Попробуйте ещё раз.`);
        setTimeout(() => {
          setInfoToolTipVisible(false);
        }, 3000);
      })
      .finally(() => {
        setPreloader(false);
      });
  };

  const deleteUsersFilm = (id) => {
    setPreloader(true);
    deleteUserMovies(id)
      .then(() => {
        setSavedFilms(savedFilms.filter(({ _id }) => _id !== id));
      })
      .catch((err) => {
        setInfoToolTipVisible(true);
        setMessageText(`Ошибка:${err}. Попробуйте ещё раз.`);
        setTimeout(() => {
          setInfoToolTipVisible(false);
        }, 2000);
      })
      .finally(() => {
        setPreloader(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={userInfo}>
      <div className="app">
        {(pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/" ||
          pathname === "/profile") && (
          <Header handleOpenMenu={handleOpenMenu} loggedIn={loggedIn} />
        )}
        <Routes>
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                windowWidth={windowWidth}
                addFilmToUser={addFilmToUser}
                preloader={preloader}
                setPreloader={setPreloader}
                savedFilms={savedFilms}
                setSavedFilms={setSavedFilms}
                deleteUsersFilm={deleteUsersFilm}
                infoText={infoText}
                setInfoText={setInfoText}
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                searchTextFromMovies={searchTextFromMovies}
                setSearchTextFromMovies={setSearchTextFromMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                windowWidth={windowWidth}
                savedFilms={savedFilms}
                setSavedFilms={setSavedFilms}
                preloader={preloader}
                deleteUsersFilm={deleteUsersFilm}
                infoTextSavedMovies={infoTextSavedMovies}
                setInfoTextSavedMovies={setInfoTextSavedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                handleUserUpdate={handleUserUpdate}
                handleLogout={handleLogout}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/" element={<Main />} />
          {!loggedIn && (
            <Route
              path="/signup"
              element={<Register handleRegisterUser={handleRegisterUser} />}
            />
          )}
          {!loggedIn && (
            <Route
              path="/signin"
              element={<Login handleLoginUser={handleLoginUser} />}
            />
          )}
          <Route path="*" element={<NotFoundPage navigate={navigate} />} />
        </Routes>
        {(pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/") && <Footer />}
        <PopupMenu openMenu={openMenu} handleCloseMenu={handleCloseMenu} />
        <LoadingAnimation animation={animation} windowWidth={windowWidth} />
        <InfoToolTip
          messageText={messageText}
          infoToolTipVisible={infoToolTipVisible}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
