import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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

import { filmdb } from '../../utils/draftdb';
import { filmdbSaved } from '../../utils/draftdb';




function App() {
    const [loggedIn, setLoggedIn] = React.useState(true);
    const [openMenu, setOpenMenu] = React.useState(false);
    const { pathname } = useLocation();
    const [userInfo, setUserInfo] = React.useState({
        'name': 'Никодим',
        'email': 'dednicodim@gmail.com',
        'password': '123456',
    })

    const handleOpenMenu = () => {
        setOpenMenu(true);
    };

    const handleCloseMenu = () => {
        setOpenMenu(false);
    };

    const submitUserInfo = ({ name, email, password }) => {
        setUserInfo({
            name: name,
            email: email,
            password: password,
        })
    };

    return (
        <CurrentUserContext.Provider value={userInfo}>
            <div className='app'>
                 {(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/' || pathname === '/profile') && <Header handleOpenMenu={handleOpenMenu} loggedIn={loggedIn} />}
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/movies' element={<Movies filmdb={filmdb} />} />
                    <Route path='/saved-movies' element={<SavedMovies filmdb={filmdbSaved} />} />
                    <Route path='/profile' element={<Profile submitUserInfo={submitUserInfo} setLoggedIn={setLoggedIn} />} />
                    <Route path='/signup' element={<Register submitUserInfo={submitUserInfo}/>} />
                    <Route path='/signin' element={<Login submitUserInfo={userInfo} setLoggedIn={setLoggedIn} />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
                {(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/') && <Footer /> }
            </div>
            <PopupMenu openMenu={openMenu} handleCloseMenu={handleCloseMenu} />
        </CurrentUserContext.Provider>
    )
};
export default App;