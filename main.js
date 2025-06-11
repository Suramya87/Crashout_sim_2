import { popupTask } from './tasks/popupTask.js';
import { zoomTask } from './tasks/zoom.js';
import { doMathTask } from './tasks/doMathTask.js';

const difficultyRatings = {
  D: 4,
  C: 6,
  B: 8,
  A: 10,
  S: 12
};

const difficultyOrder = ['D', 'C', 'B', 'A', 'S'];

let currentDifficultyIndex = 0;
let currentRating = difficultyOrder[currentDifficultyIndex];
let pointCap = difficultyRatings[currentRating];

let activePoints = 0;

const taskPool = [popupTask, zoomTask, doMathTask];
const totalTasksToComplete = parseInt(prompt("How many tasks to complete to win?"), 10) || 10;
let completedTasks = 0;

// Timer setup
let timeLimit = parseInt(prompt("How many seconds do you want to play? (Leave blank for default: 3s per task)"), 10);
if (isNaN(timeLimit)) {
  timeLimit = totalTasksToComplete * 3; // default: 3 seconds per task
}
let timeLeft = timeLimit;

let crashoutLevel = 0;
const crashoutMax = 100;
let gameOver = false;

// UI Elements
const crashoutBar = document.getElementById('crashout-bar');
const tasksLeftDisplay = document.getElementById('tasks-left');
const difficultyDisplay = document.getElementById('difficulty-level');
const timerDisplay = document.getElementById('timer');

function updateUI() {
  tasksLeftDisplay.textContent = `Tasks Left: ${totalTasksToComplete - completedTasks}`;
  difficultyDisplay.textContent = `Difficulty Level: ${currentRating}`;
  if (timerDisplay) timerDisplay.textContent = `Time Left: ${timeLeft}s`;
}

function updateCrashoutBar() {
  const percentage = (crashoutLevel / crashoutMax) * 100;
  crashoutBar.style.width = percentage + '%';

  if (percentage < 33) {
    crashoutBar.style.backgroundColor = 'green';
  } else if (percentage < 66) {
    crashoutBar.style.backgroundColor = 'yellow';
  } else {
    crashoutBar.style.backgroundColor = 'red';
  }

  if (crashoutLevel >= crashoutMax) {
    endGame('crash');
  }
}

function endGame(reason) {
  gameOver = true;
  clearInterval(spawnInterval);
  clearInterval(stressInterval);
  clearInterval(difficultyInterval);
  clearInterval(timerInterval);

  if (reason === 'win') {
    alert('You win! All tasks completed.');
  } else if (reason === 'time') {
    alert("You survived! Time's up.");
  } else {
    alert('Game Over');
  }
}

function trySpawnTask() {
  if (gameOver) return;

  const task = taskPool[Math.floor(Math.random() * taskPool.length)];

  if (activePoints + task.cost <= pointCap) {
    activePoints += task.cost;

    task.spawn(() => {
      activePoints -= task.cost;
      completedTasks++;

      if (completedTasks >= totalTasksToComplete) {
        endGame('win');
      }

      updateUI();
    });
  }
}

// Stress logic
const stressInterval = setInterval(() => {
  if (gameOver) return;

  crashoutLevel = activePoints > 0
    ? Math.min(crashoutMax, crashoutLevel + 0.5)
    : Math.max(0, crashoutLevel - 0.5);

  updateCrashoutBar();
}, 400);

// Spawn tasks
const spawnInterval = setInterval(trySpawnTask, 2000);

// Difficulty scaling
const difficultyInterval = setInterval(() => {
  if (gameOver) return;

  const tasksPerLevel = Math.ceil(totalTasksToComplete / (difficultyOrder.length - 1));
  const newIndex = Math.min(
    Math.floor(completedTasks / tasksPerLevel),
    difficultyOrder.length - 1
  );

  if (newIndex !== currentDifficultyIndex) {
    currentDifficultyIndex = newIndex;
    currentRating = difficultyOrder[currentDifficultyIndex];
    pointCap = difficultyRatings[currentRating];
    updateUI();
  }
}, 1000);

// Countdown timer
const timerInterval = setInterval(() => {
  if (gameOver) return;
  timeLeft--;
  updateUI();

  if (timeLeft <= 0) {
    endGame('time');
  }
}, 1000);

// Init UI
updateUI();
