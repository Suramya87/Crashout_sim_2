import { popupTask } from './tasks/popupTask.js';
import { zoomTask } from './tasks/zoomTask.js'; 


const difficultyRatings = {
  A: 10,
  B: 7,
  C: 4
};

let currentRating = 'A';
let pointCap = difficultyRatings[currentRating];
let activePoints = 0;

const taskPool = [popupTask,zoomTask];

function trySpawnTask() {
  const task = taskPool[Math.floor(Math.random() * taskPool.length)];

  if (activePoints + task.cost <= pointCap) {
    task.spawn(() => {
      activePoints -= task.cost;
    });
    activePoints += task.cost;
  }
}

setInterval(trySpawnTask, 2000);
//this

