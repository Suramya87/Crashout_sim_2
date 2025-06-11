export const doMathTask = {
  name: "Do Math",
  cost: 2,

  spawn(onClose) {
    const $screen = $("#screen");

    const top = Math.random() * ($screen.height() - 160);
    const left = Math.random() * ($screen.width() - 260);

    const operators = ["+", "-", "×"];
    const getRandomDigit = () => Math.floor(Math.random() * 9) + 1; // 1–9
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let a = getRandomDigit();
    let b = getRandomDigit();

    // Ensure subtraction never goes below 0
    if (operator === "-" && b > a) {
      [a, b] = [b, a]; // swap to avoid negative result
    }

    // Compute correct answer
    let answer;
    if (operator === "+") answer = a + b;
    else if (operator === "-") answer = a - b;
    else if (operator === "×") answer = a * b;

    const $popup = $(`
      <div class="popup-container">
        <div class="popup" style="top: ${top}px; left: ${left}px;">
          <div class="popup-header">
            <p>Quick Math</p>
            <p class="close-button">X</p>
          </div>
          <div class="popup-content">
            <p>Solve: <strong>${a} ${operator} ${b}</strong></p>
            <input type="number" class="math-answer" placeholder="Answer" />
            <button class="submit-btn">Submit</button>
            <p class="error-msg" style="color:red; display:none;">Wrong answer!</p>
          </div>
        </div>
      </div>
    `);

    $popup.find(".submit-btn").on("click", () => {
      const userInput = parseInt($popup.find(".math-answer").val(), 10);
      if (userInput === answer) {
        $popup.remove();
        if (onClose) onClose();
      } else {
        $popup.find(".error-msg").fadeIn(200).delay(1000).fadeOut(200);
      }
    });

    // Manual close (penalty-free for now—can change)
    $popup.find(".close-button").on("click", () => {
      $popup.remove();
      if (onClose) onClose();
    });

    $popup.draggable({
      handle: ".popup-header"
    });

    $screen.append($popup);
  }
};
