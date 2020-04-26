import React from "react";

class Instructions extends React.Component {
  render() {
    return (
      <div className="instructions_wrap">
        <p>
          This is a<span className="highlight"> React </span>pixel art maker
          demo.
        </p>
        <p>
          <span className="highlight">Click</span> and{" "}
          <span className="highlight">drag</span> to paint the squares.
        </p>
        <p>
          Toggle the <span className="highlight">grid</span> on and off.
        </p>
        <p>
          Use the <span className="highlight">detail</span> button to toggle
          between square sizes.
        </p>
        <p>
          <span className="highlight">
            (note: this will erase any in place pixels)
          </span>
        </p>
        <p>
          <span className="highlight">Save</span> your work!
        </p>
      </div>
    );
  }
}

export default Instructions;
