import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { re } from '../../utils/constants';

const Profile = ({ submitUserInfo, setLoggedIn }) => {
    const context = React.useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [editProfile, setEditProfile] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    const [userNameDirty, setUserNameDirty] = React.useState(false);
    const [userEmailDirty, setUserEmailDirty] = React.useState(false);
    const [userPasswordDirty, setUserPasswordDirty] = React.useState(false);
    const [userNameError, setUserNameError] = React.useState('');
    const [userEmailError, setUserEmailError] = React.useState('');
    const [userPasswordError, setUserPasswordError] = React.useState('');

    React.useEffect(() => {
        setUserName(context.name);
        setUserEmail(context.email);
        setUserPassword(context.password);
    }, [context])
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

    const handleClickEditProfile = () => {
        setEditProfile(true);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitUserInfo({
            name: userName,
            email: userEmail,
            password: userPassword
        });
        setEditProfile(false);
    };

    const logout = () => {
        setLoggedIn(false);
        navigate('/', { replace: true });
    };

    return (
        <section className="profile">
            <h2 className='profile__title'>Привет, {context.name}!</h2>
            <form className="profile__form">
                <div className="profile__form-item">
                    <label className="profile__form-key">Имя</label>
                    <input
                        onChange={changeName}
                        type='text'
                        className={editProfile ? "profile__form-value" : 'profile__form-value profile__form-value_diasbled'}
                        name='name'
                        value={userName}
                        placeholder='Имя'
                        required
                    />
                    {userNameDirty && <span className='profile__form-error'>{userNameError}</span>}
                </div>
                <div className="profile__form-item">
                    <label className="profile__form-key">E-mail</label>
                    <input
                        onChange={changeEmail}
                        type='email'
                        className={editProfile ? "profile__form-value" : 'profile__form-value profile__form-value_diasbled'}
                        name='email'
                        value={userEmail}
                        placeholder="Email"
                        required
                    />
                    {userEmailDirty && <span className='profile__form-error'>{userEmailError}</span>}
                </div>

                <div className="profile__form-item profile__form-item_not-line">
                    <label className="profile__form-key">Пароль</label>
                    <input
                        onChange={changePassword}
                        type='password'
                        className={editProfile ? "profile__form-value" : 'profile__form-value profile__form-value_diasbled'}
                        name='password'
                        value={userPassword}
                        placeholder='Пароль'
                        required
                    />
                    {userPasswordDirty && <span className='profile__form-error'>{userPasswordError}</span>}
                </div>
                <button disabled={(userNameDirty || userEmailDirty || userPasswordDirty)} className={editProfile ? 'profile__form-btn' : 'profile__form-btn btn_none'} onClick={handleSubmit}>Сохранить</button>
            </form>

            <div className="profile__nav">
                <button className={editProfile ? 'profile__nav-btn btn_none' : 'profile__nav-btn'} onClick={handleClickEditProfile} >Редактировать</button>
                <button className='profile__nav-btn profile__nav-btn_red' onClick={logout}>Выйти из аккаунта</button>
            </div>
        </section>
    );
};

export default Profile;
