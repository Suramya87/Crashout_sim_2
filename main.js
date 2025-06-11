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

let crashoutLevel = 0;
const crashoutMax = 100;
let gameOver = false;

// UI Elements
const crashoutBar = document.getElementById('crashout-bar');
const tasksLeftDisplay = document.getElementById('tasks-left');
const difficultyDisplay = document.getElementById('difficulty-level');

function updateUI() {
  tasksLeftDisplay.textContent = `Tasks Left: ${totalTasksToComplete - completedTasks}`;
  difficultyDisplay.textContent = `Difficulty Level: ${currentRating}`;
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
    endGame(false);
  }
}

function endGame(victory) {
  gameOver = true;
  clearInterval(spawnInterval);
  clearInterval(stressInterval);
  clearInterval(difficultyInterval);
  alert(victory ? 'You win! All tasks completed.' : 'Game Over');
}

function trySpawnTask() {
  if (gameOver) return;

  const task = taskPool[Math.floor(Math.random() * taskPool.length)];

  if (activePoints + task.cost <= pointCap) {
    activePoints += task.cost;

    task.spawn(() => {
      activePoints -= task.cost;
      completedTasks++;

      // Check for win
      if (completedTasks >= totalTasksToComplete) {
        endGame(true);
      }

      updateUI();
    });
  }
}

// Gradual stress logic
const stressInterval = setInterval(() => {
  if (gameOver) return;

  if (activePoints > 0) {
    crashoutLevel = Math.min(crashoutMax, crashoutLevel + 0.5);
  } else {
    crashoutLevel = Math.max(0, crashoutLevel - 0.5);
  }

  updateCrashoutBar();
}, 400);

// Try to spawn a task periodically
const spawnInterval = setInterval(trySpawnTask, 2000);

// Automatically raise difficulty every few tasks
const difficultyInterval = setInterval(() => {
  if (gameOver) return;

  // Increase difficulty every X completed tasks
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
}, 1000); // Check every second

// Initial UI setup
updateUI();
