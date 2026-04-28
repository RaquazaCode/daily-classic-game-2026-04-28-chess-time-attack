import {
  advanceTime,
  clickSquare,
  createGame,
  renderGameToText,
  resetGame,
  startGame,
  togglePause
} from "./game-core.js";

const boardEl = document.querySelector("#board");
const statusEl = document.querySelector("#status");
const movesEl = document.querySelector("#moves");

const params = new URLSearchParams(window.location.search);
const manualMode = params.get("manual") === "1";
const autoStart = params.get("autostart") === "1";

const state = createGame();
if (autoStart) startGame(state);

function renderBoard() {
  boardEl.innerHTML = "";
  for (let row = 0; row < 8; row += 1) {
    for (let col = 0; col < 8; col += 1) {
      const square = document.createElement("button");
      square.className = `square ${(row + col) % 2 === 0 ? "light" : "dark"}`;
      square.type = "button";
      square.dataset.row = String(row);
      square.dataset.col = String(col);
      square.innerHTML = `<span class="coords">${String.fromCharCode(97 + col)}${8 - row}</span>`;
      square.addEventListener("click", () => {
        clickSquare(state, row, col);
        render();
      });
      boardEl.append(square);
    }
  }
}

function renderStatus() {
  statusEl.innerHTML = `
    <h2>Match State</h2>
    <div class="status-grid">
      <div class="status-pill">
        <strong>Phase</strong>
        <span>${state.phase}</span>
      </div>
      <div class="status-pill">
        <strong>Seed</strong>
        <span>${state.seed}</span>
      </div>
    </div>
    <p class="line"><strong>Note</strong><span>${state.note}</span></p>
  `;
}

function renderMoves() {
  movesEl.innerHTML = `
    <h2>Move Sheet</h2>
    <p>Full move list appears after the rules engine lands.</p>
  `;
}

function render() {
  renderBoard();
  renderStatus();
  renderMoves();
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    startGame(state);
    render();
  }
  if (event.code === "KeyP") {
    togglePause(state);
    render();
  }
  if (event.code === "KeyR") {
    resetGame(state, state.seed);
    render();
  }
});

if (!manualMode) {
  let last = performance.now();
  const tick = (now) => {
    const delta = now - last;
    last = now;
    advanceTime(state, delta);
    renderStatus();
    window.requestAnimationFrame(tick);
  };
  window.requestAnimationFrame(tick);
}

window.advanceTime = (ms) => {
  advanceTime(state, ms);
  render();
};

window.render_game_to_text = () => renderGameToText(state);

render();
