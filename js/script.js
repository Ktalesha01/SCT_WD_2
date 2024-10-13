let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapTimes = [];

const startBtn = document.getElementById('startButton');
const pauseBtn = document.getElementById('pauseButton');
const resetBtn = document.getElementById('resetButton');
const lapBtn = document.getElementById('lapButton');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapTimesList = document.getElementById('laps');
const rotateDisplay= document.getElementById('rotateDisplay');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateStopwatch, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    rotateDisplay.classList.add('borderMoving');
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    rotateDisplay.classList.remove('borderMoving');

}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    startTime = 0;
    lapTimes = [];
  //  updateStopwatch();
  minutesElement.textContent = padZero(0);
  secondsElement.textContent = padZero(0);
  millisecondsElement.textContent = padZero(0);

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapTimesList.innerHTML = '';
    rotateDisplay.classList.remove('borderMoving');

}

function recordLap() {
    const lapTime = elapsedTime;
    lapTimes.push(lapTime);
    const lapTimeElement = document.createElement('li');
    lapTimeElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
    lapTimesList.appendChild(lapTimeElement);
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    minutesElement.textContent = padZero(minutes);
    secondsElement.textContent = padZero(seconds);
    millisecondsElement.textContent = padZero(milliseconds);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
}

function padZero(value) {
    return (value < 10 ? '0' : '') + value;
}