// import {Component} from 'react';
// import Cell        from '../../Board/Cell';
//
//
//
// export class Board extends Component {
//   constructor(rows, columns) {
//     super();
//     this.rows         = rows;
//     this.columns      = columns;
//     this.cells        = [];
//     this.totalCount   = 0;
//     this.columnCounts = [columns];
//     this.cellTar      = document.querySelectorAll('.cells');
//     this.canvas       = document.querySelectorAll('.display');
//
//   }
//
//
//   buildCells() {
//     let count = 0;
//     for (let i = 0; i < this.columns; i++) {
//       for (let x = 0; i < this.rows; i++) {
//         this.cells[count] = <Cell id = {count}
//                                   value = {null}
//                                   size = {2}
//                                   angle = {45}
//                                   position = {[x + 0.1, i, 0]}
//         />;
//         count++;
//       }
//     }
//     // for (let i = 0; i < this.columns; i++) {
//     //   for (let x = 0; i < this.rows; i++) {
//     //     this.canvas.appendChild(<Cell id = {count}
//     //                                   value = {null}
//     //                                   size = {2}
//     //                                   angle = {45}
//     //                                   position = {[(x + 0.1), 0, i]}
//     //     />);
//     //     count++;
//     //   }
//     // }
//     // for (let i = 0; i < this.cells.length; i++) {
//     //   this.canvas.appendChild(this.cells[i]);
//     // }
//   }
//
//
//   getCells() {
//     return this.cells;
//
//   }
//
//
//   setCoord(row: number, col: number, id: number) {
//     if (id < 0 || id > 2) {
//       throw new Error('id=' + id);
//     }
//     if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
//       throw new Error('row=' + row + ' col=' + col);
//     }
//     this.cells [row * this.columns + col] = id;
//   }
//
//
//   getCoord(row: number, column: number) {
//     if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
//       // throw an Error ('Invalid row or column');
//       return -1;
//     }
//     return this.cells  [row * this.columns + column];
//   }
//
//
//   getnumRows() {
//     return this.rows;
//   }
//
//
//   getnumColumns() {
//     return this.columns;
//   }
//
//
//   getnumCells() {
//     return this.cells.length;
//   }
//
//
//   getnumOccupiedCells() {
//     return this.totalCount;
//   }
//
//
//   getnumEmptyCells() {
//     return this.getnumCells() - this.getnumOccupiedCells();
//   }
//
//
//   isFull() {
//     return this.getnumOccupiedCells() === this.getnumCells();
//   }
//
//
//   isColumnFull(number: number) {
//     return this.columnCounts[number] === this.rows;
//   }
//
//
//   isCellOccupied(row: number, column: number) {
//     return this.getCoord(row, column) > 0;
//   }
//
//
//   isTerminal = function() {
//     return undefined;
//   };
//
//
// }