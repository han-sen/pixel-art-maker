import React from "react";
import Square from "./Square";
import paletteIcon from "../img/palette.svg";

class Palette extends React.Component {
  render() {
    return (
      <div className="palette_wrap">
        <div className="palette_header">
          <img src={paletteIcon} alt="palette" />
          <p>Current Palette</p>
        </div>
        <div className="palette_squares">
          {this.props.colors.map((color, i) => {
            return (
              <Square
                width="24px"
                height="24px"
                border="none"
                colorValue={color}
                onClick={() => this.props.setColor(color)}
                key={i + "p"}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Palette;
