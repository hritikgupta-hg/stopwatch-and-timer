//--------------------variables------------------------------
const stopwatchBtn = document.querySelector(".option-stopwatch");
const timerBtn = document.querySelector(".option-timer");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

//stopwatch
const timeStopwatch = document.querySelector(".watch .time");
const startBtnStopwatch = document.getElementById("start-stopwatch");
const stopBtnStopwatch = document.getElementById("stop-stopwatch");
const resetBtnStopwatch = document.getElementById("reset-stopwatch");

//timer
const timeTimer = document.querySelector(".time-timer");
const timerHr = document.querySelector("#timer-hr");
const timerMin = document.querySelector("#timer-min");
const timerSec = document.querySelector("#timer-sec");
const startBtnTimer = document.getElementById("start-timer");
const stopBtnTimer = document.getElementById("stop-timer");
const resetBtnTimer = document.getElementById("reset-timer");
const timerForm = document.querySelector(".timer-form");
const msg = document.querySelector(".message");

//------------------state variables-------------------------
let curSlide = 0;
const maxSlide = slides.length;
//stopwatch
let miliSecondsStopwatch = 0;
let secondsStopwatch = 0;
let minutesStopwatch = 0;
let hoursStopwatch = 0;
let intervalStopwatch = null;

//timer
let secondsTimer = 0;
let minutesTimer = 0;
let hoursTimer = 0;
let intervalTimer = null;

//-------------------Event listeners------------------------

//slider
stopwatchBtn.addEventListener("click", function () {
  stopwatchBtn.classList.add("active-option");
  timerBtn.classList.remove("active-option");
  prevSlide();
});

timerBtn.addEventListener("click", function () {
  timerBtn.classList.add("active-option");
  stopwatchBtn.classList.remove("active-option");
  nextSlide();
});

btnRight.addEventListener("click", function () {
  timerBtn.classList.add("active-option");
  stopwatchBtn.classList.remove("active-option");
  nextSlide();
});
btnLeft.addEventListener("click", function () {
  stopwatchBtn.classList.add("active-option");
  timerBtn.classList.remove("active-option");
  prevSlide();
});

//control buttons stopwatch
startBtnStopwatch.addEventListener("click", startStopwatch);
stopBtnStopwatch.addEventListener("click", stopStopwatch);
resetBtnStopwatch.addEventListener("click", resetStopwatch);

//control buttons timer
startBtnTimer.addEventListener("click", startTimer);
resetBtnTimer.addEventListener("click", resetTimer);

//---------------------functions------------------------

//slider
function goToSlide(slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
}

function nextSlide() {
  if (curSlide === maxSlide - 2) {
    btnRight.classList.add("hidden");
  }
  if (curSlide < maxSlide - 1) curSlide++;
  if (curSlide > 0) btnLeft.classList.remove("hidden");
  goToSlide(curSlide);
}

function prevSlide() {
  if (curSlide === 1) {
    btnLeft.classList.add("hidden");
  }
  if (curSlide > 0) curSlide--;

  if (curSlide < maxSlide - 1) btnRight.classList.remove("hidden");
  goToSlide(curSlide);
}

//Update Stopwatch
const stopwatch = function () {
  miliSecondsStopwatch += 50;
  if (miliSecondsStopwatch == 1000) {
    miliSecondsStopwatch = 0;
    secondsStopwatch++;
    if (secondsStopwatch == 60) {
      secondsStopwatch = 0;
      minutesStopwatch++;
      if (minutesStopwatch == 60) {
        minutesStopwatch = 0;
        hoursStopwatch++;
      }
    }
  }

  let hrs = hoursStopwatch < 10 ? "0" + hoursStopwatch : hoursStopwatch;
  let mins = minutesStopwatch < 10 ? "0" + minutesStopwatch : minutesStopwatch;
  let sec = secondsStopwatch < 10 ? "0" + secondsStopwatch : secondsStopwatch;
  let ms =
    miliSecondsStopwatch < 10
      ? "00" + miliSecondsStopwatch
      : miliSecondsStopwatch < 100
      ? "0" + miliSecondsStopwatch
      : miliSecondsStopwatch;

  timeStopwatch.textContent = `${hrs}:${mins}:${sec}:${ms}`;
};

//Start stopwatch on clicking stopwatch-start button
function startStopwatch() {
  if (intervalStopwatch) {
    return;
  }
  intervalStopwatch = setInterval(stopwatch, 50);
}

//pause stopwatch on clicking stopwatch-stop button
function stopStopwatch() {
  clearInterval(intervalStopwatch);
  intervalStopwatch = null;
}

//reset stopwatch on clicking stopwatch-reset button
function resetStopwatch() {
  stopStopwatch();
  hoursStopwatch =
    minutesStopwatch =
    secondsStopwatch =
    miliSecondsStopwatch =
      0;
  timeStopwatch.innerText = "00:00:00:000";
}

//update timer
const timer = function () {
  secondsTimer = secondsTimer - 1;
  if (secondsTimer == 0) {
    resetTimer();
    msg.classList.remove("hidden");
  }

  let hr = Math.floor(secondsTimer / 3600);
  let min = Math.floor((secondsTimer - hr * 3600) / 60);
  let sec = secondsTimer - (hr * 3600 + min * 60);

  hr = hr < 10 ? "0" + hr : hr;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  timeTimer.innerText = `${hr}:${min}:${sec}`;
};

//start timer
function startTimer() {
  if (intervalTimer) return;
  msg.classList.add("hidden");

  hoursTimer = +timerHr.value;
  minutesTimer = +timerMin.value;
  secondsTimer = +timerSec.value;

  secondsTimer = hoursTimer * 3600 + minutesTimer * 60 + secondsTimer;

  if (secondsTimer == 0) {
    console.log("Enter time greater than 0");
    return;
  }

  timeTimer.classList.remove("hidden");
  timerForm.style.display = "none";

  let hr = Math.floor(secondsTimer / 3600);
  let min = Math.floor((secondsTimer - hr * 3600) / 60);
  let sec = secondsTimer - (hr * 3600 + min * 60);
  hr = hr < 10 ? "0" + hr : hr;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  timeTimer.innerText = `${hr}:${min}:${sec}`;

  intervalTimer = setInterval(timer.bind(null, secondsTimer), 1000);
}

//reseting timer
function resetTimer() {
  msg.classList.add("hidden");
  timerHr.value = "";
  timerMin.value = "";
  timerSec.value = "";
  hoursTimer = minutesTimer = secondsTimer = 0;
  clearInterval(intervalTimer);
  intervalTimer = null;
  timerForm.style.display = "flex";
  timeTimer.innerText = `00:00:00`;
  timeTimer.classList.add("hidden");
}

const intit = function () {
  goToSlide(0);
  btnLeft.classList.add("hidden");
};

intit();

// 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
