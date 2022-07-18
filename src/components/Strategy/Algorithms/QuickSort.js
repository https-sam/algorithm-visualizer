import { Animation } from "../../Animation/Animation";


class QuickSort {
  constructor() {
    this.options = null;
  }

  getIndexDOM(element, DOM) {
    for(const e of DOM) {
      if(element === parseInt(e.id)) return DOM.indexOf(e);
    }
  }


  async swap(array, left, right) {
    // SG 07/14/2022 12:08  getting index of elements to be swapped in the DOM for animation
    let DOM = Array.from(document.querySelectorAll('.array-bars'));
    let first = this.getIndexDOM(array[left], DOM);
    let second = this.getIndexDOM(array[right], DOM);

    // swapping them in the array, NOT DOM
    let temp = array[left];
    array[left] = array[right];
    array[right] = temp;


    await Animation.getAnimation(this.options.delay);
    Animation.swap(first, second);
  }

  async partition(array, left, right) {
    let DOM = Array.from(document.querySelectorAll('.array-bars'));
    let i = left;
    let j = right;

    // SG 07/14/2022 12:00  Picking the central value as pivot, which statistically runs fast for patially sorted arrays
    let pivot = array[Math.floor((right + left) / 2)];

    let pivotIndex = this.getIndexDOM(pivot, DOM);
    // SG 07/14/2022 14:13  coloring pivot
    DOM[pivotIndex].style.backgroundColor = this.options.currentMinBarColor;

    while(left <= right) {
      while(array[left] < pivot) {
        left++;
      }
      while(array[right] > pivot) {
        right--;
      }
      if(left <= right) {
        await this.swap(array, left, right);
        left++;
        right--;
      }
    }

    // SG 07/14/2022 13:49  coloring the partition back to default color
    DOM[i].style.backgroundColor = this.options.defaultBarColor;
    DOM[j].style.backgroundColor = this.options.defaultBarColor;

    // SG 07/14/2022 13:14  color pivor back to default bar color
    DOM[pivotIndex].style.backgroundColor = this.options.defaultBarColor;
    
    return left;
  }


  async quickSort(array, left, right) {
    let i;
    let DOM = Array.from(document.querySelectorAll('.array-bars'));

    // SG 07/14/2022 13:50  coloring the partition 
    DOM[left].style.backgroundColor = this.options.processingColor;
    DOM[right].style.backgroundColor = this.options.processingColor;

    if(array.length > 1) {
      i = await this.partition(array, left, right);
      if(left < i - 1) {
        if(this.options.skipJ) {
          this.quickSort(array, left, i - 1);
        } else {
          await this.quickSort(array, left, i - 1);
        }
      } 
      if(i < right) {
        if(this.options.skipJ) {
          this.quickSort(array, i, right);
        }  else {
          await this.quickSort(array, i, right);
        }
      }
    }


    // SG 07/14/2022 13:38  coloring sorted bars
    DOM[left].style.backgroundColor = this.options.sortedBarColor;
    DOM[right].style.backgroundColor = this.options.sortedBarColor;

    
    return array;
  }

  async perform(options, array) {
    this.options = options;
    await this.quickSort(array, 0, array.length-1);
  }
}


export { QuickSort };