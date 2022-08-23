import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btn: document.querySelector('[type="submit"]'),
};
console.log(refs.btn);

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', onInput);

let formData = {};
let counterPosition = 0;

function onSubmit(evt) {
  evt.preventDefault();
  refs.btn.disabled = true;
  setTimeout(() => {
    let counterDelay = Number(formData.delay);
    console.log(formData);
    let intervalId = null;
    intervalId = setInterval(() => {
      if (counterPosition !== Number(formData.amount)) {
        counterPosition += 1;
        counterDelay += Number(formData.step);
        return createPromise(counterPosition, counterDelay)
          .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });
      }
      clearInterval(intervalId);
      refs.btn.disabled = false;
      counterPosition = 0;
    }, formData.step);
  }, formData.delay);
}
function onInput(evt) {
  formData[evt.target.name] = evt.target.value;
  console.log(formData);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
