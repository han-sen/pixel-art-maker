import React from "react";

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

export default Square;
