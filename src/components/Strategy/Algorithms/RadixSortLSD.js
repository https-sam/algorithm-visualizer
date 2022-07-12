import { Animation } from "../../Animation/Animation";


// SG 07/10/2022 22:34  https://en.wikipedia.org/wiki/Radix_sort

class RadixSortLSD {

  getMaxValue(array) {
    let max = array[0];
    for(const num of array) {
      if(max < num) max = num;
    }
    return max;
  }

  /**
   * @param {Integer} element 
   * @param {[]} DOM 
   * @returns the index of the element in the DOM (Array converted from NodeList of DOM tree) 
   */
  getIndexDOM(element, DOM) {
    for(const e of DOM) {
      if(element === parseInt(e.id)) return DOM.indexOf(e);
    }
  }

  async sort(array, exp, DOM, options, finalIteration) {
    // SG 07/11/2022 11:36  init config data
    const DEAULT_COLOR = options.defaultBarColor;
    const DELAY = options.delay;
    const SORTED_COLOR = options.sortedBarColor;
    const PROCESSING_COLOR = options.processingColor;

    let k = array.length;
    let sortedArray = new Array(k);
    let i = 0;
    let counts = new Array(100);

    for(let i = 0; i < 100; i++) {
      counts[i] = 0;
    }

    for(let i = 0; i < k; i++) { // SG 07/11/2022 09:37  animating iterator
      counts[Math.floor(array[i] / exp) % 100]++;
      if(!options.skipJ) {
        if(DOM.length > 1000) { // for more than 1000 bars, only animate in every 3 bars
          if(i % 3 === 0) {
            await Animation.getAnimation(DELAY + 2);
            DOM[i].style.backgroundColor = PROCESSING_COLOR;
            await Animation.getAnimation(DELAY + 2);
            DOM[i].style.backgroundColor = DEAULT_COLOR;
          }
        } else {
          await Animation.getAnimation(DELAY);
          DOM[i].style.backgroundColor = PROCESSING_COLOR;
          await Animation.getAnimation(DELAY);
          DOM[i].style.backgroundColor = DEAULT_COLOR;
        }
      }
    }


    for (i = 1; i < 100; i++) {
      counts[i] += counts[i - 1];
    }



    for (i = k - 1; i >= 0; i--) {
      await Animation.getAnimation(DELAY);
      const oldValue = array[i]; // value being sorted to a new index
      const oldIndex = this.getIndexDOM(oldValue, DOM); // index of old value
      const sortedIndex = counts[Math.floor(array[i] / exp) % 100] - 1;
      const valueInOldArray = array[sortedIndex];

      Animation.swap(oldIndex, sortedIndex); // SG 07/10/2022 22:35  swap animation 
      
      if(finalIteration) { // SG 07/11/2022 00:29  Sorted array at the last iteration, coloring them sortedColor
        DOM[sortedIndex].style.backgroundColor = SORTED_COLOR;
      }
      sortedArray[sortedIndex] = oldValue;
      counts[Math.floor(array[i] / exp) % 100]--;
    }


    for (i = 0; i < k; i++) { // SG 07/10/2022 22:35  copying sorted values
      array[i] = sortedArray[i];
    }
  }

  async perform(options, array) {
    let max = this.getMaxValue(array); 
    let DOM = Array.from(document.querySelectorAll('.array-bars'));

    for(let i = 1; Math.floor(max / i) > 0; i*=100) {
      await this.sort(array, i, DOM, options, ((Math.floor(max / i*100) > 0) && i !== 1));
    }
  }
}

export { RadixSortLSD }