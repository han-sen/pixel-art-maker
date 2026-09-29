import { exportPng } from "../lib/pixels";
import { Save } from "lucide-react";

type SaveButtonProps = {
  squares: readonly string[];
  gridSize: number;
  /** Output pixels per board cell; 1 gives a true-size sprite. */
  scale?: number;
  filename?: string;
};

export default function SaveButton({
  squares,
  gridSize,
  scale = 32,
  filename = "pixel.png",
}: SaveButtonProps) {
  const save = async () => {
    const blob = await exportPng(squares, gridSize, scale);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="controls_button" onClick={save}>
      <Save size={14} aria-hidden />
      Save
    </button>
  );
}
