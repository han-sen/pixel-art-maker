import React from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import ColorPicker from "./ColorPicker";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(144).fill("#fff"),
      grid: true,
      detail: 1,
      size: "32px",
      colors: [],
    };
  }
  changeDetail() {
    if (this.state.detail < 3) {
      const newDetail = this.state.detail + 1;
      this.setState({ detail: newDetail });
      this.createSquares(newDetail);
    } else {
      this.setState({ detail: 1 });
      this.createSquares(1);
    }
  }
  clearGrid() {
    const board = document.getElementById("grid");
    board.classList.add("erase");
    setTimeout(() => {
      board.classList.remove("erase");
    }, 1000);
    const cleanGrid = this.state.squares.map((x) => "#fff");
    this.setState({ squares: cleanGrid, colors: [] });
  }
  createSquares(detail) {
    switch (detail) {
      case 1:
        this.setState({ squares: Array(144).fill("#fff"), size: "32px" });
        break;
      case 2:
        this.setState({ squares: Array(576).fill("#fff"), size: "16px" });
        break;
      case 3:
        this.setState({ squares: Array(1024).fill("#fff"), size: "12px" });
        break;
      default:
        this.setState({ squares: Array(144).fill("#fff"), size: "32px" });
    }
  }
  fillBoard() {
    const currentColor = document.getElementById("colorPicker").value;
    const filledBoard = this.state.squares.map((x) => currentColor);
    const newColors = this.state.colors;
    if (!newColors.includes(currentColor)) {
      newColors.push(currentColor);
    }
    this.setState({ squares: filledBoard, colors: newColors });
  }
  handleClick(i) {
    const currentColor = document.getElementById("colorPicker").value;
    const squares = this.state.squares.slice();
    squares[i] = currentColor;
    let newColors = this.state.colors;
    if (!newColors.includes(currentColor)) {
      newColors.push(currentColor);
    }
    this.setState({ squares: squares, colors: newColors });
  }
  convertCanvas() {
    const board = document.getElementById("grid");
    html2canvas(board).then(function (canvas) {
      canvas.toBlob(function (blob) {
        saveAs(blob, "pixel.png");
      });
    });
  }
  saveFile() {
    this.convertCanvas();
  }
  setColor(color) {
    const colorSwatch = color;
    document.getElementById("colorPicker").value = colorSwatch;
  }
  toggleGrid() {
    this.setState({ grid: !this.state.grid });
  }
  render() {
    return (
      <section className="app_wrap">
        <div className="app_wrap_inner">
          <div className="controls_wrap">
            <ColorPicker />
            <button
              className="controls_button"
              onClick={() => this.fillBoard()}
            >
              Fill
            </button>
            <button
              className="controls_button"
              onClick={() => this.clearGrid()}
            >
              Clear
            </button>
            <button
              className="controls_button"
              onClick={() => this.toggleGrid()}
            >
              {this.state.grid === true ? "Grid On" : "Grid Off"}
            </button>
            <button
              className="controls_button detail_button"
              onClick={() => this.changeDetail()}
            >
              {this.state.detail === 3 ? "Less Detail" : "More Detail"}
            </button>
            <button className="controls_button" onClick={() => this.saveFile()}>
              Save
            </button>
          </div>
          <div id="grid" className="grid_wrap">
            {this.state.squares.map((x, i) => {
              return (
                <Square
                  width={this.state.size}
                  height={this.state.size}
                  border={
                    this.state.grid === true ? "1px solid #bebebe" : "none"
                  }
                  colorValue={x}
                  onClick={() => this.handleClick(i)}
                  key={i}
                />
              );
            })}
          </div>
        </div>
        <div className="palette_wrap">
          <p>Current Palette:</p>
          <div className="palette_squares">
            {this.state.colors.map((color, i) => {
              return (
                <Square
                  width="32px"
                  height="32px"
                  border="none"
                  colorValue={color}
                  onClick={() => this.setColor(color)}
                  key={i + "p"}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Board;
