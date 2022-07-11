import { CONSTANTS } from '../../Utility/config.js';
import { Strategy }  from '../Strategy/Strategy.js';

class InputHandler {
  static inputArray = [];


  /**
   * @retuns {Integer[]}
   */
  static get getGeneratedArray() {
    return InputHandler.inputArray;
  }


  /**
   *
   * @param {Integer[]} newArray
   */
  static set setInputArray(newArray) {
    InputHandler.inputArray = newArray;
  }


  /**
   *
   * @returns {number}
   */
  static getAllowedMaxInputSize() {
    const MAX_BAR_HEIGHT = window.innerHeight - CONSTANTS.OFFSET;
    const MARGIN = CONSTANTS.margin;
    const BAR_MIN_WIDTH = 1;
    const SCREEN_WIDTH  = window.innerWidth;
    const potentialNum =  Math.floor(SCREEN_WIDTH / (BAR_MIN_WIDTH + MARGIN));

    return potentialNum <= MAX_BAR_HEIGHT ? potentialNum : MAX_BAR_HEIGHT;
  }


  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  static shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


  /**
   *
   * @param inputSize
   */
  // SG 07/11/2022 12:01  generates random numbers, not consecutive
  static generateRandomIntArray(inputSize) {

    const MAX_BAR_HEIGHT = window.innerHeight - CONSTANTS.OFFSET;
    let arr              = Array.from(new Array(MAX_BAR_HEIGHT), (x, i) => i + 5);
    arr = InputHandler.shuffle(arr);
    arr = arr.slice(0, inputSize);
    InputHandler.setInputArray = arr;
    Strategy.setTargetArray = arr;
  }

  // // SG 07/11/2022 12:01  generates random numbers, all consecutive
  // static generateOptimizedArray(inputSize) {
  //   const MAX_BAR_HEIGHT = window.innerHeight - CONSTANTS.OFFSET;
  //   let div = Math.floor(window.innerHeight / window.innerWidth)
  //   let arr              = [];
  //   for(let i = 1; i < MAX_BAR_HEIGHT; i++) {
  //     if(i % div === 0) {
  //       arr.push(i);
  //     }
  //   }
    
  //   arr = InputHandler.shuffle(arr);

  //   InputHandler.setInputArray = arr;
  //   console.log(InputHandler.getGeneratedArray)
  //   Strategy.setTargetArray = arr;
  // }


  /**
   *
   * @param inputSize
   * @returns {[]}
   */
  static handleInputRequest(inputSize) {
    InputHandler.generateRandomIntArray(inputSize);

    return InputHandler.getGeneratedArray;
  }
}



export {InputHandler};