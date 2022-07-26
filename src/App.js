import './App.css';
import React       from 'react';
import MazeDisplay from './components/Algorithms/Maze/MazeDisplay';
import AppRouter   from './AppRouter';
import Navigation from './components/Page/partial/Navbar/Navigation';



export default function App() {

  return (
      <>
        <div className = "App">
          <AppRouter/>
        </div>
      </>
  );
}



