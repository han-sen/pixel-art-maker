/** Oldest entries are dropped once `past` grows beyond this. */
const HISTORY_LIMIT = 50;

export type History<T> = {
  past: T[];
  present: T;
  future: T[];
  /** Snapshot taken when a stroke began; null when no stroke is in progress. */
  checkpoint: T | null;
};

export type HistoryAction<T> =
  /** Start a multi-step change (a brush stroke) that undoes as one entry. */
  | { type: "begin" }
  /** Change `present` without recording history; used between begin/end. */
  | { type: "update"; update: (present: T) => T }
  /** Finish the change started by `begin`. */
  | { type: "end" }
  /** A one-shot change that gets its own history entry (Fill, Clear). */
  | { type: "apply"; update: (present: T) => T }
  | { type: "undo" }
  | { type: "redo" };

export const initHistory = <T>(present: T): History<T> => ({
  past: [],
  present,
  future: [],
  checkpoint: null,
});

/** Push `before` as a new undo entry, unless nothing actually changed. */
function record<T>(state: History<T>, before: T): History<T> {
  if (before === state.present) return { ...state, checkpoint: null };
  return {
    past: [...state.past, before].slice(-HISTORY_LIMIT),
    present: state.present,
    future: [],
    checkpoint: null,
  };
}

export function historyReducer<T>(
  state: History<T>,
  action: HistoryAction<T>,
): History<T> {
  switch (action.type) {
    case "begin":
      return { ...state, checkpoint: state.present };
    case "update":
      return { ...state, present: action.update(state.present) };
    case "end":
      return state.checkpoint === null
        ? state
        : record(state, state.checkpoint);
    case "apply":
      return record(
        { ...state, present: action.update(state.present) },
        state.present,
      );
    case "undo": {
      // Ignored mid-stroke so the checkpoint can't end up out of sync.
      if (state.checkpoint !== null || state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        past: state.past.slice(0, -1),
        present: previous,
        future: [state.present, ...state.future],
        checkpoint: null,
      };
    }
    case "redo": {
      if (state.checkpoint !== null || state.future.length === 0) return state;
      const [next, ...rest] = state.future;
      return {
        past: [...state.past, state.present],
        present: next,
        future: rest,
        checkpoint: null,
      };
    }
  }
}
