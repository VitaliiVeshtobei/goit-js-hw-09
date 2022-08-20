import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDataTime: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.addEventListener('click', onClickBtnStart);

refs.btnStart.disabled = true;

const options = {
  isActive: false,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      window.alert('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
    const startTime = options.defaultDate;
    const endTime = selectedDates[0];
    const diferenceTime = endTime - startTime;
    const time = convertMs(diferenceTime);

    updateClockFace(time);
  },
  // startTimer() {
  //   if (this.isActive) {
  //     return;
  //   }

  //   const startTime = Date.now();
  //   this.isActive = true;
  //   const endTime = Date.now(selectedDates[0]);
  //   const diferenceTime = endTime - startTime;

  //   console.log(this.isActive);

  //   setInterval(() => {
  //     console.log(convertMs(diferenceTime));
  //   }, 1000);
  // },
};

flatpickr(refs.inputDataTime, options);

function onClickBtnStart(evt) {}
console.log(refs.days.textContent);
function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
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
