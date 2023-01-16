// User defined class
// to store element and its priority
class CellPQPair {
  constructor(element) {
    this.cell     = element;
    this.priority = element.priority;
  }
}



// Cell PriorityQueue class
export class PriorityQueue {
  constructor() {
    this.cellContainer = [];
  }


  enqueue(pElement) {
    let cellPair = new CellPQPair(pElement);
    this.cellContainer.push(cellPair);
    this.sort();
  }

  sort() {
    this.cellContainer.sort((a, b) => {
      return a.cell.priority - b.cell.priority;
    });
  }


  dequeue() {
    if (this.isEmpty()) {
      console.log('Queue Underflow');
      return null;
    }

    return this.cellContainer.shift().cell;
  }


  peek() {
    if (this.isEmpty()) {
      console.log('Queue Underflow');
      return null;
    }
    return this.cellContainer[0].cell.id;
  }


  front() {
    if (this.isEmpty()) {
      console.log('Empty Queue');
      return null;
    }
    return this.cellContainer[0].cell;
  }

  has(cell) {
    return !!this.cellContainer.find(cell => cell.cell.id === cell.id);

  }

  equals(other) {
    return this.cellContainer.every(cell => other.has(cell.cell));
  }

  isEmpty() {
    return (this.cellContainer === undefined || this.cellContainer.length === 0);
  }


  printQue() {
    this.cellContainer.forEach(function(element) {
      console.log(element.cell + ' ' + element.priority);
    }.bind(this));
  }

  length() {
    return this.cellContainer.length;
  }

  clear() {
    this.cellContainer = [];
  }
}
