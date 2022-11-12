import { solveSudoku } from "./solve";
import { useState } from "react";

function App() {
  const emptyBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [board, setBoard] = useState<number[][]>(emptyBoard);
  const [isSolvable, setIsSolvable] = useState(true);

  const clearBoard = () => {
    setBoard(emptyBoard);
    setIsSolvable(true);
  };

  const solve = () => {
    let puzzle = "";
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        puzzle += board[i][j];
      }
    }
    return solveSudoku(puzzle);
  };

  const solveButton = () => {
    try {
      const res = solve();
      setBoard(stringToBoard(res));
    } catch (error) {
      setIsSolvable(false);
    }
  };

  const stringToBoard = (string: string) => {
    let res = [];
    let row = [];
    for (let i = 0; i < string.length; i++) {
      row.push(Number(string[i]));
      if ((i + 1) % 9 == 0) {
        res.push(row);
        row = [];
      }
    }
    return res;
  };

  const addNumber = (nr: number, row: number, col: number) => {
    const newBoard = board.map((_row, rowIndex) =>
      _row.map((_col, colIndex) => {
        if (rowIndex == row && col == colIndex) return nr;
        else return _col;
      })
    );
    return setBoard(newBoard);
  };

  const Grid = () => {
    return (
      <div className="mx-auto grid cursor-crosshair">
        {board.map((row, rowIndex) => {
          let checkRow = false;
          if (rowIndex + 1 == 3 || rowIndex + 1 == 6) checkRow = true;
          return (
            <div key={rowIndex} className="flex flex-row drop-shadow-lg  ">
              {row.map((nr, nrIndex) => {
                let check = false;
                if (nrIndex + 1 == 3 || nrIndex + 1 == 6) check = true;
                return (
                  <div
                    key={nrIndex}
                    className={`w-10 h-10  ${
                      check ? "mr-3 ml-1 mt-1 mb-1" : "m-1"
                    } ${checkRow ? "mb-3" : "mb-1"}`}>
                    <input
                      type="text"
                      maxLength={1}
                      min={1}
                      max={9}
                      value={
                        board[rowIndex][nrIndex] > 0
                          ? board[rowIndex][nrIndex]
                          : ""
                      }
                      onChange={(e) =>
                        addNumber(Number(e.target.value), rowIndex, nrIndex)
                      }
                      className={`form-input w-full drop-shadow-sm rounded-md cursor-crosshair  ${
                        !isSolvable ? "border-2 border-red-700" : "border-1"
                      } `}></input>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <div className="mt-14 mb-10 text-xl text-center">Sudoku Solver</div>
      {Grid()}
      <div className="flex flex-row gap-6 mx-auto">
        <button
          onClick={() => solveButton()}
          className=" mt-10 w-fit px-6 py-2 rounded-xl border-2 border-gray-700 bg-gray-500 text-white">
          Solve
        </button>
        <button
          onClick={() => clearBoard()}
          className=" mt-10 w-fit px-6 py-2 rounded-xl border-2 border-gray-700 bg-gray-500 text-white">
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
