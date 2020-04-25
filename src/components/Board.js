import React from "react";
import ColorPicker from "./ColorPicker";
import Square from "./Square";
import SaveButton from "./SaveButton";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(121).fill("rgb(37, 113, 121)"),
      grid: true,
      detail: 1,
      size: "32px",
      colors: [],
    };
  }
  changeDetail() {
    if (this.state.detail === 1) {
      this.setState({ detail: 2 });
      this.createSquares(2);
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
    if (detail === 1) {
      this.setState({ squares: Array(121).fill("#fff"), size: "32px" });
    } else {
      this.setState({ squares: Array(484).fill("#fff"), size: "16px" });
    }
  }
  fillBoard() {
    const currentColor = document.getElementById("hexVal").value;
    const filledBoard = this.state.squares.map((x) => currentColor);
    const newColors = this.state.colors;
    if (!newColors.includes(currentColor)) {
      newColors.push(currentColor);
    }
    this.setState({ squares: filledBoard, colors: newColors });
  }
  handleClick(i) {
    const currentColor = document.getElementById("hexVal").value;
    const squares = this.state.squares.slice();
    squares[i] = currentColor;
    let newColors = this.state.colors;
    if (!newColors.includes(currentColor)) {
      newColors.push(currentColor);
    }
    this.setState({ squares: squares, colors: newColors });
  }
  setColor(color) {
    const colorSwatch = color;
    document.getElementById("hexVal").value = colorSwatch;
  }
  toggleGrid() {
    this.setState({ grid: !this.state.grid });
  }
  render() {
    return (
      <section className="app_wrap">
        {/* <ColorPicker /> */}

        <div className="app_wrap_inner">
          <div className="controls_wrap">
            <button className="color_button">
              <ColorPicker />
            </button>
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
              {this.state.detail === 2 ? "Less Detail" : "More Detail"}
            </button>
          </div>
          <div id="grid" className="grid_wrap">
            {this.state.squares.map((x, i) => {
              return (
                <Square
                  width={this.state.size}
                  height={this.state.size}
                  outline={
                    this.state.grid === true ? "1px solid #bebebe" : "none"
                  }
                  colorValue={x}
                  onClick={() => this.handleClick(i)}
                  onDragEnter={() => {
                    this.handleClick(i);
                  }}
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
                  width="16px"
                  height="16px"
                  border="none"
                  colorValue={color}
                  onClick={() => this.setColor(color)}
                  key={i + "p"}
                />
              );
            })}
          </div>
          <SaveButton />
        </div>
      </section>
    );
  }
}

export default Board;
