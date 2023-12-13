import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

/**
 * Board Component
 * @param {Object} props - The properties object
 * @param {number} props.nrows - The number of rows in the board
 * @param {number} props.ncols - The number of columns in the board
 * @param {number} props.chanceLightStartsOn - The probability that a cell is lit at the start
 * @returns {Array<Array<boolean>>} - A 2D array representing the board state, where each cell is either lit (true) or unlit (false)
 */

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());


  /**
   * Simulates flipping a cell and its neighbors
   * @param {Array<Array<boolean>>} board - The current board state
   * @param {number} y - The row index of the cell to flip
   * @param {number} x - The column index of the cell to flip
   */
  function simulateFlip(board, y, x) {
    const flipCell = (y, x) => {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    };
  
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit
   * @returns {Array<Array<boolean>>} - A 2D array representing the new board state
   */
  function createBoard() {
    let initialBoard = Array(nrows).fill().map(() => Array(ncols).fill(false));

    //simulate random moves
    for (let i = 0; i < nrows * ncols; i++) {
      let y = Math.floor(Math.random() * nrows);
      let x = Math.floor(Math.random() * ncols);
      simulateFlip(initialBoard, y, x);
    }
    
    // Additional random lighting based on chanceLightStartsOn
    for (let y = 0; y < nrows; y++) {
      for (let x = 0; x < ncols; x++) {
        if (Math.random() < chanceLightStartsOn) {
          simulateFlip(initialBoard, y, x);
        }
      }
    }

    return initialBoard;
  }



  function hasWon() {
    for (let row of board) {
      if (row.includes(true)) {
        return false;
      }
    }
    return true;
  }

/**
 * Flips the cells around a given coordinate on the board.
 * The cells that will be flipped are the cell at the given coordinate and its direct neighbors.
 * If a cell is currently lit, it will be unlit, and vice versa.
 * @param {string} coord - The coordinate of the cell to flip, in the format "y-x"
 */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        // checking if the coord is on the boardQ
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = JSON.parse(JSON.stringify(oldBoard));
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;

    });
  }

  if (hasWon()) {
    return <h1>You win!</h1>;
  }

  // building the DOM table board
  let tblBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={() => flipCellsAround(coord)} />);
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
  )
}

export default Board;
