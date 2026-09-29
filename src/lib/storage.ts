/**
 * Autosave: keep the current drawing in localStorage so it survives reloads.
 *
 * Keys are prefixed with "bit-easel:"
 */
export const CURRENT_KEY = "bit-easel:current";

/** What gets written to localStorage. */
export type SavedDrawing = {
  /** Bump this if the shape ever changes, so old saves can be detected. */
  version: 1;
  gridSize: number;
  squares: string[];
  usedColors: string[];
};

/**
 * Write the drawing to localStorage under CURRENT_KEY.
 */
export function saveDrawing(drawing: SavedDrawing): void {
  try {
    const stringifiedValue = JSON.stringify(drawing);
    localStorage.setItem(CURRENT_KEY, stringifiedValue);
  } catch (error) {
    console.warn("Autosave failed", error);
  }
}

/**
 * Read the saved drawing back, or return null if there isn't a usable one.
 */
export function loadDrawing(): SavedDrawing | null {
  try {
    const storedDrawing = localStorage.getItem(CURRENT_KEY);
    if (storedDrawing === null) return null;

    const parsedItem: unknown = JSON.parse(storedDrawing);

    return isSavedDrawing(parsedItem) ? parsedItem : null;
  } catch (error) {
    console.warn("Failed to fetch saved drawing", error);
  }
  return null;
}

const isStringArray = (x: unknown): x is string[] =>
  Array.isArray(x) && x.every((item) => typeof item === "string");

/** Type guard: is `value` a SavedDrawing we can safely load it to restore a session */
export function isSavedDrawing(value: unknown): value is SavedDrawing {
  if (typeof value !== "object" || value === null) return false;
  if (
    !("version" in value) ||
    !("gridSize" in value) ||
    !("squares" in value) ||
    !("usedColors" in value)
  )
    return false;

  if (
    value.version !== 1 ||
    typeof value.gridSize !== "number" ||
    !Number.isInteger(value.gridSize) ||
    value.gridSize <= 0 ||
    !isStringArray(value.squares) ||
    !isStringArray(value.usedColors)
  )
    return false;

  // One square per cell
  return value.squares.length === value.gridSize * value.gridSize;
}
