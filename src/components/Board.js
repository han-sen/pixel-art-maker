import React from "react";
import ColorPicker from "./ColorPicker";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(64).fill("")
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
  handleClick(i) {
    const currentColor = document.getElementById("colorPicker").value;
    const squares = this.state.squares.slice();
    squares[i] = currentColor;
    this.setState({ squares: squares });
  }
  render() {
    return (
      <section>
        <div className="controls_wrap">
          <ColorPicker />
          <button onClick={() => this.clearGrid()}>Clear grid</button>
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
