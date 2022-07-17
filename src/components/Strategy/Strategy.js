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

  async perform(options, inputArray) {
    await this._strategy.perform(options, inputArray);
  }
}



export { Strategy }