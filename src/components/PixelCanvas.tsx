import { useEffect, useRef, type PointerEvent } from "react";
import { drawGridLines, drawPixels } from "../lib/pixels";

const GRID_LINE_COLOR = "#bebebe";

type PixelCanvasProps = {
  squares: readonly string[];
  gridSize: number;
  cellSize: number;
  showGrid: boolean;
  onPaintCell: (index: number) => void;
};

type Point = { x: number; y: number };

/** Map a viewport position to a board index, or null if it's off the board. */
function cellAt(canvas: HTMLCanvasElement, gridSize: number, p: Point) {
  // getBoundingClientRect includes CSS transforms, so this stays accurate
  // while the board is animating or resizing.
  const rect = canvas.getBoundingClientRect();
  const col = Math.floor(((p.x - rect.left) / rect.width) * gridSize);
  const row = Math.floor(((p.y - rect.top) / rect.height) * gridSize);
  if (col < 0 || col >= gridSize || row < 0 || row >= gridSize) return null;
  return row * gridSize + col;
}

export default function PixelCanvas({
  squares,
  gridSize,
  cellSize,
  showGrid,
  onPaintCell,
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  /** Last pointer position while a stroke is in progress, otherwise null. */
  const lastPoint = useRef<Point | null>(null);
  const size = gridSize * cellSize;

  // Redraw the whole board from state. 484 fillRects is well under a
  // millisecond, so there's no need to track which cells changed.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Back the canvas with devicePixelRatio× as many pixels as its CSS size so
    // it stays sharp on high-DPI screens, then scale so we can keep drawing in
    // CSS pixels.
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawPixels(ctx, squares, gridSize, cellSize);
    if (showGrid) drawGridLines(ctx, gridSize, cellSize, GRID_LINE_COLOR);
  }, [squares, showGrid, gridSize, cellSize, size]);

  // Pointer events are sparse during fast strokes, so walk from the previous
  // position to the current one in half-cell steps and paint each cell hit.
  const paintStroke = (e: PointerEvent<HTMLCanvasElement>) => {
    const to = { x: e.clientX, y: e.clientY };
    const from = lastPoint.current ?? to;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / (cellSize / 2)));
    for (let s = 1; s <= steps; s++) {
      const index = cellAt(e.currentTarget, gridSize, {
        x: from.x + (dx * s) / steps,
        y: from.y + (dy * s) / steps,
      });
      if (index !== null) onPaintCell(index);
    }
    lastPoint.current = to;
  };

  const handlePointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    // Keep receiving moves even if the pointer leaves the canvas mid-stroke.
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPoint.current = null;
    paintStroke(e);
  };

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (lastPoint.current) paintStroke(e);
  };

  const stopPainting = () => {
    lastPoint.current = null;
  };

  return (
    <canvas
      ref={canvasRef}
      className="pixel_canvas"
      style={{ width: size, height: size }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopPainting}
      onPointerCancel={stopPainting}
    />
  );
}
