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
          <option>#1a1c2c</option>/>
          <option>#5d275d</option>/>
          <option>#b13e53</option>
          <option>#ef7d57</option>
          <option>#ffcd75</option>
          <option>#a7f070</option>
          <option>#38b764</option>/>
          <option>#257179</option>/>
          <option>#29366f</option>
          <option>#3b5dc9</option>
          <option>#41a6f6</option>
          <option>#73eff7</option>
          <option>#f4f4f4</option>
          <option>#94b0c2</option>
          <option>#566c86</option>
          <option>#333c57</option>
        </datalist>
      </div>
    );
  }
}

export default ColorPicker;
