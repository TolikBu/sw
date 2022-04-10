'use strict'

const input = document.querySelector('.hero-form__input');
const form = document.querySelector('.hero-form');
const btnSubmit = document.querySelector('.hero-form__button')
const statusBlock = document.createElement('div');



// функция получение параметров персонажа
const sendPeople = (url) => {
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
    } else {
      statusBlock.textContent = 'Введите исло от 1 до 87';
      form.after(statusBlock)
      setTimeout(() => {
        statusBlock.remove(form);
      }, 2000);
    }
  })
};

// функция получения планеты
const sendPlanets = (url) => {
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
const render = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = input.value;
    // id = Number(id)

    sendPeople(`https://swapi.dev/api/people/${id}/`).catch((error) => {
      statusBlock.textContent = 'Проблемы с сетью';
      form.after(statusBlock)
      setTimeout(() => {
        statusBlock.remove(form);
      }, 2000);
    });

    sendPlanets(`https://swapi.dev/api/planets/${id}/`).catch((error) => {
      console.log(error);
    });

    input.value = '';
  });
 
}
render();
 
  // валидация ввода цифр
  // const validate = () => {
  //   console.log(input.value);
  //   if (input.value.match(/[0-9]/gi)) {
  //     render();
  //   } else {
  //     statusBlock.textContent = 'Введите число';
  //     form.after(statusBlock)
  //     setInterval(() => {
  //       statusBlock.remove(form);
  //     }, 2000);
  //   }
  // };
  // validate()

// функция стилей блока с предупреждением 
const error = () => {
  statusBlock.style.padding = '9px 10px';
  statusBlock.style.color = 'red';
}
error()

