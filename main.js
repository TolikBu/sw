'use strict'

const input = document.querySelector('.hero-form__input');
const btnSubmit = document.querySelector('.hero-form__button')
const gender = document.querySelector('.gender');
const height = document.querySelector('.hright');
const width = document.querySelector('.width');
const planets = document.querySelector('.planets');
const eye = document.querySelector('.color-eye');
const statusBlock = document.createElement('div');


const enterNum = () => {
  input.addEventListener('change', (item) => {
    let id = item.target.value;

    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();

      sendData(`https://swapi.dev/api/people/${id}/`);
      id = '';
      input.value = '';
    })
  })
}
enterNum();

const sendData = (url) => {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (!res.ok) {
      return res.json();
    }

    return res.json().then(error => {
      console.log(error);
    });
  }).then(res => console.log(res))
  
};