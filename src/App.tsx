import type { FC } from "react";

const Board: FC = () => {
  return (
    <>
      <div className="board-row">
        <button type="button" className="square">
          1
        </button>
        <button type="button" className="square">
          2
        </button>
        <button type="button" className="square">
          3
        </button>
      </div>
      <div className="board-row">
        <button type="button" className="square">
          4
        </button>
        <button type="button" className="square">
          5
        </button>
        <button type="button" className="square">
          6
        </button>
      </div>
      <div className="board-row">
        <button type="button" className="square">
          7
        </button>
        <button type="button" className="square">
          8
        </button>
        <button type="button" className="square">
          9
        </button>
      </div>
    </>
  );
};

export default Board;
