import React from "react";

class Square extends React.Component {
  render() {
    return (
      <button
        style={{
          backgroundColor: this.props.colorValue,
          width: this.props.width,
          height: this.props.height,
          border: this.props.border
        }}
        className="square"
        onClick={() => this.props.onClick()}
      ></button>
    );
  }
}

export default Square;
