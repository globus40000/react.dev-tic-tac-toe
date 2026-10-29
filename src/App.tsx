import { useState, type FC, type MouseEventHandler } from "react";

type Value = "X" | "O" | null;

interface ISquareProps {
  value: Value;
  onClick: MouseEventHandler;
}

const Square: FC<ISquareProps> = ({ value, onClick }) => {
  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board: FC = () => {
  const [squares, setSquares] = useState<Value[]>(() =>
    Array<Value>(9).fill(null),
  );

  const handleClick = (i: number) => {
    const nextSquares = squares.slice();

    nextSquares[i] = "X";

    setSquares(nextSquares);
  };

  return (
    <>
      <div className="board-row">
        <Square
          value={squares[0]}
          onClick={() => {
            handleClick(0);
          }}
        />
        <Square
          value={squares[1]}
          onClick={() => {
            handleClick(1);
          }}
        />
        <Square
          value={squares[2]}
          onClick={() => {
            handleClick(2);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onClick={() => {
            handleClick(3);
          }}
        />
        <Square
          value={squares[4]}
          onClick={() => {
            handleClick(4);
          }}
        />
        <Square
          value={squares[5]}
          onClick={() => {
            handleClick(5);
          }}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onClick={() => {
            handleClick(6);
          }}
        />
        <Square
          value={squares[7]}
          onClick={() => {
            handleClick(7);
          }}
        />
        <Square
          value={squares[8]}
          onClick={() => {
            handleClick(8);
          }}
        />
      </div>
    </>
  );
};

export default Board;
