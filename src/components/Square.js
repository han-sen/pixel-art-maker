import React from "react";
import paintBrush from "../img/GitHub-Mark-64px.png";

class Square extends React.Component {
  render() {
    return (
      <div
        draggable="true"
        style={{
          backgroundColor: this.props.colorValue,
          width: this.props.width,
          height: this.props.height,
          outline: this.props.outline,
        }}
        className="square"
        onClick={() => this.props.onClick()}
        onDragStart={(e) => {
          var dragIcon = document.createElement("img");
          dragIcon.src = { paintBrush };
          dragIcon.width = 100;
          e.dataTransfer.setDragImage(dragIcon, -10, -10);
        }}
        onDragEnter={() => this.props.onDragEnter()}
      ></div>
    );
  }
}

Square.defaultProps = {
  onDragEnter: () => {
    return false;
  },
};

export default Square;
