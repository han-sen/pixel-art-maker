import React from "react";
import gitIcon from "../img/GitHub-Mark-64px.png";

class GitTab extends React.Component {
  render() {
    return (
      <div className="gitTab_wrap">
        <a href="https://github.com/han-sen/pixel-art-maker">
          <img src={gitIcon} alt="github" />
        </a>
      </div>
    );
  }
}

export default GitTab;
