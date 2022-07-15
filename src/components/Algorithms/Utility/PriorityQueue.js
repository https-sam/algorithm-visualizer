// User defined class
// to store element and its priority
class CellPQPair {
  constructor(element, priority) {
    this.cell     = element;
    this.priority = priority;
  }
}



// Cell PriorityQueue class
class PriorityQueue {
  constructor() {
    this.cellContainer = [];
  }


  enqueue(pElement, priority) {
    const element = new CellPQPair(pElement, priority);
    var contain  = false;

    for (var i = 0; i < this.cellContainer.length; i++) {
      if (this.cellContainer[i].priority > element.priority) {
        this.cellContainer.splice(i, 0, element);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.cellContainer.push(qElement);
    }
  }


  dequeue() {
    if (this.isEmpty()) {
      console.log('Queue Underflow');
      return null;
    }
    return this.cellContainer.shift();
  }


  peek() {
    if (this.isEmpty()) {
      console.log('Queue Underflow');
      return null;
    }
    return this.cellContainer[0].id;
  }


  front() {
    if (this.isEmpty()) {
      console.log('Empty Queue');
      return null;
    }
    return this.cellContainer[0];
  }


  isEmpty() {
    return (this.cellContainer === undefined || this.cellContainer.length === 0);
  }


  printQue() {
    this.cellContainer.forEach(function(element) {
      console.log(element.cell + ' ' + element.priority);
    }.bind(this));
  }
}
