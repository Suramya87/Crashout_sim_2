export const popupTask = {
  name: "Popup",
  cost: 2,

  spawn(onClose) {
    const $screen = $("#screen");

    const top = Math.random() * ($screen.height() - 180);
    const left = Math.random() * ($screen.width() - 300);

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
      "Action Required: {verb} all {object}s now!",
    ];

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const message = getRandom(templates)
      .replace(/{verb}/g, getRandom(verbs))
      .replace(/{object}/g, getRandom(objects))
      .replace(/{subject}/g, getRandom(subjects));

    const triggerFakeUpdate = Math.random() < 0.1;

    const $popup = $(`
      <div class="popup-container">
        <div class="popup window-style" style="top: ${top}px; left: ${left}px; width: 300px; height: 180px;">
          <div class="popup-header">
            <p>System Notice</p>
            <p class="close-button">${triggerFakeUpdate ? "Restart" : "X"}</p>
          </div>
          <div class="popup-content" style="padding: 20px;">
            <p style="margin-bottom: 20px;">${message}</p>
            <div style="text-align: center;">
              <button class="close-btn">${triggerFakeUpdate ? "Restart" : "Close"}</button>
            </div>
          </div>
        </div>
      </div>
    `);

    $popup.draggable({ handle: ".popup-header" });
    $screen.append($popup);

    $popup.find(".close-btn, .close-button").on("click", () => {
      if (triggerFakeUpdate) {
        showFakeUpdate(() => {
          $popup.remove();
          if (onClose) onClose();
        });
      } else {
        $popup.remove();
        if (onClose) onClose();
      }
    });

    function showFakeUpdate(done) {
      const duration = Math.floor(Math.random() * 10000) + 5000; // 5 to 15 seconds
      const $overlay = $(`
        <div class="fake-update-overlay" style="
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: black;
          color: lime;
          font-family: monospace;
          font-size: 18px;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        ">
          <p>System Update in Progress...</p>
          <div class="progress-bar" style="
            width: 60%; height: 20px;
            background: #222;
            border: 1px solid #0f0;
            margin-top: 20px;
            position: relative;
            overflow: hidden;
          ">
            <div style="
              height: 100%; width: 0%;
              background: lime;
            "></div>
          </div>
        </div>
      `);

      $screen.append($overlay);
      const $bar = $overlay.find("div > div");

      let start = null;
      function animate(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        $bar.css("width", `${progress * 100}%`);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setTimeout(() => {
            $overlay.remove();
            done();
          }, 500);
        }
      }

      requestAnimationFrame(animate);
    }
  },
};
