import React from "react";
import ColorPicker from "./ColorPicker";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      squares: Array(1024).fill(""),
      grid: true
=======
      squares: Array(336).fill(""),
      grid: true,
      detail: 1
>>>>>>> ef2f1fd63c983d4b01eff2bacc02186e0f9392df
    };
  }
  clearGrid() {
    const board = document.getElementById("grid");
    board.classList.add("erase");
    setTimeout(() => {
      board.classList.remove("erase");
    }, 1000);
    const cleanGrid = this.state.squares.map(x => "#ffffff");
    this.setState({ squares: cleanGrid });
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
  render() {
    return (
      <section className="app_wrap">
        <div className="controls_wrap">
          <ColorPicker />
          <button className="controls_button" onClick={() => this.fillBoard()}>
            Fill
          </button>
          <button className="controls_button" onClick={() => this.clearGrid()}>
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
            >
              Detail
            </button>
        </div>
        <div id="grid" className="grid_wrap">
          {this.state.squares.map((x, i) => {
            return (
              <Square value={x} onClick={() => this.handleClick(i)} key={i} />
            );
          })}
        </div>
      </section>
    );
  }
}

export default Board;
