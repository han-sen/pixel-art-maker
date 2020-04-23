import React from "react";
import paintBrush from "../img/paint.png";

class Square extends React.Component {
  render() {
    return (
      <button
        draggable="true"
        style={{
          backgroundColor: this.props.colorValue,
          width: this.props.width,
          height: this.props.height,
          border: this.props.border,
        }}
        className="square"
        onClick={() => this.props.onClick()}
        onDragStart={(event) => {
          var img = document.createElement("img");
          img.src = { paintBrush };
          event.dataTransfer.setDragImage(img, 0, 0);
        }}
        onDragEnter={() => this.props.onDragEnter()}
      ></button>
    );
  }
}

export default Square;
