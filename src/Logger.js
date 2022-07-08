class Logger {
  constructor() {
    this.log = [];
  }


  log(message) {
    this.log.push(message);
  }


  getLog() {
    return this.log.reduce((acc, message) => {
      (acc = `[${message.from.name} to ${message.to ? message.to.name : 'ALL'} 
						at ${message.date.toTimeString().slice(0,
          10)}] ${message.message}\n`);
    }, '');

  }
};

export default Logger;