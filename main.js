'use strict'

const input = document.querySelector('.hero-form__input');
const btnSubmit = document.querySelector('.hero-form__button')
const gender = document.querySelector('.gender');
const height = document.querySelector('.hright');
const width = document.querySelector('.width');
const planets = document.querySelector('.planets');
const eye = document.querySelector('.color-eye');


btnSubmit.addEventListener('click', (e) => {
  e.preventDefault

  console.log('ckick');
})

const sendData = (data) => {
  return fetch('https://swapi.dev/people/1/', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
};
