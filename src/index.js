import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Canvas extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button
        style={{ backgroundColor: this.props.value }}
        className="square"
        onClick={() => this.props.onClick()}
      ></button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(12).fill("#ffffff")
    };
  }

  handleClick(i) {
    const currentColor = document.getElementById("colorPicker").value;
    const squares = this.state.squares.slice();
    squares[i] = currentColor;
    this.setState({ squares: squares });
  }

  render() {
    const status = <input id="colorPicker" name="Color Picker" type="color" />;

    return (
      <section>
        <div className="status">{status}</div>
        <div>
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

// ========================================

ReactDOM.render(<Canvas />, document.getElementById("root"));
