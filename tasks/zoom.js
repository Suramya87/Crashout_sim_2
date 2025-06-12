let zoomTaskActive = false;

export const zoomTask = {
  name: "Zoom Meeting",
  cost: 4,

  spawn(onClose) {
    if (zoomTaskActive) return;
    zoomTaskActive = true;

    const $screen = $("#screen");
    const top = Math.random() * ($screen.height() - 300);
    const left = Math.random() * ($screen.width() - 400);

    const participantCount = Math.floor(Math.random() * 3) + 2; // 0 to 4 (total: 1–5 participants)

    function getRandomColor() {
      const colors = ['#FF8A80', '#EA80FC', '#8C9EFF', '#80D8FF', '#A7FFEB', '#CCFF90', '#FFD180', '#FF9E80'];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function getRandomInitial() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return letters.charAt(Math.floor(Math.random() * letters.length));
    }

    const otherParticipants = [...Array(participantCount)].map((_, i) => `
      <div class="video-box participant" data-id="${i}" style="background-color: ${getRandomColor()}; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; position: relative;">
        ${getRandomInitial()}
        <div class="reaction" style="display:none; position: absolute; bottom: 4px; right: 6px;">👍</div>
      </div>
    `).join("");

    const $popup = $(`
      <div class="popup-container">
        <div class="popup zoom" style="top: ${top}px; left: ${left}px;">
          <div class="popup-header">
            <p>Zoom Meeting</p>
          </div>
          <div class="popup-content zoom-content">
            <div class="pre-meeting">
              <p>Meeting starting... Click "Join" to enter.</p>
              <button class="join-btn">Join</button>
            </div>
            <div class="meeting hidden">
              <div class="video-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                ${otherParticipants}
                <div class="video-box player hidden" style="background-color: gray; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; position: relative;">
                  YOU
                  <div class="reaction" style="position: absolute; bottom: 4px; right: 6px;">👍</div>
                </div>
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
    let reactionsDone = 0;

    function checkAllReacted() {
      if (playerReacted && reactionsDone == participantCount) {
        $popup.find(".leave-btn").removeClass("hidden");
      }
      if (reactionsDone == 0) {
        setTimeout(tryReaction, 2000 + Math.random() * 4000);
      }
    }

    $popup.find(".join-btn").on("click", () => {
      $popup.find(".pre-meeting").addClass("hidden");
      $popup.find(".meeting").removeClass("hidden");
      setTimeout(tryReaction, 2000 + Math.random() * 4000);
    });

    function tryReaction() {
      if (playerReacted) {
        setTimeout(tryReaction, 2000 + Math.random() * 4000);
        return;
      }
      $popup.find(".video-box.participant").each((_, box) => {
        setTimeout(() => {
          $(box).find(".reaction").fadeIn(400);
          reactionsDone++;
          checkAllReacted();
          setTimeout(() => {
            $(box).find(".reaction").fadeOut(400);
            reactionsDone--;
            checkAllReacted();
          }, 3000 + Math.random() * 2000);
        }, Math.random() * 2000);
      });
     }

    $popup.find(".thumbs-up-btn").on("click", () => {
      if (!playerReacted) {
        $popup.find(".video-grid .player").removeClass("hidden");
        playerReacted = true;
        checkAllReacted();
      } else {
        $popup.find(".video-grid .player").addClass("hidden");
        playerReacted = false;
      }
    });

    function cleanupAndClose() {
      $popup.remove();
      zoomTaskActive = false;
      if (onClose) onClose();
    }

    $popup.find(".leave-btn").on("click", cleanupAndClose);
    // Removed .close-button entirely — not even in DOM

    $popup.draggable({ handle: ".popup-header" });
    $screen.append($popup);
  },
};
