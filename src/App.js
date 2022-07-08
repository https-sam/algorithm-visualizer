import './App.css';
import React, {Component}      from 'react';
import { Strategy, changeRed } from './components/Strategy/Strategy'
import { InputField }          from './components/Canvas/InputField.js';
import MainCanvas from './components/Canvas/MainCanvas';

class App extends Component {

  constructor(props) {
    super(props);
    // this.changeRed = new changeRed();
    // this.Strategy = new Strategy().setStrategy = this.changeRed;
  }

  render() {
    return (
      <>
        <MainCanvas/>
      </>
    )
  }
}


export default App;
