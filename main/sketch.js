let table;

let numRows, numCols;

let date = [];
let gmsl = []; // global mean sea level

// For calculating the min and max values of the dataset
let dataMin,
  dataMax = 0;

function preload() {
  table = loadTable("./assets/sealevel.csv", 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  numRows = table.getRowCount(); // 136
  numCols = table.getColumnCount(); // 5

  print(`rows: ${numRows}, columns: ${numCols}`);

  // Load data
  for (let rowNum = 0; rowNum < numRows; rowNum++) {
    date[rowNum] = table.getString(rowNum, 0);
    gmsl[rowNum] = table.getNum(rowNum, 0);
    print(`${date[rowNum]} ${gmsl[rowNum]}`);
  }
  minMax();
}

function draw() {
  // put drawing code here
  background(222);
}

function minMax() {
  for (let index = 0; index < numRows; index++) {
    if (table.getNum(index, 1) > dataMax) {
      dataMax = table.getNum(index, 1);
    }
  }

  dataMin = dataMax;

  for (let index = 0; index < numRows; index++) {
    if (table.getNum(index, 1) < dataMin) {
      dataMin = table.getNum(index, 1);
    }
  }

  print(`Max value: ${dataMax}, Min value: ${dataMin}`);
}
