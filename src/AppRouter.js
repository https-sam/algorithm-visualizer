import React         from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, BrowserRouter,
}                    from 'react-router-dom';
import SplashScreen  from './components/Page/Splash/SplashScreen';
import MainSortingCanvas    from './components/Canvas/MainSortingCanvas';
import AboutScreen   from './components/Page/About/AboutScreen';
import ContactScreen from './components/Page/Contact/ContactScreen';



function AppRouter() {
  return (
      <Router>
        <Routes>
          <Route exact path = "/"
                 element = {<SplashScreen/>}/>
          <Route path = "/about"
                 element = {<AboutScreen/>}/>
          <Route path = "/contact"
                 element = {<ContactScreen/>}/>
          <Route path = "/sorting-visualizer"
                 element = {<MainSortingCanvas/>}/>
        </Routes>
      </Router>
  );
}


export default AppRouter;