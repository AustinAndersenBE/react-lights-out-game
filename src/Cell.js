import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

/**
 * Cell Component
 * @param {Object} props - The properties object
 * @param {boolean} props.isLit - A boolean indicating whether the cell is lit or not
 * @param {function} props.flipCellsAroundMe - A function to be called when the cell is clicked, which will flip the cell and its neighbors
 * @returns {JSX.Element} - A table data cell (td) element representing a cell on the board
 */
function Cell({ flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
