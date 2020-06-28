import React from "react";
import gitIcon from "../img/GitHub-Mark-64px.png";


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
        <p>
        <a className="gitTab_wrap" href="https://github.com/han-sen/pixel-art-maker">
          <img src={gitIcon} alt="github" />
        </a>
        </p>

      </div>
    );
  }
}

export default Instructions;
