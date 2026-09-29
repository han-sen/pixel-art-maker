import Square from "./Square";
import { Brush } from "lucide-react";

type PaletteProps = {
  colors: readonly string[];
  onSelect: (color: string) => void;
};

export default function Palette({ colors, onSelect }: PaletteProps) {
  return (
    <div className="palette_wrap">
      <div className="palette_header">
        <Brush size={16} aria-hidden />
        <p>Colors Used</p>
      </div>
      <div className="palette_squares">
        {colors.map((color) => (
          <Square
            key={color}
            color={color}
            size={24}
            onClick={() => onSelect(color)}
          />
        ))}
      </div>
    </div>
  );
}
