
import './App.css';
import React, {Component} from 'react';
import { Strategy, changeRed } from '../src/components/Strategy/Strategy.js'




class App extends Component {

  constructor(props) {
    super(props);
    this.changeRed = new changeRed();
    this.Strategy = new Strategy().setStrategy = this.changeRed;
  }

  render() {
    return (
      <>
        <div className="h-72 w-72 bg-blue-500" id="bar" onClick={this.Strategy.perform}></div>
      </>
    )
  }
}


export default App;
