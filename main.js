import { popupTask } from './tasks/popupTask.js';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
import { zoomTask } from './tasks/zoomTask.js';
>>>>>>> Stashed changes
=======
import { zoomTask } from './tasks/zoomTask.js';
>>>>>>> Stashed changes

const difficultyRatings = {
  A: 10,
  B: 7,
  C: 4
};

let currentRating = 'A';
let pointCap = difficultyRatings[currentRating];
let activePoints = 0;

<<<<<<< Updated upstream
<<<<<<< Updated upstream
const taskPool = [popupTask];
=======
const taskPool = [popupTask, zoomTask];
>>>>>>> Stashed changes
=======
const taskPool = [popupTask, zoomTask];
>>>>>>> Stashed changes

let crashoutLevel = 0;
const crashoutMax = 100;
let gameOver = false;

const crashoutBar = document.getElementById('crashout-bar');

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
    endGame();
  }
}

function endGame() {
  gameOver = true;
  alert('💥 Game Over: Crashout reached!');
  clearInterval(spawnInterval);
  clearInterval(stressInterval);
}

function trySpawnTask() {
  if (gameOver) return;

  const task = taskPool[Math.floor(Math.random() * taskPool.length)];

  if (activePoints + task.cost <= pointCap) {
    activePoints += task.cost;

    task.spawn(() => {
      activePoints -= task.cost;
    });
  }
}

// Slow stress logic (fills if active tasks, drains if none)
const stressInterval = setInterval(() => {
  if (gameOver) return;

  if (activePoints > 0) {
    crashoutLevel = Math.min(crashoutMax, crashoutLevel + 0.5);
  } else {
    crashoutLevel = Math.max(0, crashoutLevel - 0.5);
  }

  updateCrashoutBar();
}, 100); // Adjust speed here

const spawnInterval = setInterval(trySpawnTask, 2000);
