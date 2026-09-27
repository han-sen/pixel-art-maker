import Board from "./components/Board";
import Instructions from "./components/Instructions";

export default function App() {
  return (
    <div className="page_wrap">
      <div className="col-2 instructions">
        <h1>Pixel Art Maker</h1>
        <Instructions />
      </div>
      <div className="col-2 app_container">
        <Board />
      </div>
    </div>
  );
}
