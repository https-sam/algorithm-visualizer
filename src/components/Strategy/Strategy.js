import React, {Component} from 'react';

class Strategy {
  constructor() {
    this._strategy = null;
  }

  /**
   * @param {changeRed} strategy
   */
  set setStrategy(strategy) {
    this._strategy = strategy;
  }

  get getStrategy() { 
    return this._strategy; 
  }

  perform() {
    this._strategy.perform();
  }
}

// SG 07/06/2022 19:11  strategy pattern test
class changeRed {
  perform() {
    document.getElementById("bar").style.backgroundColor = "red";
  }
}

export { Strategy, changeRed }