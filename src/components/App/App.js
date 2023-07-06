import React from 'react';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useResize from 'use-resize';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Footer from '../Footer/Footer.js';
import Profile from '../Profile/Profile.js';
import PopupMenu from '../PopupMenu/PopupMenu';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage.js';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

import { registerUser, loginUser, verificationUserToken, getUserInfo, updateUserInfo, createUserMovies, deleteUserMovies, getUserMovies } from '../../utils/MainApi';
import { TOKEN, STATUS_SHORT_FILMS_CHECKBOX_FROM_LOCAL_STORAGE, FILMS_FROM_LOCAL_STORAGE, SEARCH_TEXT_FROM_LOCAL_STORAGE, SCREEN_WIDTH_1280, SCREEN_WIDTH_768} from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(TOKEN ? true : false);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [animation, setAnimation] = React.useState(false);
    const [infoToolTipVisible, setInfoToolTipVisible] = React.useState(false);
    const [messageText, setMessageText] = React.useState('');
    const [shortFilmsCheckbox, setShortFilmsCheckbox] = React.useState(false);
    const [numberFilms, setNumberFilms] = React.useState(0);
    const [savedFilms, setSavedFilms] = React.useState([]);
    const [infoTextSavedMovies, setInfoTextSavedMovies] = React.useState('');
    const [preloader, setPreloader] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [infoText, setInfoText] = React.useState('');
    const [searchResult, setSearchResult] = React.useState([]);
    const { pathname } = useLocation();
    const windowWidth = useResize().width;
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = React.useState({
        name: '',
        email: '',
        password: '',
    });

    // React.useEffect(() => {
    //     if (!loggedIn) {
    //         checkToken();
    //     }
    // }, []);

    React.useEffect(() => {
        if (STATUS_SHORT_FILMS_CHECKBOX_FROM_LOCAL_STORAGE && loggedIn) {
            setShortFilmsCheckbox(JSON.parse(STATUS_SHORT_FILMS_CHECKBOX_FROM_LOCAL_STORAGE));
        };
        setInfoText('Введите запрос');
        if (FILMS_FROM_LOCAL_STORAGE === (null || undefined || false) && loggedIn) {
            setSearchResult([]);
        } else {
            setSearchResult(JSON.parse(FILMS_FROM_LOCAL_STORAGE));
        };
        if (SEARCH_TEXT_FROM_LOCAL_STORAGE === (null || undefined || false) && loggedIn) {
            setSearchText('');
        } else {
            setSearchText(SEARCH_TEXT_FROM_LOCAL_STORAGE);
        };
        if (loggedIn) {
            handleSavedFilms();
            handleUserInfo();
        }
    }, [loggedIn]);

    React.useEffect(() => {
        localStorage.setItem('checkboxShortFilms', JSON.stringify(shortFilmsCheckbox));
    },
        [shortFilmsCheckbox]);

    React.useEffect(() => {
        if (windowWidth >= SCREEN_WIDTH_1280) {
            setNumberFilms(12)
        } else if (windowWidth > SCREEN_WIDTH_768 && windowWidth < SCREEN_WIDTH_1280) {
            setNumberFilms(8)
        } else {
            setNumberFilms(5)
        }
    }, [windowWidth]);

    //userBlock////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleRegisterUser = ({ name, email, password }) => {
        setAnimation(true);
        registerUser({ name, email, password })
            .then(() => {
                loginUser({ email, password })
                    .then((res) => {
                        localStorage.setItem('token', res.token);
                        setLoggedIn(true);
                        setInfoToolTipVisible(true)
                        setMessageText('Регистрация прошла успешно!')
                        navigate('/movies', { replace: true })
                    })
                    .catch((err) => {
                        setInfoToolTipVisible(true)
                        setMessageText(`${err}...Попробуйте еще раз...`);
                    })
                    .finally(() => {
                        setAnimation(false)
                        setTimeout(() => { setInfoToolTipVisible(false) }, 1500)
                    })
            })
            .catch((err) => {
                setInfoToolTipVisible(true)
                setMessageText(`${err}...Попробуйте еще раз...`);
            })
            .finally(() => {
                setAnimation(false)
                setTimeout(() => { setInfoToolTipVisible(false) }, 1500)
            })
    };
    const handleLoginUser = ({ email, password }) => {
        setAnimation(true);
        loginUser({ email, password })
            .then((res) => {
                localStorage.setItem('token', res.token);
                setLoggedIn(true);
                setInfoToolTipVisible(true);
                setMessageText('Добро пожаловать!');
                navigate('/movies', { replace: true });
            })
            .catch((err) => {
                setInfoToolTipVisible(true);
                setMessageText(`${err}...Попробуйте еще раз...`);
            })
            .finally(() => {
                setAnimation(false);
                setTimeout(() => { setInfoToolTipVisible(false) }, 1500);
            })
    };
    const handleUserUpdate = ({ name, email, password }) => {
        setAnimation(true);
        updateUserInfo({ name, email, password })
            .then((res) => {
                setInfoToolTipVisible(true);
                setMessageText('Профиль успешно изменён!');
                setUserInfo({ name: res.name, email: res.email, password: '' });
            })
            .catch((err) => {
                setInfoToolTipVisible(true);
                setMessageText(`Произошла ошибка ${err}, попробуйте ещё раз.`);
            })
            .finally(() => {
                setAnimation(false);
                setTimeout(() => { setInfoToolTipVisible(false) }, 1500);
            })
    };
    const checkToken = () => {
        if (TOKEN) {
            setAnimation(true);
            verificationUserToken(TOKEN)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        navigate('/movies', { replace: false });
                    }
                })
                .catch((err) => {
                    setInfoToolTipVisible(true);
                    setMessageText(`Ошибка входа. Авторизуйтесь или пройдите регистрацию: ${err}`);
                    navigate('/', { replace: false });
                })
                .finally(() => {
                    setAnimation(false);
                    setTimeout(() => { setInfoToolTipVisible(false) }, 1500);
                });
        }
    };
    const handleUserInfo = () => {
        getUserInfo()
            .then((res) => {
                setUserInfo({
                    name: res.user.name,
                    email: res.user.email,
                    password: ''
                })
            })
            .catch((err) => { return err })
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('timeLastTokenCheck');
        setLoggedIn(false);
        setUserInfo({ name: '', email: '', password: '' });
        setSearchResult([]);
        setSearchText('');
        setShortFilmsCheckbox(false);
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
                setInfoTextSavedMovies(`Ошибка:${err}`)
            })
            .finally(() => {
                setPreloader(false);
            });
    };
    const addFilmToUser = ({ country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN }) => {
        setPreloader(true);
        createUserMovies({ country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN })
            .then((res) => {
                setSavedFilms([res.data, ...savedFilms]);
            })
            .catch(err => {
                setInfoToolTipVisible(true);
                setMessageText(`Ошибка:${err}. Попробуйте ещё раз.`);
                setTimeout(() => { setInfoToolTipVisible(false) }, 3000);
            })
            .finally(() => {
                setPreloader(false);
            });
    };

    const deleteUsersFilm = (id) => {
        setPreloader(true);
        deleteUserMovies(id)
            .then(() => {
                setSavedFilms(savedFilms.filter(({ _id }) => _id !== id))
            })
            .catch(err => {
                setInfoToolTipVisible(true);
                setMessageText(`Ошибка:${err}. Попробуйте ещё раз.`);
                setTimeout(() => { setInfoToolTipVisible(false) }, 2000);
            })
            .finally(() => {
                setPreloader(false);
            });
    };

    return (
        <CurrentUserContext.Provider value={userInfo}>
            <div className='app'>
                {(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/' || pathname === '/profile') && <Header handleOpenMenu={handleOpenMenu} loggedIn={loggedIn} />}
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/signup' element={<Register handleRegisterUser={handleRegisterUser} />} />
                    <Route path='/signin' element={<Login handleLoginUser={handleLoginUser} />} />
                    <Route path='/movies' element={
                        <ProtectedRoute
                            element={Movies}
                            loggedIn={loggedIn}
                            windowWidth={windowWidth}
                            shortFilmsCheckbox={shortFilmsCheckbox}
                            setShortFilmsCheckbox={setShortFilmsCheckbox}
                            numberFilms={numberFilms}
                            setNumberFilms={setNumberFilms}
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
                            searchText={searchText}
                            setSearchText={setSearchText}
                        />} />
                    <Route path='/saved-movies' element={
                        <ProtectedRoute
                            element={SavedMovies}
                            loggedIn={loggedIn}
                            numberFilms={numberFilms}
                            windowWidth={windowWidth}
                            shortFilmsCheckbox={shortFilmsCheckbox}
                            setShortFilmsCheckbox={setShortFilmsCheckbox}
                            setNumberFilms={setNumberFilms}
                            savedFilms={savedFilms}
                            setSavedFilms={setSavedFilms}
                            infoTextSavedMovies={infoTextSavedMovies}
                            setInfoTextSavedMovies={setInfoTextSavedMovies}
                            preloader={preloader}
                            deleteUsersFilm={deleteUsersFilm}
                            searchText={searchText}
                            setSearchText={setSearchText} />} />
                    <Route path='/profile' element={
                        <ProtectedRoute element={Profile}
                            handleUserUpdate={handleUserUpdate}
                            handleLogout={handleLogout}
                            loggedIn={loggedIn} />} />
                    <Route path='*' element={<NotFoundPage navigate={navigate} />} />
                </Routes>
                {(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/') && <Footer />}
                <PopupMenu openMenu={openMenu} handleCloseMenu={handleCloseMenu} />
                <LoadingAnimation animation={animation} windowWidth={windowWidth} />
                <InfoToolTip messageText={messageText} infoToolTipVisible={infoToolTipVisible} />
            </div>

        </CurrentUserContext.Provider>
    )
};
export default App;