'use strict';



/**
 *
 */
class Move {
  constructor() {
    this.column = 0;
    this.value  = 0;
    this.grid   = null;
  }


  static Move(C, V, G) {
    this.column = C;
    this.value  = V;
    this.grid   = G;
  }


  static Copy = function(M) {
    this.column = M.column;
    this.value  = M.value;
    this.grid   = M.grid;
  };


  getColumn() {
    return this.column;
  }


  getBoard() {
    return this.grid;
  }


  getValue() {
    return this.value;
  }


  setValue(value) {
    this.value = value;
  }


  addValue(value) {
    this.value += value;
  }


  compareTo(other) {
    return (this.value === other.value);
  }
}