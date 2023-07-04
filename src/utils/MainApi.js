import { BASE_URL } from "./constants";
import { HEADERS } from "./constants";

const handleResponse = (res) => {
    return res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`);
}

export const registerUser = ({ name, email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    })
        .then((res) => { return handleResponse(res) });
};


export const loginUser = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => { return handleResponse(res) })
};

export const verificationUserToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => { return handleResponse(res) });
};

export const getUserInfo = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'} ,
    })
        .then((res) => { return handleResponse(res) })
};

export const updateUserInfo = ({ name, email, password }) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({ name, email, password })
    })
        .then((res) => { return handleResponse(res) })
};

export const getUserMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'} ,
    })
        .then((res) => { return handleResponse(res) })
};

export const createUserMovies = (film) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(film)
    })
        .then((res) => { return handleResponse(res) })
};

export const deleteUserMovies = (filmID) => {
    console.log(filmID)
    return fetch(`${BASE_URL}/movies/${filmID}`, {
        method: 'DELETE',
        headers: HEADERS,
    })
        .then((res => { return handleResponse(res) }))
};
