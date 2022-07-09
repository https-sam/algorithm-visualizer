import './App.css';
import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
}                         from 'react-router-dom';

import Header                from './partial/Header';
import Selection             from './partial/Selection';
import Footer                from './partial/Footer';
import {Strategy, changeRed} from './components/Strategy/Strategy';
import {InputField}          from './components/Canvas/InputField.js';
import MainCanvas            from './components/Canvas/MainCanvas';
import SplashScreen          from './components/Container/Splash/SplashScreen';
import {Routes}              from 'react-router';



function About() {
  return null;
}



class App extends Component {

  render() {
    return (
        <>
          <Router>
            {/*<Layout>*/}
            <Routes>
              {/* A <Switch> looks through its children <Route>s and
               renders the first one that matches the current URL. */}
              <Route exact path = "/about" element = {<About/>}/>
              <Route exact path = "/home" element = {<MainCanvas/>}/>
              {/*<Route exact path = "/" element = {<SplashScreen/>}/>*/}
              <Route exact path = "/" element = {<MainCanvas/>}/>
            </Routes>
            {/*</Layout>*/}
          </Router>
        </>

    );

  }
}



export default App;
