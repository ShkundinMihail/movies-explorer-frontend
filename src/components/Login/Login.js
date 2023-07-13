import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.svg'
import { REGEX_EMAIL } from '../../utils/constants'

const Login = ({ handleLoginUser }) => {
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [userEmailDirty, setUserEmailDirty] = React.useState(false);
    const [userPasswordDirty, setUserPasswordDirty] = React.useState(false);
    const [userEmailError, setUserEmailError] = React.useState('');
    const [userPasswordError, setUserPasswordError] = React.useState('');

    const changeEmail = (e) => {
        setUserEmail(e.target.value)
        if (e.target.value.length === 0) {
            setUserEmailError('Поле не должно быть пустым');
            setUserEmailDirty(true);
        } else if (e.target.value.length > 40 || e.target.value.length < 6) {
            setUserEmailError('Email должно быть от 6 до 40 символов');
            setUserEmailDirty(true);
        } else if (!REGEX_EMAIL.test(String(e.target.value).toLowerCase())) {
            setUserEmailError('Некорректный email');
            setUserEmailDirty(true);
        } else {
            setUserEmailError('');
            setUserEmailDirty(false);
        }
    };
    const changePassword = (e) => {
        setUserPassword(e.target.value)
        if (e.target.value.length === 0) {
            setUserPasswordError('Поле не должно быть пустым');
            setUserPasswordDirty(true);
        } else if (e.target.value.length > 40 || e.target.value.length < 8) {
            setUserPasswordError('Пароль должно быть от 8 до 40 символов');
            setUserPasswordDirty(true);
        } else {
            setUserPasswordError('');
            setUserPasswordDirty(false);
        }
    };
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        handleLoginUser({
            email: userEmail,
            password: userPassword
        })
    };
    return (
        <section className='login'>
            <Link to='/' className='login__logo'><img className='login__logo-img' src={logo} alt='лого' /></Link>
            <h5 className='login__title'>Рады видеть!</h5>
            <form className='login__form'>
                <div className='login__form-container'>
                    <label className='login__form-container-label'>E-mail</label>
                    <input
                        onChange={changeEmail}
                        className={userEmailDirty ? 'login__form-container-input login__form-container-input_red' : 'login__form-container-input'}
                        type='email'
                        placeholder='Email' />
                    {userEmailDirty && <span className='login__form-container-error'>{userEmailError}</span>}
                </div>
                <div className='login__form-container'>
                    <label className='login__form-container-label'>Пароль</label>
                    <input
                        onChange={changePassword}
                        className={userPasswordDirty ? 'login__form-container-input login__form-container-input_red' : 'login__form-container-input'}
                        type='password'
                        placeholder='Пароль' />
                    {userPasswordDirty && <span className='login__form-container-error'>{userPasswordError}</span>}
                </div>
                <button
                    onClick={handleSubmitLogin}
                    disabled={(userEmailDirty || userPasswordDirty || userEmail === '' || userPassword === '')}
                    className='login__form-button'>Войти</button>
            </form>
            <div className='login__nav-container'>
                <p className='login__nav-text'>Ещё не зарегистрированы?</p>
                <Link to='/signup' className='login__link'>Регистрация</Link>
            </div>
        </section>

    )
};

export default Login;
