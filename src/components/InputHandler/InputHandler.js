
class InputHandler {
  static inputArray = [];

  /**
   * @retuns {Integer[]}
   */
  static get getGeneratedArray() {
    return InputHandler.inputArray;
  }

  /**
   * @param {Integer[]} newArray
   */
  static set setInputArray(newArray) {
    InputHandler.inputArray = newArray;
  }

  static randomIntFromInterval = (min, max) => {
    // https://gist.github.com/spyesx/485e4584aae767201f41
    return Math.floor( Math.random()*  ( max - min + 1 ) + min );
  }

  static getAllowedMaxInputSize() {
    const MARGIN = 2;
    const BAR_MIN_WIDTH = 1;
    const SCREEN_WIDTH = window.innerWidth;
    return Math.floor(SCREEN_WIDTH / (BAR_MIN_WIDTH + MARGIN));
  }

  static generateRandomIntArray(inputSize) {
    let arr = [];
    const MAX_BAR_HEIGHT = window.innerHeight - 280;
    for(var i = 0; i < inputSize; i++) {
      arr.push(InputHandler.randomIntFromInterval(5, MAX_BAR_HEIGHT))
    } 
    InputHandler.setInputArray = arr;
    console.log(InputHandler.getGeneratedArray)
  }

  static handleInputRequest(inputSize) {
    InputHandler.generateRandomIntArray(inputSize);
    
    return InputHandler.getGeneratedArray;
  }
}


export {InputHandler}