'use strict'

const input = document.querySelector('.hero-form__input');
const btnSubmit = document.querySelector('.hero-form__button')
const gender = document.querySelector('.gender');
const height = document.querySelector('.hright');
const width = document.querySelector('.width');
const planets = document.querySelector('.planets');
const eye = document.querySelector('.color-eye');


const enterNum = () => {
  input.addEventListener('input', (item) => {
    let num
    num = item.target.value
  })
}
enterNum();


const sendData = () => {
  return fetch('https://swapi.dev/api/people/4/', {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json()).then((res) => console.log(res));
};

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  sendData();

  input.value = ' ';
})




