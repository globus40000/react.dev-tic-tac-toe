import { useState, type FC } from "react";

type Value = "X" | "O" | null;

const Square: FC = () => {
  const [value, setValue] = useState<Value>(null);

  const handleClick = () => {
    setValue("X");
  };

  return (
    <button type="button" className="square" onClick={handleClick}>
      {value}
    </button>
  );
};

const Board: FC = () => {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
};

export default Board;
