import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDataTime: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
};
refs.btnStart.addEventListener('click', onClickBtnStart);

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      window.alert('Please choose a date in the future');
    }
    refs.btnStart.disabled = false;

    console.log(selectedDates[0]);

    const startTime = Date.now();
    // console.log(diferenceTime);
    // console.log(startTime);
    // console.log(endTime);
    setInterval(() => {
      const endTime = Date.now(selectedDates[0]);
      const diferenceTime = endTime - startTime;
      console.log(convertMs(diferenceTime));
    }, 1000);
  },
};
flatpickr(refs.inputDataTime, options);

function onClickBtnStart(evt) {
  console.log('click');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// const timer = {
//   start() {
//     setInterval(() => {
//       const currentTime = Date.now();
//       console.log(currentTime);
//     }, 1000);
//   },
// };
// timer.start();
