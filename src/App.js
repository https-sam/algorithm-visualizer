import './App.css';
import React     from 'react';
import Display   from './components/BoardCanvas/Display';
import AppRouter from './AppRouter';
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



