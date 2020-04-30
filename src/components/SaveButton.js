import React from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

class SaveButton extends React.Component {
  saveFile() {
    const board = document.getElementById("grid");
    board.style.borderRadius = "0px";
    html2canvas(board).then(function (canvas) {
      canvas.toBlob(function (blob) {
        saveAs(blob, "pixel.png");
      });
    });
    board.style.borderRadius = "6px";
  }
  render() {
    return (
      <div className="save_wrap">
        <button className="save_button" onClick={() => this.saveFile()}>
          Save Art
        </button>
      </div>
    );
  }
}

export default SaveButton;
