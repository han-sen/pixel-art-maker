import Board from "./components/Board";

export default function App() {
  return (
    <div className="page_wrap">
      <div className="app_container">
        <div className="brand_wrap">
          <h1>Bit Easel</h1>
        </div>
        <Board />
      </div>
    </div>
  );
}
