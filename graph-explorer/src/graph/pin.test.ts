import { describe, expect, it } from "vitest";
import { applyNodeDrag, applyNodeRelease, isPinned, type Pinnable } from "./pin";

describe("pin / freeze", () => {
  it("pins fx/fy on drag", () => {
    const node: Pinnable = { x: 0, y: 0 };
    applyNodeDrag(node, 12, 34);
    expect(node.x).toBe(12);
    expect(node.y).toBe(34);
    expect(node.fx).toBe(12);
    expect(node.fy).toBe(34);
    expect(isPinned(node)).toBe(true);
  });

  it("keeps fx/fy on release when frozen", () => {
    const node = { x: 1, y: 2, fx: 1, fy: 2 };
    applyNodeRelease(node, true);
    expect(node.fx).toBe(1);
    expect(node.fy).toBe(2);
  });

  it("clears fx/fy on release when not frozen", () => {
    const node = { x: 1, y: 2, fx: 1, fy: 2 };
    applyNodeRelease(node, false);
    expect(node.fx).toBeNull();
    expect(node.fy).toBeNull();
  });
});
