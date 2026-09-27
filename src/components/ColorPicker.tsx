import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import colorSquare from "../img/colorSquare.png";

const PICKER_SIZE = 290;

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`;

const isValidColor = (value: string) => CSS.supports("color", value);

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [rgbText, setRgbText] = useState("");
  const [hexText, setHexText] = useState("");
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getContext = () =>
    canvasRef.current?.getContext("2d", { willReadFrequently: true });

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = colorSquare;
  }, []);

  useEffect(() => {
    const ctx = getContext();
    if (!ctx || !image) return;
    ctx.filter = `saturate(${saturation}%) brightness(${brightness}%)`;
    ctx.clearRect(0, 0, PICKER_SIZE, PICKER_SIZE);
    ctx.drawImage(image, 0, 0, PICKER_SIZE, PICKER_SIZE);
  }, [image, saturation, brightness]);

  const sampleColor = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    const ctx = getContext();
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) * canvas.width) / rect.width);
    const y = Math.floor(((e.clientY - rect.top) * canvas.height) / rect.height);
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;
    const rgb = `rgb(${r}, ${g}, ${b})`;
    setRgbText(rgb);
    setHexText(toHex(r, g, b));
    onChange(rgb);
  };

  const handleTextChange = (value: string, setText: (v: string) => void) => {
    setText(value);
    if (isValidColor(value)) onChange(value.trim().toLowerCase());
  };

  const closeOnEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") setOpen(false);
  };

  return (
    <div className="color_picker_wrap">
      <button
        type="button"
        className="preview"
        style={{ backgroundColor: color }}
        aria-label="Choose color"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      />
      <div className="colorpicker" style={{ display: open ? "flex" : "none" }}>
        <canvas
          ref={canvasRef}
          id="picker"
          width={PICKER_SIZE}
          height={PICKER_SIZE}
          onMouseMove={sampleColor}
          onClick={() => setOpen(false)}
        />
        <div className="controls">
          <div>
            <label htmlFor="rgbVal">RGB</label>
            <input
              type="text"
              id="rgbVal"
              value={rgbText}
              onChange={(e) => handleTextChange(e.target.value, setRgbText)}
              onKeyDown={closeOnEnter}
            />
          </div>
          <div>
            <label htmlFor="hexVal">HEX</label>
            <input
              type="text"
              id="hexVal"
              value={hexText}
              onChange={(e) => handleTextChange(e.target.value, setHexText)}
              onKeyDown={closeOnEnter}
            />
          </div>
        </div>
        <div className="slider_wrap">
          <div>
            <label htmlFor="saturationSlider">Saturation</label>
            <input
              type="range"
              min={1}
              max={100}
              value={saturation}
              className="slider"
              id="saturationSlider"
              onChange={(e) => setSaturation(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="brightnessSlider">Brightness</label>
            <input
              type="range"
              min={1}
              max={100}
              value={brightness}
              className="slider"
              id="brightnessSlider"
              onChange={(e) => setBrightness(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
