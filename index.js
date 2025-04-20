let timerInterval;
let timeLeft = 0;
let isRunning = false;
const timerDisplay = document.getElementById("timer");

const timerModes = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

function startTimer(d) {
    if (isRunning) return;
    isRunning = true;
    timeLeft = d;
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    timeLeft = timerModes.work;
    updateDisplay();
}


function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    } else {
        stopTimer();
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchMode(mode) {
    if (isRunning) pauseTimer();
    timeLeft = timerModes[mode];
    updateDisplay();
}

// Initialize with work mode
resetTimer();

document.getElementById('startBtn').addEventListener('click', () => startTimer(timeLeft));
document.getElementById('StopBtn').addEventListener('click', stopTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

document.querySelectorAll('.shortBreakBtn').forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
});

document.querySelectorAll('.longBreakBtn').forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
});
