let popupId = 0;

// You can tune/add more types, subjects, verbs, and objects
const templates = [
  "You must {verb} the {object} before it's too late!",
  "{object} is {verb}ing again!",
  "Quick! {verb} the {object}!",
  "Reminder: {subject} needs to {verb} the {object}.",
  "Warning: {object} has been {verb}ed!",
  "Do not {verb} the {object} unless authorized.",
  "Urgent: Your {object} has been {verb}ed by {subject}.",
  "Action Required: {verb} all {object}s now!"
];

const verbs = ["fix", "restart", "hack", "scan", "encrypt", "delete", "quarantine", "sanitize"];
const objects = ["system", "database", "firewall", "network", "disk", "email", "AI core"];
const subjects = ["Admin", "AI", "Technician", "Operator", "Daemon", "System", "You"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMessage() {
  const template = getRandom(templates);
  return template
    .replace(/{verb}/g, getRandom(verbs))
    .replace(/{object}/g, getRandom(objects))
    .replace(/{subject}/g, getRandom(subjects));
}

function createPopup() {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.style.top = Math.random() * (window.innerHeight - 160) + 'px';
  popup.style.left = Math.random() * (window.innerWidth - 260) + 'px';

  const message = generateMessage();

  popup.innerHTML = `
    <div class="popup-header">Popup #${++popupId}</div>
    <div class="popup-content">
      ${message}<br/>
      <button onclick="this.closest('.popup').remove()">Close</button>
    </div>
  `;

  document.body.appendChild(popup);
}

setInterval(createPopup, 2000);
