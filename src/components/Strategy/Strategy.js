import React, {Component} from 'react';

class Strategy {
  static targetArray = [];

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

  /**
   * @param {{}} options
   */
  set setOption(options) {
    this._strategy.setOptions = options;
  }

  /**
   * @param {any} newArray
   */
  static set setTargetArray(newArray) {
    Strategy.targetArray = newArray;
  }

  static get getTargetArray() { 
    return Strategy.targetArray; 
  }

  perform(options, inputArray) {
    this._strategy.perform(options, inputArray);
  }
}



export { Strategy }