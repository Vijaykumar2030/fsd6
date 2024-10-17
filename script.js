const activityContainer = document.getElementById('activity-container');
const nextActivityButton = document.getElementById('next-activity-btn');
const restartButton = document.getElementById('restart-btn');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progress-bar');
const resultContainer = document.getElementById('result-container');

let schedule = [
  { activity: "Wake Up", duration: 300 },        // 5 minutes
  { activity: "Morning Run", duration: 600 },    // 10 minutes
  { activity: "Exercise", duration: 900 },       // 15 minutes
  { activity: "Shower", duration: 600 },         // 10 minutes
  { activity: "Breakfast", duration: 900 },      // 15 minutes
  { activity: "Reading", duration: 1200 }        // 20 minutes
];

let currentActivityIndex = 0, timer, timerInterval;

function startSchedule() {
  currentActivityIndex = 0;
  timer = schedule[currentActivityIndex].duration;
  resultContainer.classList.add('hidden');
  nextActivityButton.classList.remove('hidden');
  progressBar.style.width = '0%';
  displayActivity();
  startTimer();
}

function displayActivity() {
  resetState();
  const currentActivity = schedule[currentActivityIndex];
  activityContainer.querySelector('span#current-activity').innerText = currentActivity.activity;
  updateProgressBar();
}

function resetState() {
  clearInterval(timerInterval);
  timerElement.innerText = timer;
}

function nextActivity() {
  currentActivityIndex++;
  if (currentActivityIndex < schedule.length) {
    timer = schedule[currentActivityIndex].duration;
    displayActivity();
    startTimer();
  } else {
    clearInterval(timerInterval);
    showResult();
  }
}

function showResult() {
  resultContainer.classList.remove('hidden');
  nextActivityButton.classList.add('hidden');
}

function startTimer() {
  timerElement.innerText = timer;
  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      timerElement.innerText = timer;
    } else {
      clearInterval(timerInterval);
      nextActivity();
    }
  }, 1000);
}

function updateProgressBar() {
  const progress = ((currentActivityIndex + 1) / schedule.length) * 100;
  progressBar.style.width = `${progress}%`;
}

nextActivityButton.addEventListener('click', nextActivity);
restartButton.addEventListener('click', startSchedule);
window.onload = startSchedule;
