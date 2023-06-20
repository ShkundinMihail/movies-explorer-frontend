import React from "react";
import './SearchForm.css';
import searchIcon from '../../images/iconSearch.svg';
import searchFormButton from '../../images/findsearch.svg';

const SearchForm = () => {
    const [blurInput, setBlurInput] = React.useState(false);
    const [focusInput, setFocusInput] = React.useState(false);
    return (
        <div className="search-form">
            <form className="search-form__form">
                {focusInput && <>
                    <div className={blurInput ? "search-form__form-input-blur" : "search-form__form-input-focus"}></div>
                    <div className={blurInput ? 'search-form__form-input-blur search-form__form-input-blur_top' : "search-form__form-input-focus search-form__form-input-focus_top"}></div>
                </>}
                <img className="search-form__image" src={searchIcon} alt="iconSearch" />
                <input
                    onFocus={() => { setBlurInput(false); setFocusInput(true) }}
                    onBlur={() => { setBlurInput(true) }}
                    className="search-form__input"
                    type="text"
                    placeholder="Фильм"
                    required
                />
                <button className="search-form__button" type="submit" onClick={null}>
                    <img className="search-form__button-image" src={searchFormButton} alt="findsearch" />
                </button>
            </form>
            <div className="search-form__dividing-line"></div>
            <div className="search-form__shorts-container">
                <label className="search-form__shorts-button">
                    <input
                        type="checkbox"
                        className="search-form__shorts-checkbox"
                    />
                    <span className="search-form__shorts-slider" />
                </label>
                <p className="search-form__shorts-text">Короткометражки</p>
            </div>
        </div>
    );
};

export default SearchForm;