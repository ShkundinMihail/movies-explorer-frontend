import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { REGEX_EMAIL } from '../../utils/constants';

const Profile = ({ handleUserUpdate, handleLogout }) => {
    const context = React.useContext(CurrentUserContext);
    const [editProfile, setEditProfile] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userNameDirty, setUserNameDirty] = React.useState(false);
    const [userEmailDirty, setUserEmailDirty] = React.useState(false);
    const [userNameError, setUserNameError] = React.useState('');
    const [userEmailError, setUserEmailError] = React.useState('');
    //console.log(context)
    React.useEffect(() => {
        setUserName(context.name);
        setUserEmail(context.email);
    }, [context])
    const changeName = (e) => {
        setUserName(e.target.value)
        if (e.target.value.length === 0) {
            setUserNameError('Поле не должно быть пустым');
            setUserNameDirty(true);
        } else if (e.target.value.length < 2 || e.target.value.length > 30) {
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
        } else if (e.target.value.length > 30 || e.target.value.length < 6) {
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

    const handleClickEditProfile = () => {
        setEditProfile(true);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUserUpdate({
            name: userName,
            email: userEmail,
        });
        setEditProfile(false);
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
                        value={editProfile ? userName : context.name}
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
                        value={editProfile ? userEmail : context.email}//сделал так потому что даже после неудачного апдейта у меня в поле оставалось значение которое не удалось сохранить
                        placeholder="Email"
                        required
                    />
                    {userEmailDirty && <span className='profile__form-error'>{userEmailError}</span>}
                </div>
                <button disabled={(userNameDirty || userEmailDirty)} className={editProfile ? 'profile__form-btn' : 'profile__form-btn profile__form-btn_none'} onClick={handleSubmit}>Сохранить</button>
            </form>

            <div className="profile__nav">
                <button className={editProfile ? 'profile__nav-btn profile__form-btn_none' : 'profile__nav-btn'} onClick={handleClickEditProfile} >Редактировать</button>
                <button className='profile__nav-btn profile__nav-btn_red' onClick={handleLogout}>Выйти из аккаунта</button>
            </div>
        </section>
    );
};

export default Profile; 
