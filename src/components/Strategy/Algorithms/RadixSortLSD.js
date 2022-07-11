import { Animation } from "../../Animation/Animation";


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

  async sort(array, exp, DOM, originalArray) {
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

    // Build the sortedArray array
    for (i = k - 1; i >= 0; i--) {
      await Animation.getAnimation(4);
      const oldValue = array[i]; // value being sorted to a new index
      const oldIndex = this.getIndexDOM(oldValue, DOM); // index of old value
      const sortedIndex = bucket[Math.floor(array[i] / exp) % 100] - 1;
      const valueInOldArray = array[sortedIndex];

      Animation.swap(oldIndex, sortedIndex);

      sortedArray[sortedIndex] = oldValue;
      bucket[Math.floor(array[i] / exp) % 100]--;
    }

    for (i = 0; i < k; i++) {
      array[i] = sortedArray[i];
    }
  }

  async perform(options, array) {
    let max = this.getMaxValue(array); 
    let DOM = Array.from(document.querySelectorAll('.array-bars'));
    let originalArray = array.slice();

    for(let i = 1; Math.floor(max / i) > 0; i*=100) {
      await this.sort(array, i, DOM, originalArray);
    }
  }
}

export { RadixSortLSD }