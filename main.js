'use strict'

const input = document.querySelector('.hero-form__input');
const form = document.querySelector('.hero-form');
const btnSubmit = document.querySelector('.hero-form__button')
const statusBlock = document.createElement('div');



// функция получение параметров персонажа
const renderPeople = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (res.ok) {
      res.json().then((data) => {
        document.querySelector('.hero-card__name').textContent = data.name;
        document.querySelector('.gender').textContent = data.gender;
        document.querySelector('.height').textContent = data.height;
        document.querySelector('.width').textContent = data.mass;
        document.querySelector('.color-eye').style.backgroundColor = data.eye_color;
      })
    }
  })
};

// функция получения планеты
const renderPlanets = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (res.ok) {
      res.json().then((data) => {
        document.querySelector('.planets').textContent = data.name;
      })
    }
  })
};

// функция отрисовки полученных пааметров
const requestData = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = input.value;
    let isError = false;

    if (!/[\d]/g.test(input.value) && input.value !== '') {
      statusBlock.textContent = 'Введите исло от 1 до 87';
      form.after(statusBlock)
      setTimeout(() => {
        statusBlock.remove(form);
      }, 2000);
    }

    if (!isError) {
      renderPeople(`https://swapi.dev/api/people/${id}/`).catch((error) => {
        statusBlock.textContent = 'Проблемы с сетью';
        form.after(statusBlock)
        setTimeout(() => {
          statusBlock.remove(form);
        }, 2000);
      });

      renderPlanets(`https://swapi.dev/api/planets/${id}/`).catch((error) => {
        console.log(error);
      });

      input.value = '';
    }

  });

}
requestData();

// функция стилей блока с предупреждением 
const error = () => {
  statusBlock.style.padding = '9px 10px';
  statusBlock.style.color = 'red';
}
error()

