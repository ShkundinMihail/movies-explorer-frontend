/* eslint-disable no-useless-escape */
export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const BASE_URL = 'https://api.movies-explorer.skh59.nomoredomains.rocks';
//export const BASE_URL = 'http://localhost:3005';
export const MOVIE_URL = ' https://api.nomoreparties.co';
export const HEADERS = { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' };
export const CYRILLIC_REGEX = /[а-я]/i;
export const FILMS_FROM_LOCAL_STORAGE = localStorage.getItem('movies');
export const STATUS_SHORT_FILMS_CHECKBOX_FROM_LOCAL_STORAGE = localStorage.getItem('checkboxShortFilms');
export const SEARCH_TEXT_FROM_LOCAL_STORAGE = localStorage.getItem('searchText');
export const TOKEN = localStorage.getItem('token');

