import { describe, expect, it } from "vitest";
import { clampDpr } from "./dpr";

describe("clampDpr", () => {
  it("clamps devicePixelRatio to at most 2", () => {
    expect(clampDpr(1)).toBe(1);
    expect(clampDpr(1.5)).toBe(1.5);
    expect(clampDpr(3)).toBe(2);
    expect(clampDpr(4.5)).toBe(2);
  });
});
