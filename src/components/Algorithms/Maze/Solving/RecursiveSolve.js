import {directions}                                                                                from '../Directions';
import {_FindCellVisitState, _FindCellTypeState, _FindCell, _GetNeighbors, _GetNeighborsUnvisited} from '../Tools';
import {useState, useEffect}                                                                       from 'react';
// import exit                                                 from 'exit';



/*
 * Recursive backtracking algorithm to solve a solvable maze.
 */
export default function RecursiveBacktrackSolution(board, start, end) {
  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);
  const [current, setCurrent] = useState(start);
  const [endFound, setEndFound] = useState(false);

  useEffect(() => {
    if (endFound) {
      return;
    }

    const next = _GetNeighborsUnvisited(board, current);
    if (next) {
      setVisited([...visited, next]);
      setCurrent(next);
    } else {
      setPath([...path, current]);
      setCurrent(path[path.length - 1]);
      if (current === end) {
        setEndFound(true);
      }
    }
  }, [endFound, board, current, end, path, visited]);

  return {
    visited,
    path,
    current,
    endFound,
  };
}