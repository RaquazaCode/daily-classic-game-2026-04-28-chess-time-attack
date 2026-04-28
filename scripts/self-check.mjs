import { createGame, renderGameToText, startGame } from "../src/game-core.js";

const state = createGame(20260428);
startGame(state);

const payload = JSON.parse(renderGameToText(state));

if (payload.phase !== "running") {
  throw new Error(`expected running phase, got ${payload.phase}`);
}

console.log("self-check scaffold complete");
