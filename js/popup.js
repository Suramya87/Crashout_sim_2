let popupId = 0;

const templates = [
  "You must {verb} the {object} before it's too late!",
  "{object} is {verb}ing again!",
  "Quick! {verb} the {object}!",
  "Reminder: {subject} needs to {verb} the {object}.",
  "Warning: {object} has been {verb}ed!",
  "Do not {verb} the {object} unless authorized.",
  "Urgent: Your {object} has been {verb}ed by {subject}.",
  "Action Required: {verb} all {object}s now!",
];

const verbs = [
  "fix",
  "restart",
  "hack",
  "scan",
  "encrypt",
  "delete",
  "quarantine",
  "sanitize",
];
const objects = [
  "system",
  "database",
  "firewall",
  "network",
  "disk",
  "email",
  "AI core",
];
const subjects = [
  "Admin",
  "AI",
  "Technician",
  "Operator",
  "Daemon",
  "System",
  "You",
];

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
  const top = Math.random() * (window.innerHeight - 160);
  const left = Math.random() * (window.innerWidth - 260);
  const message = generateMessage();

  const popup = $(`
    		<div class="popup-container">
          <div class="popup" style="top: ${top}px; left: ${left}px;">
              <div class="popup-header">
                <p>Popup #${++popupId}</p>
                <p class="close-button">X</p>
              </div>
              <div class="popup-content">
                  ${message}<br/>
                  <button class="close-btn">Close</button>
              </div>
          </div>
        </div>
    `);

  popup.find(".close-btn").on("click", function () {
    $(this).closest(".popup").remove();
  });
  popup.find(".close-button").on("click", function () {
    $(this).closest(".popup").remove();
  });

  popup.draggable({
    handle: ".popup-header",
    drag: () => {},
  });

  $("#desktop").append(popup);
}

setInterval(createPopup, 16000);
