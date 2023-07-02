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
import { TOKEN, STATUS_SHORT_FILMS_CHECKBOX_FROM_LOCAL_STORAGE } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [animation, setAnimation] = React.useState(false);
    const [infoToolTipVisible, setInfoToolTipVisible] = React.useState(false);
    const [messageText, setMessageText] = React.useState('');
    const [shortFilmsCheckbox, setShortFilmsCheckbox] = React.useState(false);
    const [numberFilms, setNumberFilms] = React.useState(0);
    const [savedFilms, setSavedFilms] = React.useState([]);
    const [infoTextSavedMovies, setInfoTextSavedMovies] = React.useState('');
    const [preloader, setPreloader] = React.useState(false);
    const { pathname } = useLocation();
    const windowWidth = useResize().width;
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = React.useState({
        name: '',
        email: '',
        password: '',
    });

    React.useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (loggedIn) {
            handleUserInfo();
            handleSavedFilms();
            if (STATUS_SHORT_FILMS_CHECKBOX_FROM_LOCAL_STORAGE) {
                setShortFilmsCheckbox(JSON.parse(STATUS_SHORT_FILMS_CHECKBOX_FROM_LOCAL_STORAGE));
            }
        }
    }, [loggedIn]);
    React.useEffect(() => {
        localStorage.setItem('checkboxShortFilms', JSON.stringify(shortFilmsCheckbox));
    },
        [shortFilmsCheckbox]);
    React.useEffect(() => {
        if (windowWidth >= 1280) {
            setNumberFilms(12)
        } else if (windowWidth > 767 && windowWidth < 1280) {
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
                setInfoToolTipVisible(true)
                setMessageText('Регистрация прошла успешно!')
                navigate('/signin', { replace: true })
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
                console.log(res);
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
                        navigate('/movies', { replace: true });
                    }
                })
                .catch((err) => {
                    setInfoToolTipVisible(true);
                    setMessageText(`Ошибка входа. Авторизуйтесь или пройдите регистрацию: ${err}`);
                    navigate('/', { replace: true });
                })
                .finally(() => {
                    setAnimation(false);
                    setTimeout(() => { setInfoToolTipVisible(false) }, 1500);
                });
        } else {
            navigate('/', { replace: true });
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
        localStorage.removeItem('movies');
        localStorage.removeItem('searchText');
        localStorage.removeItem('checkboxShortFilms');
        setLoggedIn(false);
        setUserInfo({ name: '', email: '', password: '' });
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
                            deleteUsersFilm={deleteUsersFilm} />} />
                    <Route path='/profile' element={
                        <ProtectedRoute element={Profile}
                            handleUserUpdate={handleUserUpdate}
                            handleLogout={handleLogout}
                            loggedIn={loggedIn} />} />
                    <Route path='*' element={<NotFoundPage />} />
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