export const popupTask = {
  name: "Popup",
  cost: 2,

  spawn(onClose) {
    const screen = document.getElementById('screen');

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.style.top = Math.random() * (screen.clientHeight - 160) + 'px';
    popup.style.left = Math.random() * (screen.clientWidth - 260) + 'px';

    const verbs = ["fix", "restart", "hack", "scan", "encrypt", "delete", "quarantine", "sanitize"];
    const objects = ["system", "database", "firewall", "network", "disk", "email", "AI core"];
    const subjects = ["Admin", "AI", "Technician", "Operator", "Daemon", "System", "You"];
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

    const getRandom = arr => arr[Math.floor(Math.random() * arr.length)];
    const message = getRandom(templates)
      .replace(/{verb}/g, getRandom(verbs))
      .replace(/{object}/g, getRandom(objects))
      .replace(/{subject}/g, getRandom(subjects));

    popup.innerHTML = `
      <div class="popup-header">Popup</div>
      <div class="popup-content">
        ${message}<br/>
        <button>Close</button>
      </div>
    `;

    popup.querySelector('button').onclick = () => {
      popup.remove();
      if (onClose) onClose();
    };

    screen.appendChild(popup);
  }
};
