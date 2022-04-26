'use strict';

const form = document.querySelector('.hero-form');
const input = form.querySelector('.hero-form__input');
const statusBlock = document.querySelector('.hero-error');
const planet = document.querySelector('.planets');
const name = document.querySelector('.hero-card__name');
const gender = document.querySelector('.gender');
const height = document.querySelector('.height');
const mass = document.querySelector('.width');
const colorEye = document.querySelector('.color-eye');

//блок с текстом ошибки
const showError = (text) => {
  statusBlock.textContent = text;
  statusBlock.style.display = 'block';
  setTimeout(() => {
    statusBlock.style.display = 'none';
  }, 2000);
};

//валидация на число
const checkValid = (str) => {
  return !/[\d]/g.test(str) && str !== ' ';
};

// функция получение параметров персонажа
const getPeople = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) return res.json();

      if (res.status === 404) showError('Данного персонажа не существует, попробуйте еще раз');

      showError('Не известная ошибка');
    })
    .catch((error) => {
      showError('Ошибка:', error.message);
    });
};

// функция получения планеты
const getPlanet = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) return res.json();

      if (res.status === 404) showError('Планета не найдена');

      showError('Не известная ошибка');
    })
    .catch((error) => showError('Ошибка:', error.message));
    
};

// функция отрисовки полученных пааметров
const requestData = () => {
  const idPeople = input.value;

  if (checkValid(input.value)) {
    showError('Введите число');
    return;
  }

  getPeople(`https://swapi.dev/api/people/${idPeople}/`)
  .then((person) => {
    getPlanet(person.homeworld).then((homeWorld) => {
      renderPerson(person, homeWorld);
    });
  });
};

const renderPerson = (person, homeWorld) => {

  name.textContent = person.name;
  gender.textContent = person.gender;
  height.textContent = person.height;
  mass.textContent = person.mass;
  colorEye.style.backgroundColor = person.eye_color;
  planet.textContent = homeWorld.name;
}

// функция отправки формы
form.addEventListener('submit', (e) => {
  e.preventDefault();
  requestData();
});
