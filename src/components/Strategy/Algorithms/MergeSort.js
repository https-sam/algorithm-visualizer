import React, { Component } from 'react'
import { Animation } from '../../Animation/Animation';

class MergeSort {
  constructor() {

  }

  static async merge(left, right, unSortedArray) {
    console.log(left);
    console.log(right);
    let arr = []
    let i = 0;
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
      await Animation.getAnimation(4);

      if (parseInt(left[0].id) < parseInt(right[0].id)) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift()) 
      }     
    }

    return [ ...arr, ...left, ...right ]
  }

  static async mergeSort (array) {
    if(array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2); 
    const left = array.slice(0, middle)
    const right = array.slice(middle);

    return await MergeSort.merge( // ([int] [int])
      await MergeSort.mergeSort(left), 
      await MergeSort.mergeSort(right),
      array  
    );
  }

  static async perform(options) {
    let unSortedBars = Array.from(document.querySelectorAll('.array-bars'));
    return await MergeSort.mergeSort(unSortedBars);
  }


  render() {
    return (
      <div>MergeSort</div>
    )
  }
}

export { MergeSort }