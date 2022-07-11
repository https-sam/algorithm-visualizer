import Move    from './Move';
import {Board} from './Board';



/**
 *
 */
class MiniMax {
  constructor(params) {
    this.objectRepresentation = params.objectRepresentation;

  }


  getObjectRepresentation() {
    return this.objectRepresentation.type;
  }


  calculate(params) {

  }


  calculateMax(params) {

  }


  calculateMin(params) {

  }


  minimax_Max(grid) {
    if (grid.isTerminal() || grid.isFull()) {
      return 0;
    }

    var board  = new Board(grid);
    var leaves = new Move[10];

    return this.calculateMax(leaves);
  }


  minimax_Min(grid) {
    if (grid.isTerminal() || grid.isFull()) {
      return 0;
    }

    var board          = new Board(grid);
    let leaves: Move[] = new Move[10];

    //
    for (var iter = 0; iter < leaves.length; iter++) {
      if (leaves[iter] != null) {
        leaves[iter].addValue((this.minimax_Min(leaves[iter].getBoard())));
      }
    }

    let bestMove: Move = null;
    for (var i = 0; i < leaves.length; i++) {
      if (bestMove == null) {
        // bestMove = moves[i];
        continue;
      }
      else {
        if (leaves[i] != null && bestMove.compareTo(leaves[i]) > 0) {
          bestMove = leaves[i];
        }
      }
    }
    //

    return this.calculateMin(leaves);
  }

}