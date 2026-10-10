import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createAgentKnot,
  projectAgentPoint,
  agentFallbackPaths,
} from "../src/lib/agent-geometry.ts";

test("the animated wireframe stays finite and closed through a full rotation", () => {
  for (const line of createAgentKnot()) {
    assert.ok(Math.hypot(...line[0].map((n, i) => n - line.at(-1)[i])) < 1e-12);
    for (const angle of [0, Math.PI / 2, Math.PI, Math.PI * 1.5, Math.PI * 2]) {
      for (const point of line)
        assert.ok(projectAgentPoint(point, 0.65, angle).every(Number.isFinite));
    }
  }
});

test("the no-JavaScript fallback is deterministic SVG path data", () => {
  const first = agentFallbackPaths();
  assert.deepEqual(first, agentFallbackPaths());
  assert.equal(first.length, 15);
  assert.ok(
    first.every((path) => path.startsWith("M") && !/NaN|Infinity/.test(path)),
  );
});
