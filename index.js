// Import stylesheets
import './style.css';
import { api } from './api-test';
import { render } from './excel';
import Prom from './promise';
// Write Javascript code!s
const appDiv = document.getElementById('app');
let sheet = render(appDiv, 2, 3);

let button = document.querySelector('[role=add]');
console.log(button);
if (button) {
  button.addEventListener('click', function () {
    console.log(api.postElephants());
    sheet.addRow();
  });
}

let input = document.createElement('input');
input.setAttribute('type', 'file');
input.setAttribute('multiple', 'true');
input.addEventListener('change', (event) => {
  api.postFile(event.target.files);
});
appDiv.append(input);
