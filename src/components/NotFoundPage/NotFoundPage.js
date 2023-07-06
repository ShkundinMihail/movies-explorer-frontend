import React from "react";
import './NotFoundPage.css';


const NotFoundPage = ({ navigate }) => {
    return (
        <section className="not-found-page">
            <h5 className="not-found-page__title">404</h5>
            <p className="not-found-page__text">Страница не найдена</p>
            <button onClick={() => { navigate(-1) }} className="not-found-page__button">Назад</button>
        </section>
    )
};

export default NotFoundPage;
