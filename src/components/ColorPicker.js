import React from "react";
import colorSquare from "../img/colorSquare.png";

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }
  componentDidMount() {
    const canvas = document.getElementById("picker");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    const imageSrc = colorSquare;
    image.src = imageSrc;
    image.onload = function () {
      ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    };
  }
  getColor(e) {
    const canvas = document.getElementById("picker");
    const ctx = canvas.getContext("2d");
    const canvasOffset = canvas.getBoundingClientRect();
    let canvasX = Math.floor(e.pageX - canvasOffset.left);
    let canvasY = Math.floor(e.pageY - canvasOffset.top);
    let imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
    let pixel = imageData.data;
    let pixelColor =
      "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
    const preview = document.getElementById("preview");
    preview.style.backgroundColor = pixelColor;
    let dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
    const rgb = document.getElementById("rgbVal");
    rgb.value = pixel[0] + "," + pixel[1] + "," + pixel[2];
    const hex = document.getElementById("hexVal");
    hex.value = "#" + ("0000" + dColor.toString(16)).substr(-6);
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
          style={{ display: this.state.active === true ? "block" : "none" }}
        >
          <canvas
            id="picker"
            width="300"
            height="300"
            onMouseMove={(e) => this.getColor(e)}
            onClick={() => this.setState({ active: false })}
          ></canvas>
          <div className="controls">
            <div>
              <label>RGB</label> <input type="text" id="rgbVal" />
            </div>
            <div>
              <label>HEX</label> <input type="text" id="hexVal" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ColorPicker;
