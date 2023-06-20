import React from "react";
import "./Techs.css";

const Techs = () => {
    return (
        <section id="techs" className="techs">
            <h3 className="techs__title">Технологии</h3>
            <p className="techs__subtitle">7 технологий</p>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__blocks">
                <li className="techs__block-text">HTML</li>
                <li className="techs__block-text">CSS</li>
                <li className="techs__block-text">JS</li>
                <li className="techs__block-text">React</li>
                <li className="techs__block-text">Git</li>
                <li className="techs__block-text">Express.js</li>
                <li className="techs__block-text">mongoDB</li>
            </ul>
        </section>
    )
}

export default Techs;