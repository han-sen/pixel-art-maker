import React from "react";

class Instructions extends React.Component {
  render() {
    return (
      <div className="instructions_wrap">
        <p>This is a React pixel art maker demo.</p>
        <p>Toggle the grid on and off.</p>
        <p>Use the 'detail' button to cycle between 1x, 2x, 3x square sizes</p>
        <p> (note: this will erase any in place pixels)</p>
        <p>Save your work!</p>
      </div>
    );
  }
}

export default Instructions;
