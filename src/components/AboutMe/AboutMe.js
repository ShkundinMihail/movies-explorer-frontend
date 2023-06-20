import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/myPhoto.jpg';

const AboutMe = () => {
    return (
        <section id='student' className="about-me" >
            <h4 className='about-me__title'>Студент</h4>
            <div className="about-me__content">
                <div className="about-me__text-block">
                    <p className="about-me__text-block-title">Михаил</p>
                    <p className="about-me__text-block-subtitle">Фронтенд-разработчик, 33 года</p>
                    <p className="about-me__text-block-text">Я родился и живу в Рославле, закончиваю факультет электроэнергетики БГАУ. У меня есть жена
                        и сын. Я люблю слушать музыку, а ещё увлекаюсь тяжелой атлетикой. Недавно начал кодить. С 2015 года работал в компании «Россети». После того, как прошёл курс по веб-разработке и ушёл с постоянной работы.</p>
                    <a className="about-me__text-block-link" href='https://github.com/ShkundinMihail' target='_blank' rel="noreferrer">Github</a>
                </div>
                <img className='about-me__image' src={myPhoto} alt='myPhoto' />
            </div>
        </section>

    )
};

export default AboutMe;