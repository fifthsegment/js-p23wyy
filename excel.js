import { api } from './api-test';

class ActionCell {
  htmlElement = null;
  row = 0;
  onRemove;
  constructor(row, onRemove) {
    this.onRemove = onRemove;
    this.row = row;
    this.removeFn = this.removeFn.bind(this);
    this.htmlElement = document.createElement('div');
    this.htmlElement.setAttribute('class', 'cell');
    let button = document.createElement('button');
    button.innerText = 'X';
    let that = this;
    button.addEventListener('click', function () {
      console.log('Removing');
      that.removeFn(this.row);
    });
    this.htmlElement.appendChild(button);
    return this;
  }
  removeFn() {
    this.onRemove(this.row);
  }
}

class Cell {
  htmlElement = null;
  constructor() {
    let div = document.createElement('div');
    div.setAttribute('class', 'cell');
    let input = document.createElement('input');
    this.onChange = this.onChange.bind(this);
    div.appendChild(input);
    this.htmlElement = div;
    return this;
  }
  onChange(e) {}
}

class Sheet {
  rows = [];
  parentElement = null;
  columns = 0;
  constructor(rows, columns, parentElement) {
    this.removeRow = this.removeRow.bind(this);
    this.parentElement = parentElement;
    this.rows = Array.apply(null, Array(rows));
    this.columns = columns;
    this.rows = this.rows.map((row, i) => {
      return this.getNewCellsForRow(i);
    });
    return this;
  }
  render() {
    this.parentElement.innerHTML = '';
    console.log('Rows', this.rows);
    this.rows.forEach((row_, id) => {
      let row = document.createElement('div');
      row.setAttribute('class', 'row row-id-' + id);
      for (var i = 0; i < row_.length; i++) {
        let cell = row_[i];
        row.appendChild(cell.htmlElement);
      }
      this.parentElement.appendChild(row);
    });
  }
  getNewCellsForRow(row) {
    let cells = [];
    cells.push(new ActionCell(row, this.removeRow));
    for (var i = 0; i < this.columns; i++) {
      cells.push(new Cell());
    }
    return cells;
  }
  addRow() {
    console.log(api.getElephants());
    console.log('LocalStore', api.localstore);
    this.rows.push(this.getNewCellsForRow(this.rows.length));
    this.render();
  }

  removeRow(rowToRemoveIndex) {
    console.log('Removing row from sheet', rowToRemoveIndex);
    let newRows = this.rows.filter((row, index) => {
      if (index == rowToRemoveIndex) {
        return false;
      }
      return true;
    });
    this.rows = newRows;
    this.render();
  }
}

function build() {}

function render(element, rows = 2, columns = 3) {
  let sheet = new Sheet(rows, columns, element);
  sheet.render();
  return sheet;
}

module.exports = {
  render: render,
};
