import React from "react";
import ColorPicker from "./ColorPicker";
import Palette from "./Palette";
import PalettePicker from "./PalettePicker";
import Square from "./Square";
import SaveButton from "./SaveButton";
import fillIcon from "../img/fill.svg";
import clearIcon from "../img/clear.svg";
import gridIcon from "../img/grid.svg";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(484).fill("#257178"),
      grid: true,
      colors: [],
    };
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
  fillBoard() {
    const currentColor = document.getElementById("preview").style
      .backgroundColor;
    const filledBoard = this.state.squares.map((x) => currentColor);
    const newColors = this.state.colors;
    if (!newColors.includes(currentColor)) {
      newColors.push(currentColor);
    }
    this.setState({ squares: filledBoard, colors: newColors });
  }
  handleClick(i) {
    const currentColor = document.getElementById("preview").style
      .backgroundColor;
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
    document.getElementById("preview").style.backgroundColor = colorSwatch;
  }
  toggleGrid() {
    this.setState({ grid: !this.state.grid });
  }
  render() {
    return (
      <section className="app_wrap">
        <div className="app_wrap_inner">
          <div className="controls_wrap">
            <button className="color_button">
              <ColorPicker />
            </button>
            <button
              className="controls_button"
              onClick={() => this.fillBoard()}
            >
              <img src={fillIcon} alt="fill" />
              Fill
            </button>
            <button
              className="controls_button"
              onClick={() => this.clearGrid()}
            >
              <img src={clearIcon} alt="clear" />
              Clear
            </button>
            <button
              className="controls_button"
              onClick={() => this.toggleGrid()}
            >
              <img src={gridIcon} alt="grid" />
              {this.state.grid === true ? "On" : "Off"}
            </button>
            <SaveButton />
          </div>
          <div id="grid" className="grid_wrap">
            {this.state.squares.map((x, i) => {
              return (
                <Square
                  outline={
                    this.state.grid === true ? "1px solid #bebebe" : "none"
                  }
                  height="16px"
                  width="16px"
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
        <Palette colors={this.state.colors} setColor={this.setColor} />
        <PalettePicker setColor={this.setColor} />
      </section>
    );
  }
}

export default Board;
