import React from "react";

class Instructions extends React.Component {
  render() {
    return (
      <div className="instructions_wrap">
        <p>
          <span className="highlight_blue">&#172;</span> This is a{" "}
          <span className="highlight">React pixel art maker demo</span>.
        </p>
        <p>
          <span className="highlight_blue">&#172;</span> Toggle the{" "}
          <span className="highlight">grid</span> on and off.
        </p>
        <p>
          <span className="highlight_blue">&#172;</span> Use the{" "}
          <span className="highlight">detail</span> button to toggle between
          square sizes.
        </p>
        <p>
          <span className="highlight">
            (note: this will erase any in place pixels)
          </span>
        </p>
        <p>
          <span className="highlight_blue">&#172;</span>{" "}
          <span className="highlight">Save</span> your work!
        </p>
      </div>
    );
  }
}

export default Instructions;
