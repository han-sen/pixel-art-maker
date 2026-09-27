import type { CSSProperties } from "react";

type SquareProps = {
  color: string;
  size?: number;
  outline?: CSSProperties["outline"];
  onClick?: () => void;
  /** Board position, exposed as `data-index` for pointer hit-testing. */
  index?: number;
};

export default function Square({
  color,
  size,
  outline,
  onClick,
  index,
}: SquareProps) {
  return (
    <div
      className="square"
      data-index={index}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        outline,
      }}
      onClick={onClick}
    />
  );
}
