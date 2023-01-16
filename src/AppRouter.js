import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/Page/Splash/SplashScreen";
import MainSortingCanvas from "./components/Canvas/MainSortingCanvas";
import AboutScreen from "./components/Page/About/AboutScreen";
import ContactScreen from "./components/Page/Contact/ContactScreen";
import MazeDisplay from "./components/Algorithms/Maze/MazeDisplay";
import DiceDisplay from "./components/Algorithms/Propability/DiceDisplay";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SplashScreen />} />
        <Route exact path="/home" element={<MainSortingCanvas />} />
        <Route exact path="/dashboard" element={<MainSortingCanvas />} />
        <Route exact path="/dashboard-two" element={<MazeDisplay />} />
        <Route exact path="/dashboard-three" element={<DiceDisplay />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        {/* <Route path="/sorting-visualizer" element={<MainSortingCanvas />} /> */}
        <Route path="/sorting-visualizer" element={<SplashScreen />} />
        <Route path="/sorting-visualizer/app" element={<MainSortingCanvas />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
