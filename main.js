'use strict'

const form = document.querySelector('.hero-form');
const input = form.querySelector('.hero-form__input');
const btnSubmit = form.querySelector('.hero-form__button')
const statusBlock = document.querySelector('.hero-error');
const planets = document.querySelector('.planets')
const name = document.querySelector('.hero-card__name');
const gender = document.querySelector('.gender');
const height = document.querySelector('.height');
const mass = document.querySelector('.width');
const colorEye = document.querySelector('.color-eye');
const textValid = 'Введите число от 1 до 83';
const texError = 'Проблемы с сетью';
const texErrorPeople = 'Данного персонажа не существует, попробуйте еще раз';



// функция получение параметров персонажа
const renderPeople = async (url) => {
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (res.ok) {
      res.json().then((data) => {
        name.textContent = data.name;
        gender.textContent = data.gender;
        height.textContent = data.height;
        mass.textContent = data.mass;
        colorEye.style.backgroundColor = data.eye_color;
      })
    } else {
      console.log(error);
    }
  }).catch((error) => {
    statusBlock.textContent = texErrorPeople;
    statusBlock.style.display = 'block';
    setTimeout(() => {
      statusBlock.style.display = 'none';
    }, 2000);
  });
};

// функция получения планеты
const renderPlanets = async (url) => {
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (res.ok) {

      res.json().then((data) => {
        planets.textContent = data.name;
      })
    } 
  }).catch((error) => {
    console.log(error);
  })
};


// функция отрисовки полученных пааметров
const requestData = () => {

  if (!/[\d]/g.test(input.value) && input.value !== ' ') {

    statusBlock.textContent = textValid;
    statusBlock.style.display = 'block';
    setTimeout(() => {
      statusBlock.style.display = 'none';
    }, 2000);
    
  } else {
    let idPeople = input.value;
    renderPeople(`https://swapi.dev/api/people/${idPeople}/`)

    // let idPlanets = idPeople(parseInt(idPeople.data.homeworld.match(/d+/), 10))

    renderPlanets(`https://swapi.dev/api/planets/${idPeople
}/`)
    
  }

  input.value = '';
  
}

// функция отправки формы 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  requestData();
});
