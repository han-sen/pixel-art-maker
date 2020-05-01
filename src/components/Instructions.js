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
          <span className="highlight">Load</span> a{" "}
          <span className="highlight">palette</span> to for inspiration.
        </p>
        <p>
          <span className="highlight">Save</span> your work!
        </p>
      </div>
    );
  }
}

export default Instructions;
