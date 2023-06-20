import React from "react";
import './Portfolio.css';
import imageLink from '../../images/link.png';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h5 className="portfolio__title">Портфолио</h5>
            <article className="portfolio__container">
                <div className="portfolio__item">
                <a className="portfolio__link" href="https://shkundinmihail.github.io/how-to-learn/" target="__blank"><p className="portfolio__item-text">Статичный сайт</p></a>
                    <a className="portfolio__link" href="https://shkundinmihail.github.io/how-to-learn/" target="__blank"><img className="portfolio__item-link" src={imageLink} alt="link" /></a>
                </div>
                <div className="portfolio__item">
                <a className="portfolio__link" href="https://shkundinmihail.github.io/russian-travel/" target="__blank"><p className="portfolio__item-text">Адаптивный сайт</p></a>
                    <a className="portfolio__link" href="https://shkundinmihail.github.io/russian-travel/" target="__blank"><img className="portfolio__item-link" src={imageLink} alt="link" /></a>
                </div>

                <div className="portfolio__item portfolio__item_not-line">
                <a className="portfolio__link" href="https://shkundinmihail.github.io/mesto/" target="__blank"><p className="portfolio__item-text">Одностраничное приложение</p></a>
                    <a className="portfolio__link" href="https://shkundinmihail.github.io/mesto/" target="__blank"> <img className="portfolio__item-link" src={imageLink} alt="link" /></a>
                </div>

            </article>
        </section>
    );
};

export default Portfolio;
