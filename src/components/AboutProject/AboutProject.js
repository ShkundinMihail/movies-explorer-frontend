import React from "react";
import './AboutProject.css';

const AboutProject = () => {
    return (
        <section id="about-project" className="about-project">
            <h2 className="about-project__title">О проекте</h2>
           <div className="about-project__block">
                 <article className="about-project__info-block">
                    <h3 className="about-project__info-block-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__info-block-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className="about-project__info-block">
                    <h3 className="about-project__info-block-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__info-block-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article> 
            </div>
            <ul className="about-project__line">
                <li className="about-project__line-text about-project__line-text_green">1 неделя</li>
                <li className="about-project__line-text about-project__line-text_gray">4 недели</li>
                <li className="about-project__line-text about-project__line-text_gray-text">Back-end</li>
                <li className="about-project__line-text about-project__line-text_gray-text">Front-end</li>
            </ul>
        </section>
    );
};

export default AboutProject;
