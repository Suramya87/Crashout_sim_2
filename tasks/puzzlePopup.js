export const puzzlePopup = {
  name: "Puzzle Popup",
  cost: 3,

  spawn(onClose) {
    const $screen = $("#screen");
    const top = Math.random() * ($screen.height() - 500);
    const left = Math.random() * ($screen.width() - 420);

    const tiles = [...Array(8).keys()].map(n => n + 1);
    tiles.push(null); // blank tile

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function isSolved(state) {
      return state.slice(0, 8).every((v, i) => v === i + 1);
    }

    let puzzle = shuffle([...tiles]);

    const $popup = $(`
      <div class="popup-container">
        <div class="popup" style="top: ${top}px; left: ${left}px; width: 300px; height: 160px;">
          <div class="popup-header">
            <p>System Alert</p>
          </div>
          <div class="popup-content">
            <p>System corruption detected.</p>
            <button class="fix-now-btn">Fix Now</button>
          </div>
        </div>
      </div>
    `);

    $popup.draggable({ handle: ".popup-header" });
    $screen.append($popup);

    $popup.find(".fix-now-btn").on("click", () => {
      openPuzzleWindow();
    });

    function openPuzzleWindow() {
      const expanded = $(`
        <div class="popup expanded" style="top: ${top}px; left: ${left}px; width: 420px; height: 500px;">
          <div class="popup-header">
            <p>System Puzzle Fix</p>
            <p class="close-button" style="color: gray; cursor: not-allowed;">X</p>
          </div>
          <div class="popup-content" style="height: calc(100% - 40px); overflow: auto;">
            <p>Fix the corrupted system by solving the puzzle.</p>
            <div class="puzzle-grid" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 10px; margin: 20px auto;"></div>
            <div style="text-align: center; margin-top: 10px;">
              <button class="submit-btn" disabled>Submit Fix</button>
            </div>
          </div>
        </div>
      `);

      $popup.replaceWith(expanded);
      expanded.draggable({ handle: ".popup-header" });

      const $grid = expanded.find(".puzzle-grid");

      function renderGrid() {
        $grid.empty();
        puzzle.forEach((val, idx) => {
          const tile = $(`
            <div class="tile" draggable="true" style="
              width: 100px; height: 100px;
              background: ${val ? '#ccc' : 'white'};
              display: flex; align-items: center; justify-content: center;
              font-size: 24px; font-weight: bold;
              border: 2px solid #999; cursor: grab;
              user-select: none;
            ">${val || ""}</div>
          `);

          // Drag and drop event handlers
          tile.on("dragstart", (e) => {
            e.originalEvent.dataTransfer.setData("text/plain", idx);
            // Add dragging effect
            tile.css("opacity", "0.5");
          });

          tile.on("dragend", () => {
            tile.css("opacity", "1");
          });

          tile.on("dragover", (e) => {
            e.preventDefault(); // allow drop
            tile.css("border-color", "blue");
          });

          tile.on("dragleave", () => {
            tile.css("border-color", "#999");
          });

          tile.on("drop", (e) => {
            e.preventDefault();
            tile.css("border-color", "#999");

            const fromIdx = parseInt(e.originalEvent.dataTransfer.getData("text/plain"), 10);
            const toIdx = idx;

            // Only allow swap if one tile is blank
            if (puzzle[fromIdx] === null || puzzle[toIdx] === null) {
              [puzzle[fromIdx], puzzle[toIdx]] = [puzzle[toIdx], puzzle[fromIdx]];
              renderGrid();

              if (isSolved(puzzle)) {
                expanded.find(".submit-btn").prop("disabled", false).text("Fix Applied");
                expanded.find(".close-button").css({ color: "red", cursor: "pointer" });
              }
            }
          });

          $grid.append(tile);
        });
      }

      renderGrid();

      expanded.find(".submit-btn").on("click", () => {
        if (isSolved(puzzle)) {
          expanded.remove();
          if (onClose) onClose();
        }
      });

      expanded.find(".close-button").on("click", () => {
        if (isSolved(puzzle)) {
          expanded.remove();
          if (onClose) onClose();
        }
      });
    }
  },
};
