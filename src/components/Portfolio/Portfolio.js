import React from "react";
import './Portfolio.css';
import imageLink from '../../images/link.svg';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h5 className="portfolio__title">Портфолио</h5>
            <div className="portfolio__container">
                <div className="portfolio__item">
                <a className="portfolio__link" href="https://shkundinmihail.github.io/how-to-learn/" target="_blank" rel="noreferrer"><p className="portfolio__item-text">Статичный сайт</p></a>
                    <a className="portfolio__link" href="https://shkundinmihail.github.io/how-to-learn/" target="_blank" rel="noreferrer"><img className="portfolio__item-link" src={imageLink} alt="link" /></a>
                </div>
                <div className="portfolio__item">
                <a className="portfolio__link" href="https://shkundinmihail.github.io/russian-travel/" target="_blank" rel="noreferrer"><p className="portfolio__item-text">Адаптивный сайт</p></a>
                    <a className="portfolio__link" href="https://shkundinmihail.github.io/russian-travel/" target="_blank" rel="noreferrer"><img className="portfolio__item-link" src={imageLink} alt="link" /></a>
                </div>

                <div className="portfolio__item portfolio__item_not-line">
                <a className="portfolio__link" href="https://shkundinmihail.github.io/mesto/" target="_blank" rel="noreferrer"><p className="portfolio__item-text">Одностраничное приложение</p></a>
                    <a className="portfolio__link" href="https://shkundinmihail.github.io/mesto/" target="_blank" rel="noreferrer"> <img className="portfolio__item-link" src={imageLink} alt="link" /></a>
                </div>

            </div>
        </section>
    );
};

export default Portfolio;
