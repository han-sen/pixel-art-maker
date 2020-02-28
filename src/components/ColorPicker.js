import React from "react";

class ColorPicker extends React.Component {
  render() {
    return (
      <div className="color_picker_wrap controls_button">
        <input
          id="colorPicker"
          name="Color Picker"
          type="color"
          list="presetColors"
        />
        <datalist id="presetColors">
          <option>#ffffff</option>/>
          <option>#000000</option>/>
          <option>#049CD8</option>
          <option>#FBD000</option>
          <option>#E52521</option>
          <option>#43B047</option>
        </datalist>
      </div>
    );
  }
}

export default ColorPicker;
