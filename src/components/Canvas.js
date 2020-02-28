import React from "react";
import Board from "./Board";

class Canvas extends React.Component {
  render() {
    return (
      <div className="page_wrap">
        <div className="col-2">
          <h1>Pixel Art Maker</h1>
        </div>
        <div className="col-2">
          <Board />
        </div>
      </div>
    );
  }
}

export default Canvas;
