import React from "react";
import Board from "./Board";
import Instructions from "./Instructions";

class Canvas extends React.Component {
  render() {
    return (
      <div className="page_wrap">
        <div className="col-2 instructions">
          <h1>Pixel Art Maker</h1>
          <Instructions />
        </div>
        <div className="col-2">
          <Board />
        </div>
      </div>
    );
  }
}

export default Canvas;
