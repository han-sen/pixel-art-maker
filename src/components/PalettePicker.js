import React from "react";
import Square from "./Square";
import paletteIcon from "../img/palette.svg";
import { colorSets } from "./ColorSets";

class PalettePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { palette: colorSets[0].colors };
  }
  updateSet(e) {
    const i = e.target.value;
    this.setState({ palette: colorSets[i].colors });
  }
  render() {
    return (
      <div className="palette_wrap">
        <div className="palette_header">
          <img src={paletteIcon} alt="palette" />
          <label>Palette</label>
          <select
            id="palette_select"
            defaultValue="Starter Colors"
            onChange={(e) => this.updateSet(e)}
          >
            {colorSets.map((set, i) => {
              return (
                <option key={i} value={i}>
                  {set.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="palette_squares palette_selected">
          {this.state.palette.map((color, i) => {
            return (
              <Square
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

export default PalettePicker;
