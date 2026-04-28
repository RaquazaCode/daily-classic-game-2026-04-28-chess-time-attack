import test from "node:test";
import assert from "node:assert/strict";

import { createGame, renderGameToText, startGame } from "../src/game-core.js";

test("game can start from scaffold state", () => {
  const state = createGame(20260428);
  startGame(state);

  const payload = JSON.parse(renderGameToText(state));
  assert.equal(payload.phase, "running");
});
