export const popupTask = {
  name: "Popup",
  cost: 2,

  spawn(onClose) {
    const $screen = $("#screen");

    const top = Math.random() * ($screen.height() - 160);
    const left = Math.random() * ($screen.width() - 260);

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

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const message = getRandom(templates)
      .replace(/{verb}/g, getRandom(verbs))
      .replace(/{object}/g, getRandom(objects))
      .replace(/{subject}/g, getRandom(subjects));

    const $popup = $(`
            <div class="popup-container">
              <div class="popup" style="top: ${top}px; left: ${left}px;">
                  <div class="popup-header">
                    <p>Popup</p>
                    <p class="close-button">X</p>
                  </div>
                  <div class="popup-content">
                      ${message}<br/>
                      <button class="close-btn">Close</button>
                  </div>
              </div>
            </div>
        `);

    $popup.find(".close-btn").on("click", function () {
      $popup.remove();
      if (onClose) onClose();
    });

    $popup.draggable({
      handle: ".popup-header",
      drag: () => {},
    });

    $screen.append($popup);
  },
};
