import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <h6 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h6>
                <div className='footer__container'>
                    <p className='footer__copyright'>&#169;&nbsp;{(new Date()).getFullYear()}</p>
                    <div className='footer__link-container'>
                        <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
                        <a className='footer__link' href='https://github.com/' target='_blank' rel="noreferrer">Github</a>
                    </div>
                </div>
            </footer>
        
    );
};

export default Footer;
