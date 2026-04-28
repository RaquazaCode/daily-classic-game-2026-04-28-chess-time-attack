export function createGame(seed = 20260428) {
  return {
    seed,
    phase: "title",
    note: "Scaffold pending full implementation."
  };
}

export function resetGame(state, seed = state.seed) {
  state.seed = seed;
  state.phase = "title";
  state.note = "Scaffold pending full implementation.";
}

export function startGame(state) {
  state.phase = "running";
}

export function togglePause(state) {
  if (state.phase === "running") state.phase = "paused";
  else if (state.phase === "paused") state.phase = "running";
}

export function advanceTime() {
  return null;
}

export function clickSquare() {
  return { ok: false, reason: "not implemented" };
}

export function renderGameToText(state) {
  return JSON.stringify(state);
}
