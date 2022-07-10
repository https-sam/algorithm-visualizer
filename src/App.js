import './App.css';
import React, {Component} from 'react';
import {Canvas}           from 'react-three-fiber';

import {Strategy /*changeRed*/} from './components/Strategy/Strategy';
import {InputField}             from './components/Canvas/InputField.js';
import MainCanvas               from './components/Canvas/MainCanvas';
import SelectionSort            from './components/Strategy/Algorithms/SelectionSort';

import Header       from './components/Page/partial/Header';
import Selection    from './components/Page/partial/Selection';
import Footer       from './components/Page/partial/Footer';
import SplashScreen from './components/Page/Splash/SplashScreen';
import Box          from './modals/cube/Box';
import AppRouter    from './AppRouter';



{/* Placeholder for the About page */}



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
