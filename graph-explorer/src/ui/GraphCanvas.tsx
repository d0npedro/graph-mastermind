type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export function GraphCanvas({ canvasRef }: Props) {
  return (
    <canvas
      ref={canvasRef}
      data-testid="graph-canvas"
      className="absolute inset-0 h-full w-full touch-none"
    />
  );
}
