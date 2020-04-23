import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Canvas from "./components/Canvas";

class App extends React.Component {
  render() {
    return <Canvas />;
  }
}
// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
