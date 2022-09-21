/**
 * GLOBALS
 */
let table;

let numRows, numCols;

let diagramX, diagramY;

let date = [];
let gmsl = []; // global mean sea level

// For calculating the min and max values of the dataset
let dataMin,
  dataMax = 0;

// for ...
let size = [];

let newRange = {
  min: 0,
  max: 205,
};
/**
 * PRELOAD
 */
function preload() {
  table = loadTable("./assets/sealevel.csv", "csv", "header");
}

/**
 * SETUP
 */
function setup() {
  createCanvas(windowWidth, windowHeight);

  numRows = table.getRowCount(); // 136
  numCols = table.getColumnCount(); // 5

  // print(`rows: ${numRows}, columns: ${numCols}`);

  // Load data
  for (let rowNum = 0; rowNum < numRows; rowNum++) {
    date[rowNum] = table.getString(rowNum, 0);
    gmsl[rowNum] = table.getNum(rowNum, 1);
    // print(`${date[rowNum]} ${gmsl[rowNum]}`);
  }
  minMax();
}

/**
 * DRAW
 */
function draw() {
  // background color
  background("white");

  diagramX = (width / 4) * 3 - 90;
  diagramY = height / 2;

  let radius = width / 5 - 100;
  let angle = 360 / numRows;

  for (let i = 0; i < numRows; i++) {
    /**
     * The `map()` function re-maps numbers from `range a` to numbers of `range b`.
     * Size[] contains the new values derived from the dataset.
     * These values are then used to calculate the x and y coordinates in the 2d-space of the canvas.
     */
    size[i] = map(gmsl[i], dataMin, dataMax, newRange.min, newRange.max);

    let pointX = (size[i] + radius) * cos(radians(angle * i)) + diagramX;
    let pointY = (size[i] + radius) * sin(radians(angle * i)) + diagramY;

    let circleX = radius * cos(radians(angle * i)) + diagramX;
    let circleY = radius * sin(radians(angle * i)) + diagramY;

    stroke('black')
    strokeWeight(0.1);
    line(circleX, circleY, pointX, pointY)

    fill("blue");
    noStroke();
    circle(pointX, pointY, 3);
  }
}

/**
 * MIN/MAX
 */
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
