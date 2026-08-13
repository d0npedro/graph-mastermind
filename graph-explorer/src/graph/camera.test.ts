import { describe, expect, it } from "vitest";
import {
  ZOOM_MAX,
  ZOOM_MIN,
  clampZoom,
  screenToWorld,
  zoomToCursor,
} from "./camera";

describe("clampZoom", () => {
  it("clamps to 0.15–6", () => {
    expect(clampZoom(0.01)).toBe(ZOOM_MIN);
    expect(clampZoom(99)).toBe(ZOOM_MAX);
    expect(clampZoom(1.5)).toBe(1.5);
  });
});

describe("zoomToCursor", () => {
  it("keeps the world point under the cursor after zoom", () => {
    const camera = { x: 100, y: 40, k: 1 };
    const screenX = 220;
    const screenY = 160;
    const before = screenToWorld(camera, screenX, screenY);
    const next = zoomToCursor(camera, screenX, screenY, 2.4);
    const after = screenToWorld(next, screenX, screenY);
    expect(next.k).toBe(2.4);
    expect(after.x).toBeCloseTo(before.x, 10);
    expect(after.y).toBeCloseTo(before.y, 10);
  });

  it("clamps k while still keeping the cursor world point", () => {
    const camera = { x: 0, y: 0, k: 1 };
    const next = zoomToCursor(camera, 50, 50, 80);
    expect(next.k).toBe(ZOOM_MAX);
    const before = screenToWorld(camera, 50, 50);
    const after = screenToWorld(next, 50, 50);
    expect(after.x).toBeCloseTo(before.x, 10);
    expect(after.y).toBeCloseTo(before.y, 10);
  });
});
