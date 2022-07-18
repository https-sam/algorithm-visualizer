import { Animation } from '../../Animation/Animation';

class MergeSort {

  // static async merge(left, right, unSortedArray) {
  //   console.log(left);
  //   console.log(right);
  //   let arr = []
  //   let i = 0;
  //   while (left.length && right.length) {
  //     await Animation.getAnimation(4);

  //     if (parseInt(left[0].id) < parseInt(right[0].id)) {
  //       document.getElementById(left[0].id).style.backgroundColor = 'red';
  //       arr.push(left.shift());
  //     } else {
  //       document.getElementById(right[0].id).style.backgroundColor = 'red';
  //       arr.push(right.shift()) 
  //     }     
  //   }

  //   return [ ...arr, ...left, ...right ]
  // }

  // static async mergeSort (array) {
  //   if(array.length <= 1) {
  //     return array;
  //   }

  //   const middle = Math.floor(array.length / 2); 
  //   const left = array.slice(0, middle)
  //   const right = array.slice(middle);

  //   return await MergeSort.merge( // ([int] [int])
  //     await MergeSort.mergeSort(left), 
  //     await MergeSort.mergeSort(right),
  //     array  
  //   );
  // }
   completeMerge(originalArray, startIdx, middleIdx, endIdx, pointerArray, animation) {
    let k = startIdx, i = startIdx, j = middleIdx + 1;

    while(i <= middleIdx && j <= endIdx) {
      animation.push([i, j]);
      animation.push([i, j]);

      if(pointerArray[i] <= pointerArray[j]) {
        animation.push([k, pointerArray[i]]);
        originalArray[k++] = pointerArray[i++];
      } else {
        animation.push([k, pointerArray[j]]);
        originalArray[k++] = pointerArray[j++];
      }
    }

    while (i <= middleIdx) {
      animation.push([i, i]);
      animation.push([i, i]);
      animation.push([k, pointerArray[i]]);
      originalArray[k++] = pointerArray[i++];
    }
    while (j <= endIdx) {
      animation.push([j, j]);
      animation.push([j, j]);
      animation.push([k, pointerArray[j]]);
      originalArray[k++] = pointerArray[j++];
    }
  }  


   mergeHelper(originalArray, startIdx, endIdx, pointerArray, animation) {
    if(startIdx === endIdx) {
      return;
    }
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    this.mergeHelper(pointerArray, startIdx, middleIdx, originalArray, animation);
    this.mergeHelper(pointerArray, middleIdx + 1, endIdx, originalArray, animation);
    this.completeMerge(originalArray, startIdx, middleIdx, endIdx, pointerArray, animation);
  }


   mergeSort(array) {
    const animation = [];
    if (array.length <= 1) return array;
    const pointerArray = array.slice();
    this.mergeHelper(array, 0, array.length - 1, pointerArray, animation);
    console.log(array);
    return animation;
  }

  async perform(options, array) {
    const animation = this.mergeSort(array);
    await Animation.animateMerge(options, animation);
  }
  
}

export { MergeSort }