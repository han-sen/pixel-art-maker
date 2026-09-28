type SquareProps = {
  color: string;
  size?: number;
  onClick?: () => void;
};

/** A clickable color swatch, used by the palettes. */
export default function Square({ color, size, onClick }: SquareProps) {
  return (
    <div
      className="square"
      style={{ backgroundColor: color, width: size, height: size }}
      onClick={onClick}
    />
  );
}
