import { Animation } from "../../Animation/Animation"


class HeapSort {

  constructor() {
    this.options = null;
  }

  getIndexDOM(element, DOM) {
    for(const e of DOM) {
      if(element === parseInt(e.id)) return DOM.indexOf(e);
    }
  }

  async heapify(array, n, i) {
    let max = i;
    let left = (2 * i) + 1;
    let right = (2 * i) + 2;
    let DOM = Array.from(document.querySelectorAll('.array-bars'));
    let currentBar = this.getIndexDOM(array[i], DOM);

    // SG 07/15/2022 14:06  making sure that the last bar - when n = 1, is not colored
    if(n > 2) {
      DOM[currentBar].style.backgroundColor = this.options.processingColor;
    }

    if(left < n && array[left] > array[max]) {
      max = left;
    }

    if(right < n && array[right] > array[max]) {
      max = right;
    }

    if(max !== i) {
      // SG 07/15/2022 13:23  swapping, sorted
      let first = this.getIndexDOM(array[i], DOM);
      let second = this.getIndexDOM(array[max], DOM);

      if(!this.options.skipJ) {
        await Animation.getAnimation(this.options.delay);
      }

      Animation.swap(first, second);

      let temp = array[i];
      array[i] = array[max];
      array[max] = temp;

      await this.heapify(array, n, max);
    }

    // SG 07/15/2022 14:06  making sure that the last bar - when n = 1, is not colored
    if(n > 2) {
      DOM[currentBar].style.backgroundColor = this.options.defaultBarColor;
    }
  }

  async heapSort(array, n) {
    for(let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await this.heapify(array, n, i);
    }

    for(let i = n - 1; i >= 0; i--) {
      let DOM = Array.from(document.querySelectorAll('.array-bars'));

      // SG 07/15/2022 13:20  swaping value to the end
      let first = this.getIndexDOM(array[0], DOM);
      let second = this.getIndexDOM(array[i], DOM);
      await Animation.getAnimation(this.options.delay);
      Animation.swap(first, second);

      // SG 07/15/2022 13:52  coloring sorted bars
      DOM[second].style.backgroundColor = this.options.sortedBarColor;
      

      let temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      
     await this.heapify(array, i , 0);
    }

    return array;;
  }

  perform(options, array) {
    this.options = options;
    console.log(this.heapSort(array, array.length));
  }
}



export { HeapSort } 