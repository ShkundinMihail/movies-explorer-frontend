import React from "react";
import './SearchForm.css';
import searchIcon from '../../images/iconSearch.png';
import searchFormButton from '../../images/findsearch.png';

const SearchForm = () => {
    return (
        <section className="search-form">
            <form className="search-form__form">
                <img className="search-form__image" src={searchIcon} alt="iconSearch" />
                <input className="search-form__input" type="text" placeholder="Фильм" required />
                <button className="search-form__button" type="submit" onClick={null}>
                    <img className="search-form__button-image" src={searchFormButton} alt="findsearch" />
                </button>
            </form>
            <div className="search-form__dividing-line"></div>
            <div className="search-form__shorts-container">
                <label className="search-form__shorts-button">
                    <input type="checkbox" className="search-form__shorts-checkbox" />
                    <span className="search-form__shorts-slider" />
                </label>
                <p className="search-form__shorts-text">Короткометражки</p>
            </div>
        </section>
    );
};

export default SearchForm;