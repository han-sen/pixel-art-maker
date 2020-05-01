import React from "react";
import colorSquare from "../img/colorSquare.png";

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      basicColors: [
        "#000000",
        "#f80000",
        "#c868e8",
        "#10c0c8",
        "#2868c0",
        "#089050",
        "#70d038",
        "#f8f858",
        "#f8a830",
        "#787878",
        "#c0c0c0",
        "#ffffff",
      ],
    };
  }
  componentDidMount() {
    document.getElementById("preview").style.backgroundColor =
      "rgb(28, 170, 225)";
    this.drawCanvas(100, 100);
  }
  drawCanvas(saturation, brightness) {
    const canvas = document.getElementById("picker");
    const ctx = canvas.getContext("2d");
    ctx.filter = `saturate(${saturation}%) brightness(${brightness}%)`;
    const image = new Image();
    const imageSrc = colorSquare;
    image.src = imageSrc;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, 290, 290);
    };
  }
  enterColor(e) {
    if (e.keyCode === 13) {
      this.setState({ active: false });
    }
    const preview = document.getElementById("preview");
    preview.style.backgroundColor = e.target.value;
  }
  getColor(e) {
    const canvas = document.getElementById("picker");
    const ctx = canvas.getContext("2d");
    const canvasOffset = canvas.getBoundingClientRect();
    let canvasX = Math.floor(e.pageX - canvasOffset.left);
    let canvasY = Math.floor(e.pageY - canvasOffset.top);
    let imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
    let pixel = imageData.data;
    let pixelColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    const preview = document.getElementById("preview");
    preview.style.backgroundColor = pixelColor;
    let dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
    const rgb = document.getElementById("rgbVal");
    rgb.value = `rgb(${pixel[0]},${pixel[1]},${pixel[2]})`;
    const hex = document.getElementById("hexVal");
    hex.value = `#${`0000${dColor.toString(16)}`.substr(-6)}`;
  }
  colorSettings() {
    const saturation = document.getElementById("saturationSlider").value;
    const brightness = document.getElementById("brightnessSlider").value;
    this.drawCanvas(saturation, brightness);
  }
  setColor(color) {
    const colorSwatch = color;
    document.getElementById("preview").style.backgroundColor = colorSwatch;
    this.setState({ active: false });
  }
  toggleActive() {
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <div className="color_picker_wrap">
        <div
          id="preview"
          className="preview"
          onClick={() => this.toggleActive()}
        ></div>
        <div
          className="colorpicker"
          style={{ display: this.state.active === true ? "flex" : "none" }}
        >
          <canvas
            id="picker"
            width="290"
            height="290"
            onMouseMove={(e) => this.getColor(e)}
            onClick={() => this.setState({ active: false })}
          ></canvas>
          <div className="controls">
            <div>
              <label>RGB</label>
              <input
                type="text"
                id="rgbVal"
                onKeyDown={(e) => this.enterColor(e)}
              />
            </div>
            <div>
              <label>HEX</label>
              <input
                type="text"
                id="hexVal"
                onKeyDown={(e) => this.enterColor(e)}
              />
            </div>
          </div>
          <div className="slider_wrap">
            <div>
              <label>Saturation</label>
              <input
                type="range"
                min="1"
                max="100"
                defaultValue="100"
                className="slider"
                id="saturationSlider"
                onInput={() => this.colorSettings()}
              />
            </div>
            <div>
              <label>Brightness</label>
              <input
                type="range"
                min="1"
                max="100"
                defaultValue="100"
                className="slider"
                id="brightnessSlider"
                onInput={() => this.colorSettings()}
              />
            </div>
          </div>
          {/* <p>Starter Colors:</p>

          <div className="palette_squares">
            {this.state.basicColors.map((color, i) => {
              return (
                <Square
                  width="24px"
                  height="24px"
                  border="none"
                  colorValue={color}
                  onClick={() => this.setColor(color)}
                  key={i + "c"}
                />
              );
            })}
          </div> */}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
