// const gridPrototye = {};
//
//
// function Grid() {
//
// }
//
//
// Object.assign(Grid.prototype, gridPrototye);
//
//
// export default class GridState {
//   constructor(grid, type) {
//     this.grid = grid;
//     this.type = type;
//     this.size = grid.size;
//   }
//
//
//   getGrid() {
//     return this.grid;
//   }
//
//
//   setGrid(grid) {
//     this.grid = grid;
//   }
//
//
//   // changeGrid(grid, type) {
//   //   if (type === this.type) {
//   //     return;
//   //   }
//   //   switch (type) {
//   //     case 'circular':
//   //       // this.circularLayout(board);
//   //       break;
//   //     case 'grid':
//   //     default: {
//   //       // this.standardLayout(board);
//   //     }
//   //   }
//   // }
//
//
//   getType() {
//     return this.type;
//   }
//
//
//   setType(type) {
//     this.type = type;
//   }
//
//
//   updateGrid(grid) {
//     this.grid = grid;
//   }
//
//
//   // // Peter Beshai's iddea for the creation and animation of a board-like grid section
//   // // https://codesandbox.io/s/r3f-demo-2-prj0b
//   // standardLayout(board) {
//   //   const numPoints = board.length;
//   //   const numCols   = Math.ceil(Math.sqrt(numPoints));
//   //
//   //   for (let i = 0; i < numPoints; ++i) {
//   //     const datum = board[i];
//   //     const col   = (i % numCols) - numCols / 2;
//   //     const row   = Math.floor(i / numCols) - numCols / 2;
//   //
//   //     datum.x = col * 1.05;
//   //     datum.y = row * 1.05;
//   //     datum.z = 0;
//   //   }
//   // }
//   //
//   //
//   // circularLayout(board) {
//   //   let theta = 0;
//   //   for (let i = 0; i < board.length; ++i) {
//   //     const datum  = board[i];
//   //     const radius = Math.max(1, Math.sqrt(i + 1) * 0.8);
//   //     theta += (Math.asin(1 / radius));
//   //
//   //     datum.x = radius * Math.cos(theta);
//   //     datum.y = radius * Math.sin(theta);
//   //     datum.z = 0;
//   //   }
//   // }
// }
//
//
//
