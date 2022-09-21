/**
 * GLOBALS
 */
let table;
let numRows, numCols;
let diagramX, diagramY;

let date = [];
let gmsl = []; //  gmsl = global mean sea level

// For calculating the min and max values of the dataset
let dataMin,
  dataMax = 0;

// for ...
let size = [];
let backgroundColor = "white";

// For the map() function. It contains the values to map the dataset to.
let MAXRANGE = {
  min: 0,
  max: 255,
};

let STROKESIZES = {
  thin: 0.2,
  medium: 0.8,
  thick: 1.5,
};

let FONTSIZES = {
  reg: 16,
  small: 12,
  big: 24,
};

// ChartInfoText;
const TEXT =
  "Global Average Absolute Sea Level Change, 1880-2014 from the US Environmental Protection Agency using data from CSIRO, 2015; NOAA, 2015. This data contains “cumulative changes in sea level for the world’s oceans since 1880, based on a combination of long-term tide gauge measurements and recent satellite measurements. It shows average absolute sea level change, which refers to the height of the ocean surface, regardless of whether nearby land is rising or falling. Satellite data are based solely on measured sea level, while the long-term tide gauge data include a small correction factor because the size and shape of the oceans are changing slowly over time. (On average, the ocean floor has been gradually sinking since the last Ice Age peak, 20,000 years ago.)”";

const TITLE = "Global Average Absolute Sea Level Change, 1880 - 2014";
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
  background(backgroundColor);

  // Display the chartInfo
  chartInfo();

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
    size[i] = map(gmsl[i], dataMin, dataMax, MAXRANGE.min, MAXRANGE.max);

    let pointX = (size[i] + radius) * cos(radians(angle * i)) + diagramX;
    let pointY = (size[i] + radius) * sin(radians(angle * i)) + diagramY;

    let circleX = radius * cos(radians(angle * i)) + diagramX;
    let circleY = radius * sin(radians(angle * i)) + diagramY;

    /**
     * Draws the lines from the inner circle to the datapoints.
     * Fattens every 12th line.
     */
    if (i % 12 === 0) {
      strokeWeight(STROKESIZES.medium);
    } else {
      strokeWeight(STROKESIZES.thin);
    }    
    stroke("blue");
    line(circleX, circleY, pointX, pointY);

    /**
     * Hover state
     *
     * When hovering:
     *  - show datapoint information
     *  - enlarge datapoint circle
     */
    let dataSize;
    let dataColor;

    // distance between the mouse and the datapoints
    let deltaMouseGraph = dist(mouseX, mouseY, pointX, pointY);

    // If 'hover=true' ...
    if (deltaMouseGraph < 5) {
      dataColor = "red";
      dataSize = 10;

      circle(pointX, pointY, dataSize);

      // Show the data as text in the circle
      textAlign(CENTER);
      textSize(22);
      fill("black");
      noStroke();
      text(date[i], diagramX, diagramY);
      text(gmsl[i], diagramX, diagramY + 45);

      // Else ...
    } else {
      dataColor = "blue";
      dataSize = 5;
    }

    // Draws the data points
    fill(dataColor);
    noStroke();
    circle(pointX, pointY, dataSize);
  }
}

function chartInfo() {
  // Text content
  textSize(FONTSIZES.reg);
  textAlign(LEFT);
  fill("black");
  text(TEXT, width / 4 - 100, height / 4 - 20, width / 4);

  // Title content
  textSize(FONTSIZES.big);
  text(TITLE, width / 4 - 100, height / 4 - 160, width / 3);
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
