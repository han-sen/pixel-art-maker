import { useEffect, useReducer, useState } from "react";
import ColorPicker from "./ColorPicker";
import Palette from "./Palette";
import PalettePicker from "./PalettePicker";
import PixelCanvas from "./PixelCanvas";
import SaveButton from "./SaveButton";
import { historyReducer, initHistory } from "../lib/history";
import { Grid3x3, PaintBucket, Redo2, Trash2, Undo2 } from "lucide-react";
import { loadDrawing, saveDrawing } from "../lib/storage";

const GRID_SIZE = 22;
const CELL_SIZE = 16;
const BLANK = "#ffffff";
const DEFAULT_COLOR = "rgb(28, 170, 225)";
const ICON_SIZE = 14;

const blankBoard = () => Array<string>(GRID_SIZE * GRID_SIZE).fill(BLANK);

/** Everything undo/redo restores. */
type Drawing = { squares: string[]; usedColors: string[] };

const blankDrawing = (): Drawing => ({ squares: blankBoard(), usedColors: [] });

/** Add `c` to the used colors, returning the same array if it's already there. */
const withColor = (colors: string[], c: string) =>
  colors.includes(c) ? colors : [...colors, c];

const initialDrawing = (): Drawing => {
  const savedDrawing = loadDrawing();
  if (savedDrawing === null || savedDrawing.gridSize !== GRID_SIZE) {
    return blankDrawing();
  }
  const { squares, usedColors } = savedDrawing;
  return { squares, usedColors };
};

export default function Board() {
  const [history, dispatch] = useReducer(
    historyReducer<Drawing>,
    undefined,
    () => initHistory(initialDrawing()),
  );
  const { squares, usedColors } = history.present;
  const [color, setColorState] = useState(DEFAULT_COLOR);
  const [showGrid, setShowGrid] = useState(true);
  const [erasing, setErasing] = useState(false);

  // Normalize so "#FF004D" and "#ff004d" count as one used color.
  const setColor = (c: string) => setColorState(c.toLowerCase());

  // Returning the same object when nothing changes lets the history skip
  // recording strokes that didn't alter the board.
  const paint = (index: number) =>
    dispatch({
      type: "update",
      update: (d) => {
        if (d.squares[index] === color) return d;
        const next = d.squares.slice();
        next[index] = color;
        return { squares: next, usedColors: withColor(d.usedColors, color) };
      },
    });

  const fillBoard = () =>
    dispatch({
      type: "apply",
      update: (d) => ({
        squares: Array<string>(GRID_SIZE * GRID_SIZE).fill(color),
        usedColors: withColor(d.usedColors, color),
      }),
    });

  const clearBoard = () => {
    dispatch({ type: "apply", update: blankDrawing });
    setErasing(true);
  };

  const undo = () => dispatch({ type: "undo" });
  const redo = () => dispatch({ type: "redo" });

  useEffect(() => {
    // autosave on every change except when we are in the middle of a stroke
    if (history.checkpoint !== null) return;

    saveDrawing({
      squares: history.present.squares,
      usedColors: history.present.usedColors,
      version: 1,
      gridSize: GRID_SIZE,
    });
  }, [history.present, history.checkpoint]);

  // Ctrl/Cmd+Z undoes; Ctrl/Cmd+Shift+Z or Ctrl+Y redoes.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      // Leave text fields (the RGB/HEX inputs) their own native undo.
      if (e.target instanceof HTMLInputElement) return;
      const key = e.key.toLowerCase();
      if (key === "z") {
        e.preventDefault();
        dispatch({ type: e.shiftKey ? "redo" : "undo" });
      } else if (key === "y") {
        e.preventDefault();
        dispatch({ type: "redo" });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="app_wrap">
      <div className="app_wrap_inner">
        <div className="controls_wrap">
          <div className="color_button">
            <ColorPicker color={color} onChange={setColor} />
          </div>
          <button className="controls_button" onClick={fillBoard}>
            <PaintBucket size={ICON_SIZE} aria-hidden />
            Fill
          </button>
          <button className="controls_button" onClick={clearBoard}>
            <Trash2 size={ICON_SIZE} aria-hidden />
            Clear
          </button>
          <button
            className="controls_button"
            onClick={() => setShowGrid((g) => !g)}
            aria-pressed={showGrid}
          >
            <Grid3x3 size={ICON_SIZE} aria-hidden />
            {showGrid ? "On" : "Off"}
          </button>
          <button
            className="controls_button"
            onClick={undo}
            disabled={history.past.length === 0}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={ICON_SIZE} aria-hidden />
            Undo
          </button>
          <button
            className="controls_button"
            onClick={redo}
            disabled={history.future.length === 0}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 size={ICON_SIZE} aria-hidden />
            Redo
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
            onStrokeStart={() => dispatch({ type: "begin" })}
            onStrokeEnd={() => dispatch({ type: "end" })}
          />
        </div>
      </div>
      <Palette colors={usedColors} onSelect={setColor} />
      <PalettePicker onSelect={setColor} />
    </section>
  );
}
