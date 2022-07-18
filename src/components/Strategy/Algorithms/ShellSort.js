import { Animation } from "../../Animation/Animation";

class ShellSort {

  constructor() {
    this.options = null;
  }

  getIndexDOM(element, DOM) {
    for(const e of DOM) {
      if(element === parseInt(e.id)) return DOM.indexOf(e);
    }
  }

  async shellSort(array, n = array.length) {
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      let firstLoopEnds = !Math.floor(gap / 2) > 0;
      for (let i = gap; i < n; i += 1) {
        if(!this.options.skipJ) {
          await Animation.getAnimation(this.options.delay);
        }

        let temp = array[i];
        let j;
  
        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {     
          let DOM = Array.from(document.querySelectorAll('.array-bars'));
          DOM[j].style.backgroundColor = this.options.processingColor;
          DOM[j-gap].style.backgroundColor = this.options.processingColor;
          let index = this.getIndexDOM(array[j], DOM);

          // SG 07/15/2022 17:17  changing heights
          await Animation.getAnimation(this.options.delay);
          Animation.changeHeight(index, array[j - gap], array.indexOf(array[j - gap]));       
          DOM[j].style.backgroundColor = this.options.defaultBarColor;
          DOM[j-gap].style.backgroundColor = this.options.defaultBarColor;

          // SG 07/15/2022 17:23  coloring sorted bars at the last iteration
          if(firstLoopEnds) {
            DOM[j].style.backgroundColor = this.options.sortedBarColor;
            DOM[j-gap].style.backgroundColor = this.options.sortedBarColor;
          }

          array[j] = array[j - gap];
        }
       

        let DOM = Array.from(document.querySelectorAll('.array-bars'));

        // SG 07/15/2022 17:23  coloring sorted bars at the last iteration
        if(firstLoopEnds) {
          DOM[0].style.backgroundColor = this.options.sortedBarColor;
          DOM[j].style.backgroundColor = this.options.sortedBarColor;
        }
        let index = this.getIndexDOM(array[j], DOM);

        array[j] = temp;
        Animation.changeHeight(index, temp, array.indexOf(array[j]));
      }
    }
    return array;
  } 

  async perform(options, array) {
    this.options = options;
    await this.shellSort(array);
  }
}

export { ShellSort };