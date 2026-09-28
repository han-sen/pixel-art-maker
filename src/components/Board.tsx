import { useState } from "react";
import ColorPicker from "./ColorPicker";
import Palette from "./Palette";
import PalettePicker from "./PalettePicker";
import PixelCanvas from "./PixelCanvas";
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
          <SaveButton squares={squares} gridSize={GRID_SIZE} />
        </div>
        {/* The shake animates this wrapper, and the canvas moves with it. */}
        <div
          className={erasing ? "grid_wrap erase" : "grid_wrap"}
          onAnimationEnd={() => setErasing(false)}
        >
          <PixelCanvas
            squares={squares}
            gridSize={GRID_SIZE}
            cellSize={CELL_SIZE}
            showGrid={showGrid}
            onPaintCell={paint}
          />
        </div>
      </div>
      <Palette colors={usedColors} onSelect={setColor} />
      <PalettePicker onSelect={setColor} />
    </section>
  );
}
