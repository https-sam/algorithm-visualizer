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

  getIndexDOM(element, DOM) {
    for(const e of DOM) {
      if(element === parseInt(e.id)) return DOM.indexOf(e);
    }
  }

  async sort(array, exp, DOM, options, finalIteration) {
    const DEAULT_COLOR = options.defaultBarColor;
    const DELAY = options.delay;
    const SORTED_COLOR = options.sortedBarColor;
    console.log("================================================================");
    let k = array.length;
    let sortedArray = new Array(k);
    let i = 0;
    let bucket = new Array(100);


    for(let i = 0; i < 100; i++) {
      bucket[i] = 0;
    }

    for(let i = 0; i < k; i++) {
      bucket[Math.floor(array[i] / exp) % 100]++;
    }

    for (i = 1; i < 100; i++) {
      bucket[i] += bucket[i - 1];
    }


    // TODO need to add colors to bars being processed
    for (i = k - 1; i >= 0; i--) {
      await Animation.getAnimation(DELAY);
      const oldValue = array[i]; // value being sorted to a new index
      const oldIndex = this.getIndexDOM(oldValue, DOM); // index of old value
      const sortedIndex = bucket[Math.floor(array[i] / exp) % 100] - 1;
      const valueInOldArray = array[sortedIndex];

      Animation.swap(oldIndex, sortedIndex); // SG 07/10/2022 22:35  swap animation 
      if(finalIteration) {
        DOM[oldIndex].style.backgroundColor = SORTED_COLOR;
        DOM[sortedIndex].style.backgroundColor = SORTED_COLOR;
      }
      // BUG empty elements in bucket are ccurrently olored green due to 
      // TODO make sure that empty elemets in bucket are the default color
      // TODO grab those elements from DOM and change color back to defaut OR add a new condition in above if(finalIteration)

      sortedArray[sortedIndex] = oldValue;
      bucket[Math.floor(array[i] / exp) % 100]--;
    }


    for (i = 0; i < k; i++) { // SG 07/10/2022 22:35  copying sorted values
      array[i] = sortedArray[i];
    }
  }

  async perform(options, array) {
    let max = this.getMaxValue(array); 
    let DOM = Array.from(document.querySelectorAll('.array-bars'));

    for(let i = 1; Math.floor(max / i) > 0; i*=100) {
      // if((Math.floor(max / i*100) > 0) && i !== 1)
      await this.sort(array, i, DOM, options, ((Math.floor(max / i*100) > 0) && i !== 1));
    }
  }
}

export { RadixSortLSD }