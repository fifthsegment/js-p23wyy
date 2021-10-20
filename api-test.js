//https://elephant-api.herokuapp.com/elephants
import json from './responses/elephants.json';

class Api {
  base;
  timesCalled = 0;
  localstore = [];
  abortController = null;
  constructor() {
    this.base = 'https://elephant-api.herokuapp.com/elephants';
    //this.base = '/';
    this.abortController = new AbortController();
    this.getFetchOptions = this.getFetchOptions.bind(this);
    return this;
  }

  getFetchOptions() {
    return { signal: this.abortController.signal };
  }

  abort() {
    this.abortController.abort();
  }

  buildUrl(endpoint = '/', params = {}) {
    console.log(this.timesCalled);
    this.timesCalled++;
    let stringified = Object.keys(params)
      .reduce((previous, current) => {
        previous.push('' + current + '=' + params[current]);
        return previous;
      }, []) //
      .join('&');
    return this.base + endpoint + '?' + stringified;
  }

  postElephants(elephants) {
    let d = this.getFetchOptions();
    console.log('Doing a post call');
    return fetch(
      this.buildUrl(),
      Object.assign(d, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(elephants),
      })
    );
  }

  getElephants() {
    const url = this.buildUrl('/');
    console.log(url);
    return new Promise((resolve, reject) => {
      resolve({ error: false, data: json });
      /*fetch(url, this.getFetchOptions()).then((response) => {
        response
          .json()
          .then((jsonData) => {
            resolve({ error: false, data: jsonData });
          })
          .catch((error) => {
            let json = require('./responses/elephants.json');
            reject({ error: true, data: json });
          });
      });*/
    });
  }

  postFile(files) {
    let formData = new FormData();

    Array.from(files).forEach((file, index) => {
      formData.append('file-' + index.toString(), files[0]);
    });
    fetch('/', {
      method: 'PUT',
      body: formData,
    });
  }
}

export let api = new Api();
