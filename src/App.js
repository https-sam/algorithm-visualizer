import './App.css';
import React, {Component} from 'react';
import {Canvas}           from 'react-three-fiber';

import {Strategy /*changeRed*/} from './components/Strategy/Strategy';
import {InputField}             from './components/Canvas/InputField.js';
import MainCanvas               from './components/Canvas/MainCanvas';
import SelectionSort            from './components/Strategy/Algorithms/SelectionSort';

import Header       from './partial/Header';
import Selection    from './partial/Selection';
import Footer       from './partial/Footer';
import SplashScreen from './components/Page/Splash/SplashScreen';
import Box          from './modals/cube/Box';
import AppRouter    from './AppRouter';



{/* Placeholder for the About page */}


function About() {
  return null;
}



class App extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
        <>
          <div className = "App">
            <AppRouter/>

          </div>

        </>
    );

  }
}



export default App;
