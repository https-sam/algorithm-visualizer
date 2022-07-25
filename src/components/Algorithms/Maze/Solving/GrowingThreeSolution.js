export default function GrowingThreeSolution(board, start, end) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === end[0] && y === end[1]) {
      return true;
    }
    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];
      if (nx < 0 || nx >= board.length || ny < 0 || ny >= board[0].length) {
        continue;
      }
      if (board[nx][ny] === 1) {
        continue;
      }
      if (visited.has([nx, ny])) {
        continue;
      }
      visited.add([nx, ny]);
      queue.push([nx, ny]);
    }
  }
  return false;
}