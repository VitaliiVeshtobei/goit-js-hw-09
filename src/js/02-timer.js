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
  intervalId: null,
  deltaTime: null,
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
    deltaTime = endTime - startTime;
    const time = convertMs(deltaTime);

    updateClockFace(time);
  },
  startTimer() {
    if (options.isActive) {
      return;
    }

    options.isActive = true;

    const endTimer = deltaTime + Date.now();

    options.intervalId = setInterval(() => {
      if (
        refs.days.textContent === '00' &&
        refs.hours.textContent === '00' &&
        refs.minutes.textContent === '00' &&
        refs.seconds.textContent === '00'
      ) {
        return clearInterval(options.intervalId);
      }
      const deltaTimer = endTimer - Date.now();
      const timer = convertMs(deltaTimer);
      updateClockFace(timer);
    }, 1000);
  },
};

flatpickr(refs.inputDataTime, options);

function onClickBtnStart(evt) {
  options.startTimer();
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(`${days}`);
  refs.hours.textContent = addLeadingZero(`${hours}`);
  refs.minutes.textContent = addLeadingZero(`${minutes}`);
  refs.seconds.textContent = addLeadingZero(`${seconds}`);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
