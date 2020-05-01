import React from "react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import saveIcon from "../img/save.svg";

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
      <button className="controls_button" onClick={() => this.saveFile()}>
        <img src={saveIcon} alt="save" />
        Save
      </button>
    );
  }
}

export default SaveButton;
