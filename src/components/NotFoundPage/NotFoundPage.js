import React from "react";
import './NotFoundPage.css';
import { Link } from "react-router-dom";

const NotFoundPage = () => {
return (
    <section className="not-found-page">
        <h5 className="not-found-page__title">404</h5>
        <p className="not-found-page__text">Страница не найдена</p>
        <Link to="/" className="not-found-page__link">Назад</Link>
    </section>
)
};

export default NotFoundPage;
