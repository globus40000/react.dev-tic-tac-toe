import { useState, type FC, type MouseEventHandler } from "react";

type Value = "X" | "O" | null;

const calculateWinner = (squares: Value[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

interface ISquareProps {
  value: Value;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Square: FC<ISquareProps> = ({ value, onClick }) => {
  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
};

interface IBoardProps {
  xIsNext: boolean;
  squares: Value[];
  onPlay: (squares: Value[]) => void;
}

const Board: FC<IBoardProps> = ({ xIsNext, squares, onPlay }) => {
  const winner = calculateWinner(squares);

  const handleClick = (i: number) => {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  };

  const rows = [0, 1, 2];
  const columns = [0, 1, 2];
  const getSquareId = (rowId: number, columnId: number) => rowId * 3 + columnId;

  return (
    <>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`}
      </div>
      {rows.map((rowId) => (
        <div className="board-row" key={rowId}>
          {columns.map((columnId) => {
            const squareId = getSquareId(rowId, columnId);

            return (
              <Square
                value={squares[squareId]}
                onClick={() => {
                  handleClick(squareId);
                }}
                key={squareId}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

const Game: FC = () => {
  const [history, setHistory] = useState<Value[][]>(() => [
    Array<Value>(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [isReversed, setIsReversed] = useState(false);

  const handlePlay = (nextSquares: Value[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((_squares, move) => {
    const isCurrentMove = move === currentMove;
    let description;

    if (isCurrentMove) {
      description =
        move > 0 ? `You are at move #${String(move)}` : "You are at game start";
    } else {
      description =
        move > 0 ? `Go to move #${String(move)}` : "Go to game start";
    }

    return (
      <li key={`move-${String(move)}`}>
        {isCurrentMove ? (
          description
        ) : (
          <button
            type="button"
            onClick={() => {
              jumpTo(move);
            }}
          >
            {description}
          </button>
        )}
      </li>
    );
  });

  if (isReversed) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol reversed={isReversed}>{moves}</ol>
        <label>
          <input
            type="checkbox"
            onChange={() => {
              setIsReversed((prev) => !prev);
            }}
            checked={isReversed}
          />
          Reversed moves
        </label>
      </div>
    </div>
  );
};

export default Game;
