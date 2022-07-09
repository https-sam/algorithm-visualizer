/**
 *
 */
export class Board {
  constructor(params) {
    this.rows         = params.rows;
    this.columns      = params.columns;
    this.cells        = [params.rows * params.columns];
    this.totalCount   = 0;
    this.columnCounts = [params.columns] = [...0];
  }


  setCoord(row: number, col: number, id: number) {
    if (id < 0 || id > 2) {
      throw new Error('id=' + id);
    }
    if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
      throw new Error('row=' + row + ' col=' + col);
    }
    this.cells [row * this.columns + col] = id;
  }


  getCoord(row: number, column: number) {
    if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
      // throw an Error ('Invalid row or column');
      return -1;
    }
    return this.cells  [row * this.columns + column];
  }


  getnumRows() {
    return this.rows;
  }


  getnumColumns() {
    return this.columns;
  }


  getnumCells() {
    return this.cells.length;
  }


  getnumOccupiedCells() {
    return this.totalCount;
  }


  getnumEmptyCells() {
    return this.getnumCells() - this.getnumOccupiedCells();
  }


  isFull() {
    return this.getnumOccupiedCells() === this.getnumCells();
  }


  isColumnFull(number: number) {
    return this.columnCounts[number] === this.rows;
  }


  isCellOccupied(row: number, column: number) {
    return this.getCoord(row, column) > 0;
  }


  isTerminal = function() {
    return undefined;
  };
}