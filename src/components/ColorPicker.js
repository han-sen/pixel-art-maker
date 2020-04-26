import React from "react";
import colorSquare from "../img/colorSquare.png";
import Square from "./Square";

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      basicColors: [
        "#f4f5ef",
        "#f8c7a4",
        "#e784a8",
        "#eb9d45",
        "#bb9a3e",
        "#f6e455",
        "#c8dbdf",
        "#a146aa",
        "#d74d4c",
        "#a65d35",
        "#8fcb62",
        "#35884e",
        "#a0abb1",
        "#962f2c",
        "#682d2c",
        "#85dfeb",
        "#339ca3",
        "#1b4c5a",
        "#5e6a82",
        "#191023",
        "#72adee",
        "#435edb",
        "#474394",
        "#322d4d",
      ],
    };
  }
  componentDidMount() {
    document.getElementById("preview").style.backgroundColor = "#ffffff";
    const canvas = document.getElementById("picker");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    const imageSrc = colorSquare;
    image.src = imageSrc;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, 290, 290); // draw the image on the canvas
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
          <p>Starter Colors:</p>

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
          </div>
        </div>
      </div>
    );
  }
}

export default ColorPicker;
