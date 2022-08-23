const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};
console.log(refs.form);
console.log(refs.delay);
console.log(refs.step);
console.log(refs.amount);

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', onInput);

const formData = {};
let counterPosition = 0;
let counterDelay = 0;

function onSubmit(evt) {
  evt.preventDefault();
  // counterDelay = Number(formData.step);
  const intervalId = setInterval(() => {
    if (counterPosition !== Number(formData.amount)) {
      counterPosition += 1;
      counterDelay += Number(formData.step);
      return createPromise(counterPosition, formData.delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
    clearInterval(intervalId);
  }, counterDelay);
}
function onInput(evt) {
  formData[evt.target.name] = evt.target.value;
  console.log(formData);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
