class Prom {
  status = 0;
  onThen = [];
  onReject = [];
  onError = [];
  constructor(fn) {
    this.status = 0;
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.catch = this.catch.bind(this);
    try {
      fn(this.resolve, this.reject);
    } catch (error) {
      this.onError.forEach((fn) => {
        fn();
      });
    }
    return this;
  }

  then(fn, fnReject) {
    this.onThen.push(fn);
    this.onReject.push(fnReject);
    return this;
  }

  resolve() {
    this.status = 1;
    this.onThen.forEach((fn) => {
      fn();
    });
  }

  reject() {
    this.status = 2;
    this.onReject.forEach((fn) => {
      fn();
    });
  }

  catch(fn) {
    this.onError.push(fn);
  }
}

export default Prom;

/*let p = new Prom((resolve, reject) => {
  setTimeout(() => {
    reject('hji');
  }, 1000);
});
p.then(
  () => {
    console.log('Promise resolved');
  },
  () => {
    console.log('rejected');
  }
).catch((error) => {
  console.log('Catching promise error ', error);
});*/
