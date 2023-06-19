import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../../images/logo.png'
import { re } from '../../utils/constants'

const Register = ({ submitUserInfo }) => {
    const navigate = useNavigate()
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [userNameDirty, setUserNameDirty] = React.useState(false);
    const [userEmailDirty, setUserEmailDirty] = React.useState(false);
    const [userPasswordDirty, setUserPasswordDirty] = React.useState(false);
    const [userNameError, setUserNameError] = React.useState('');
    const [userEmailError, setUserEmailError] = React.useState('');
    const [userPasswordError, setUserPasswordError] = React.useState('');
    const changeName = (e) => {
        setUserName(e.target.value)
        if (e.target.value.length === 0) {
            setUserNameError('Поле не должно быть пустым');
            setUserNameDirty(true);
        } else if (e.target.value.length < 2 || e.target.value.length > 40) {
            setUserNameError('Имя должно быть от 2 до 40 символов');
            setUserNameDirty(true);
        } else {
            setUserNameError('');
            setUserNameDirty(false);
        }
    };

    const changeEmail = (e) => {
        setUserEmail(e.target.value)
        if (e.target.value.length === 0) {
            setUserEmailError('Поле не должно быть пустым');
            setUserEmailDirty(true);
        } else if (e.target.value.length > 40 || e.target.value.length < 6) {
            setUserEmailError('Email должно быть от 6 до 40 символов');
            setUserEmailDirty(true);
        } else if (!re.test(String(e.target.value).toLowerCase())) {
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
        } else if (e.target.value.length > 40 || e.target.value.length < 6) {
            setUserPasswordError('Пароль должно быть от 6 до 40 символов');
            setUserPasswordDirty(true);
        } else {
            setUserPasswordError('');
            setUserPasswordDirty(false);
        }
    };
        const handleSubmitRegister = (e) => {
            e.preventDefault();
            submitUserInfo({
                name: userName,
                email: userEmail,
                password: userPassword
            });
            navigate('/signin', { replace: true })
        };
        return (
            <section className='register'>
                <Link to='/' className='register__logo'><img className='register__logo-img' src={logo} alt='лого' /></Link>
                <h5 className='register__title'>Добро пожаловать!</h5>
                <form className='register__form'>
                    <div className='register__form-container'>
                        <label className='register__form-container-label'>Имя</label>
                        <input
                            onChange={changeName}
                            className={userNameDirty ? 'register__form-container-input register__form-container-input_red' : 'register__form-container-input'}
                            type='text'
                            placeholder='Имя' />
                            {userNameDirty && <span className='register__form-container-error'>{userNameError}</span>}
                    </div>
                    <div className='register__form-container'>
                        <label className='register__form-container-label'>E-mail</label>
                        <input
                            onChange={changeEmail}
                            className={userEmailDirty ? 'register__form-container-input register__form-container-input_red' : 'register__form-container-input'}
                            type='email'
                            placeholder='Email' />
                            {userEmailDirty && <span className='register__form-container-error'>{userEmailError}</span>}
                    </div>
                    <div className='register__form-container'>
                        <label className='register__form-container-label'>Пароль</label>
                        <input
                            onChange={changePassword}
                            className={userPasswordDirty ? 'register__form-container-input register__form-container-input_red' : 'register__form-container-input'}
                            type='password'
                            placeholder='Пароль' />
                            {userPasswordDirty && <span className='register__form-container-error'>{userPasswordError}</span>}
                    </div>
                    <button
                        onClick={handleSubmitRegister}
                        disabled={(userNameDirty || userEmailDirty || userPasswordDirty || userName === '' || userEmail === '' || userPassword === '')}
                        className='register__form-button'>Зарегистрироваться</button>
                </form>
                <div className='register__nav-container'>
                    <p className='register__nav-text'>Уже зарегистрированы?</p>
                    <Link to='/signin' className='register__link'>Войти</Link>
                </div>
            </section>

        )
    };

    export default Register;
