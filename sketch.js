let images = [];

function preload() {
  images.push(loadImage('./imgs/blank.png'));      // 0
  images.push(loadImage('./imgs/cross.png'));      // 1
  images.push(loadImage('./imgs/corner-ne.png'));  // 2
  images.push(loadImage('./imgs/corner-nw.png'));  // 3
  images.push(loadImage('./imgs/corner-se.png'));  // 4
  images.push(loadImage('./imgs/corner-sw.png'));  // 5
  images.push(loadImage('./imgs/pipe-v.png'));     // 6
  images.push(loadImage('./imgs/pipe-h.png'));     // 7
}

const rules = [
  {
    UP: [0, 2, 3, 7],
    RIGHT: [0, 2, 4, 6],
    DOWN: [0, 4, 5, 7],
    LEFT: [0, 3, 5, 6],
  },
  {
    UP: [1, 4, 5, 6],
    RIGHT: [1, 3, 5, 7],
    DOWN: [1, 2, 3, 6],
    LEFT: [1, 2, 4, 7],
  },
  {
    UP: [1, 4, 5, 6],
    RIGHT: [1, 3, 5, 7],
    DOWN: [0, 4, 5, 7],
    LEFT: [0, 3, 5, 6],
  },
  {
    UP: [1, 4, 5, 6],
    RIGHT: [0, 2, 4, 6],
    DOWN: [0, 4, 5, 7],
    LEFT: [1, 2, 4, 7],
  },
  {
    UP: [0, 2, 3, 7],
    RIGHT: [1, 3, 5, 7],
    DOWN: [1, 2, 3, 6],
    LEFT: [0, 3, 5, 6],
  },
  {
    UP: [0, 2, 3, 7],
    RIGHT: [0, 2, 4, 6],
    DOWN: [1, 2, 3, 6],
    LEFT: [1, 2, 4, 7],
  },
  {
    UP: [1, 4, 5, 6],
    RIGHT: [0, 2, 4, 6],
    DOWN: [0, 2, 4, 6],
    LEFT: [0, 2, 4, 6],
  },
  {
    UP: [0, 2, 3, 7],
    RIGHT: [1, 3, 5, 7],
    DOWN: [0, 4, 5, 7],
    LEFT: [1, 2, 4, 7],
  },
];

const GRID_SIZE = 9;

let grid = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => undefined));

function copyArray(array) {
  return array.map(row => row.slice());
}

function setup() {
  createCanvas(600, 600);

  grid[3][2] = 1;
}

function draw() {
  background(0);

  stroke(255);
  for (let i = 0; i <= GRID_SIZE; i++) {
    line(i * width / GRID_SIZE, 0, i * width / GRID_SIZE, height);
    line(0, i * height / GRID_SIZE, height, i * width / GRID_SIZE);
  }

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === undefined) continue;
      image(images[grid[i][j]], j * width / GRID_SIZE, i * height / GRID_SIZE, width / GRID_SIZE, height / GRID_SIZE);
    }
  }
}

function findPossible() {
  let possible = [];

  let neighbours = [];
  // TODO FIGURE OUT NEIGHBOURS AND TAKE INTO ACCOUNT EDGE CASES

}
