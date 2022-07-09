import { Document } from "postcss";

class Animation {

  // SG 07/07/2022 22:00  define differnet animaiton here and call it in sorting algorithms


  /**
   * takes indecies to be swapped
   * @param {Integer} i 
   * @param {Integer} j 
   */
  swap(i, minBarIndex) {
    let unSortedBars = document.querySelectorAll('.array-bars');
    var temp1 = unSortedBars[minBarIndex].style.height;
    unSortedBars[minBarIndex].style.height = unSortedBars[i].style.height;
    unSortedBars[i].style.height = temp1;

    var temp2 = unSortedBars[minBarIndex].id;
    unSortedBars[minBarIndex].id = unSortedBars[i].id;
    unSortedBars[i].id = temp1;
  }


  static async getAnimation(delay) {
    await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, delay)
  );
  }
}


export { Animation }