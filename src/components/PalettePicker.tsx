import { useState } from "react";
import Square from "./Square";
import paletteIcon from "../img/palette.svg";
import { colorSets } from "./colorSets";

type PalettePickerProps = {
  onSelect: (color: string) => void;
};

export default function PalettePicker({ onSelect }: PalettePickerProps) {
  const [setIndex, setSetIndex] = useState(0);

  return (
    <div className="palette_wrap">
      <div className="palette_header">
        <img src={paletteIcon} alt="palette" />
        <label htmlFor="palette_select">Palette</label>
        <select
          id="palette_select"
          value={setIndex}
          onChange={(e) => setSetIndex(Number(e.target.value))}
        >
          {colorSets.map((set, i) => (
            <option key={set.name} value={i}>
              {set.name}
            </option>
          ))}
        </select>
      </div>
      <div className="palette_squares palette_selected">
        {colorSets[setIndex].colors.map((color) => (
          <Square key={color} color={color} onClick={() => onSelect(color)} />
        ))}
      </div>
    </div>
  );
}
