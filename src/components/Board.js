import React from "react";
import ColorPicker from "./ColorPicker";
import Square from "./Square";
import SaveButton from "./SaveButton";
import html2canvas from "html2canvas";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(144).fill("#fff"),
      grid: true,
      detail: 1,
      size: "32px"
    };
  }
  clearGrid() {
    const board = document.getElementById("grid");
    board.classList.add("erase");
    setTimeout(() => {
      board.classList.remove("erase");
    }, 1000);
    const cleanGrid = this.state.squares.map(x => "#fff");
    this.setState({ squares: cleanGrid });
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
    const filledBoard = this.state.squares.map(x => currentColor);
    this.setState({ squares: filledBoard });
  }
  handleClick(i) {
    const currentColor = document.getElementById("colorPicker").value;
    const squares = this.state.squares.slice();
    squares[i] = currentColor;
    this.setState({ squares: squares });
  }
  removeLines() {
    const squares = document.getElementsByClassName("square");
    if (this.state.grid === true) {
      [...squares].forEach(x => (x.style.border = "none"));
    } else {
      [...squares].forEach(x => (x.style.border = "1px solid #bebebe"));
    }
    this.setState({ grid: !this.state.grid });
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
  saveFile() {
    this.removeLines();
    const board = document.getElementById("grid");
    html2canvas(board).then(function(canvas) {
      document.body.appendChild(canvas);
    });
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
              onClick={() => this.removeLines()}
            >
              Grid
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
                  colorValue={x}
                  onClick={() => this.handleClick(i)}
                  key={i}
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
