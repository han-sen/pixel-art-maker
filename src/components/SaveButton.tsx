import type { RefObject } from "react";
import html2canvas from "html2canvas";
import saveIcon from "../img/save.svg";

type SaveButtonProps = {
  target: RefObject<HTMLElement | null>;
  filename?: string;
};

export default function SaveButton({
  target,
  filename = "pixel.png",
}: SaveButtonProps) {
  const save = async () => {
    const el = target.current;
    if (!el) return;
    const canvas = await html2canvas(el, {
      // Square off the corners in the snapshot only, not the live board.
      onclone: (_doc, clone) => {
        clone.style.borderRadius = "0";
      },
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = filename;
    link.click();
  };

  return (
    <button className="controls_button" onClick={save}>
      <img src={saveIcon} alt="" />
      Save
    </button>
  );
}
