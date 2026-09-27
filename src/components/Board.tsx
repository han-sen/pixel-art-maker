import { useRef, useState, type PointerEvent } from "react";
import ColorPicker from "./ColorPicker";
import Palette from "./Palette";
import PalettePicker from "./PalettePicker";
import Square from "./Square";
import SaveButton from "./SaveButton";
import fillIcon from "../img/fill.svg";
import clearIcon from "../img/clear.svg";
import gridIcon from "../img/grid.svg";

const GRID_SIZE = 22;
const CELL_SIZE = 16;
const BLANK = "#ffffff";
const DEFAULT_COLOR = "rgb(28, 170, 225)";

const blankBoard = () => Array<string>(GRID_SIZE * GRID_SIZE).fill(BLANK);

export default function Board() {
  const [squares, setSquares] = useState(blankBoard);
  const [usedColors, setUsedColors] = useState<string[]>([]);
  const [color, setColorState] = useState(DEFAULT_COLOR);
  const [showGrid, setShowGrid] = useState(true);
  const [erasing, setErasing] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  /** Last pointer position while a stroke is in progress, otherwise null. */
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  // Normalize so "#FF004D" and "#ff004d" count as one used color.
  const setColor = (c: string) => setColorState(c.toLowerCase());

  const trackColor = (c: string) =>
    setUsedColors((prev) => (prev.includes(c) ? prev : [...prev, c]));

  const paint = (index: number) => {
    setSquares((prev) => {
      if (prev[index] === color) return prev;
      const next = prev.slice();
      next[index] = color;
      return next;
    });
    trackColor(color);
  };

  // Hit-test by coordinates rather than per-square handlers so that a single
  // pointer stream works for mouse drags and touch alike.
  const paintAt = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y);
    if (el instanceof HTMLElement && el.dataset.index !== undefined) {
      paint(Number(el.dataset.index));
    }
  };

  // Pointer events are sparse during fast strokes, so fill in the squares
  // between the previous and current position.
  const paintStroke = (e: PointerEvent) => {
    const from = lastPoint.current ?? { x: e.clientX, y: e.clientY };
    const dx = e.clientX - from.x;
    const dy = e.clientY - from.y;
    const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / (CELL_SIZE / 2)));
    for (let s = 1; s <= steps; s++) {
      paintAt(from.x + (dx * s) / steps, from.y + (dy * s) / steps);
    }
    lastPoint.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    lastPoint.current = null;
    paintStroke(e);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (lastPoint.current) paintStroke(e);
  };

  const stopPainting = () => {
    lastPoint.current = null;
  };

  const fillBoard = () => {
    setSquares(Array<string>(GRID_SIZE * GRID_SIZE).fill(color));
    trackColor(color);
  };

  const clearBoard = () => {
    setSquares(blankBoard());
    setUsedColors([]);
    setErasing(true);
  };

  return (
    <section className="app_wrap">
      <div className="app_wrap_inner">
        <div className="controls_wrap">
          <div className="color_button">
            <ColorPicker color={color} onChange={setColor} />
          </div>
          <button className="controls_button" onClick={fillBoard}>
            <img src={fillIcon} alt="" />
            Fill
          </button>
          <button className="controls_button" onClick={clearBoard}>
            <img src={clearIcon} alt="" />
            Clear
          </button>
          <button
            className="controls_button"
            onClick={() => setShowGrid((g) => !g)}
            aria-pressed={showGrid}
          >
            <img src={gridIcon} alt="grid" />
            {showGrid ? "On" : "Off"}
          </button>
          <SaveButton target={gridRef} />
        </div>
        <div
          ref={gridRef}
          className={erasing ? "grid_wrap erase" : "grid_wrap"}
          onAnimationEnd={() => setErasing(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopPainting}
          onPointerCancel={stopPainting}
        >
          {squares.map((c, i) => (
            <Square
              key={i}
              index={i}
              color={c}
              size={CELL_SIZE}
              outline={showGrid ? "1px solid #bebebe" : "none"}
            />
          ))}
        </div>
      </div>
      <Palette colors={usedColors} onSelect={setColor} />
      <PalettePicker onSelect={setColor} />
    </section>
  );
}
