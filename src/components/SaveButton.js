import React from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

class SaveButton extends React.Component {
  convertCanvas() {
    const board = document.getElementById("grid");
    html2canvas(board).then(function (canvas) {
      canvas.toBlob(function (blob) {
        saveAs(blob, "pixel.png");
      });
    });
  }
  saveFile() {
    this.convertCanvas();
  }
  render() {
    return (
      <button className="save_button" onClick={() => this.saveFile()}>
        Save Art
      </button>
    );
  }
}

export default SaveButton;
