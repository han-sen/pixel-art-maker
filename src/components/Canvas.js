import React from "react";
import Board from "./Board";
import Instructions from "./Instructions";
import GitTab from "./GitTab";

class Canvas extends React.Component {
  render() {
    return (
      <div className="page_wrap">
        <div className="col-2 instructions">
          <h1>Pixel Art Maker</h1>
          <Instructions />
        </div>
        <div className="col-2 app_container">
          <Board />
        </div>
        <GitTab />
      </div>
    );
  }
}

export default Canvas;
