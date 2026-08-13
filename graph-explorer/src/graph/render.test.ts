import { describe, expect, it } from "vitest";
import { resizeCanvas } from "./render";

describe("resizeCanvas", () => {
  it("sizes the drawing buffer with devicePixelRatio clamped to 2", () => {
    const canvas = {
      width: 0,
      height: 0,
      style: { width: "", height: "" },
    } as HTMLCanvasElement;
    const dpr = resizeCanvas(canvas, 320, 180, 3.5);
    expect(dpr).toBe(2);
    expect(canvas.width).toBe(640);
    expect(canvas.height).toBe(360);
    expect(canvas.style.width).toBe("320px");
    expect(canvas.style.height).toBe("180px");
  });
});
