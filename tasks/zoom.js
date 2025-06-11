export const zoomTask = {
  name: "Zoom Meeting",
  cost: 3,

  spawn(onClose) {
    const $screen = $("#screen");

    const top = Math.random() * ($screen.height() - 300);
    const left = Math.random() * ($screen.width() - 400);

    const $popup = $(`
      <div class="popup-container">
        <div class="popup zoom" style="top: ${top}px; left: ${left}px;">
          <div class="popup-header">
            <p>Zoom Meeting</p>
            <p class="close-button">X</p>
          </div>
          <div class="popup-content zoom-content">
            <div class="pre-meeting">
              <p>Meeting starting... Click "Join" to enter.</p>
              <button class="join-btn">Join</button>
            </div>
            <div class="meeting hidden">
              <div class="video-grid">
                ${[...Array(5)].map((_, i) => `
                  <div class="video-box" data-id="${i}">
                    <div class="face">🙂</div>
                    <div class="reaction" style="display:none;">👍</div>
                  </div>
                `).join("")}
              </div>
              <div class="controls">
                <button class="thumbs-up-btn">👍 React</button>
                <button class="leave-btn hidden">Leave Meeting</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    let playerReacted = false;

    // Join button
    $popup.find(".join-btn").on("click", () => {
      $popup.find(".pre-meeting").addClass("hidden");
      $popup.find(".meeting").removeClass("hidden");

      // Simulate others reacting at random times
      $popup.find(".video-box").each((_, box) => {
        setTimeout(() => {
          $(box).find(".reaction").fadeIn(300);
        }, 500 + Math.random() * 2000);
      });
    });

    // Player reaction
    $popup.find(".thumbs-up-btn").on("click", () => {
      if (!playerReacted) {
        const playerBox = $('<div class="video-box player"><div class="face">🧍</div><div class="reaction">👍</div></div>');
        $popup.find(".video-grid").append(playerBox);
        playerReacted = true;
        $popup.find(".leave-btn").removeClass("hidden");
      }
    });

    // Leave button
    $popup.find(".leave-btn").on("click", () => {
      $popup.remove();
      if (onClose) onClose();
    });

    // Manual close
    $popup.find(".close-button").on("click", () => {
      $popup.remove();
      if (onClose) onClose();
    });

    $popup.draggable({
      handle: ".popup-header"
    });

    $screen.append($popup);
  },
};
