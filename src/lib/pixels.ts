/** Paint every square as a `cellSize` × `cellSize` block, row by row. */
export function drawPixels(
  ctx: CanvasRenderingContext2D,
  squares: readonly string[],
  gridSize: number,
  cellSize: number,
) {
  squares.forEach((color, i) => {
    const col = i % gridSize;
    const row = Math.floor(i / gridSize);
    ctx.fillStyle = color;
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
  });
}

/** Draw 1px lines between cells (the outer edge is left to the container). */
export function drawGridLines(
  ctx: CanvasRenderingContext2D,
  gridSize: number,
  cellSize: number,
  color: string,
) {
  const total = gridSize * cellSize;
  ctx.fillStyle = color;
  for (let k = 1; k < gridSize; k++) {
    // Thin rects rather than stroked paths: a 1px-wide rect on a whole-pixel
    // boundary stays crisp, while a 1px stroke would overlap two pixels.
    ctx.fillRect(k * cellSize, 0, 1, total);
    ctx.fillRect(0, k * cellSize, total, 1);
  }
}

/** Render the board to a fresh offscreen canvas on save and encode it as a PNG. */
export function exportPng(
  squares: readonly string[],
  gridSize: number,
  scale: number,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = gridSize * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx)
    return Promise.reject(new Error("Canvas 2D context is unavailable"));

  drawPixels(ctx, squares, gridSize, scale);
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) =>
      blob ? resolve(blob) : reject(new Error("PNG encoding failed")),
    ),
  );
}
