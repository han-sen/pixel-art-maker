import React from "react";

class Instructions extends React.Component {
  render() {
    return (
      <div className="instructions_wrap">
        <p>
          <span className="highlight"> React </span>pixel art sprite maker demo.
        </p>
        <p>
          <span className="highlight">Click</span> and{" "}
          <span className="highlight">drag</span> to paint the squares.
        </p>
        <p>
          <span className="highlight">Load</span> a color{" "}
          <span className="highlight">palette</span>.
        </p>
        <p>
          <span className="highlight">Save</span> your work!
        </p>
      </div>
    );
  }
}

export default Instructions;
