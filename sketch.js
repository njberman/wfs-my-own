let images = [];

function preload() {
  images.push(loadImage('./imgs/easy/blank.png'));      // 0
  images.push(loadImage('./imgs/easy/cross.png'));      // 1
  images.push(loadImage('./imgs/easy/corner-ne.png'));  // 2
  images.push(loadImage('./imgs/easy/corner-nw.png'));  // 3
  images.push(loadImage('./imgs/easy/corner-se.png'));  // 4
  images.push(loadImage('./imgs/easy/corner-sw.png'));  // 5
  images.push(loadImage('./imgs/easy/pipe-v.png'));     // 6
  images.push(loadImage('./imgs/easy/pipe-h.png'));     // 7
}

const RULES = [
  {
    UP: [0, 2, 3, 7],
    LEFT: [0, 3, 5, 6],
    RIGHT: [0, 2, 4, 6],
    DOWN: [0, 4, 5, 7],
  },
  {
    UP: [1, 4, 5, 6],
    LEFT: [1, 2, 4, 7],
    RIGHT: [1, 3, 5, 7],
    DOWN: [1, 2, 3, 6],
  },
  {
    UP: [1, 4, 5, 6],
    LEFT: [0, 3, 5, 6],
    RIGHT: [1, 3, 5, 7],
    DOWN: [0, 4, 5, 7],
  },
  {
    UP: [1, 4, 5, 6],
    LEFT: [1, 2, 4, 7],
    RIGHT: [0, 2, 4, 6],
    DOWN: [0, 4, 5, 7],
  },
  {
    UP: [0, 2, 3, 7],
    LEFT: [0, 3, 5, 6],
    RIGHT: [1, 3, 5, 7],
    DOWN: [1, 2, 3, 6],
  },
  {
    UP: [0, 2, 3, 7],
    LEFT: [1, 2, 4, 7],
    RIGHT: [0, 2, 4, 6],
    DOWN: [1, 2, 3, 6],
  },
  {
    UP: [1, 4, 5, 6],
    LEFT: [0, 2, 4, 6],
    RIGHT: [0, 2, 4, 6],
    DOWN: [0, 2, 4, 6],
  },
  {
    UP: [0, 2, 3, 7],
    LEFT: [1, 2, 4, 7],
    RIGHT: [1, 3, 5, 7],
    DOWN: [0, 4, 5, 7],
  },
];

const GRID_SIZE = 49;

let grid = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => undefined));

let generating = true;

function copyArray(array) {
  return array.map(row => row.slice());
}

function setup() {
  createCanvas(600, 600);

  grid[3][2] = 1;
  grid[4][3] = 2;
  grid[5][2] = 5;
  grid[4][1] = 7;
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

  if (grid.some(row => row.some(cell => cell === undefined)) && generating) iterate();
  else if (generating) console.log('Finished!');
}

function keyPressed() {
  if (key === ' ') {
    generating = !generating;
  }
}

function mousePressed() {
  findPossible(Math.floor(mouseY / (height / GRID_SIZE)), Math.floor(mouseX / (width / GRID_SIZE)));
}

function iterate() {
  function findWithLowestEntropy(n) {
    if (n === undefined) n = 1;

    let cellsWithEntropyN = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (grid[i][j] !== undefined) continue;
        const possible = findPossible(i, j);

        if (possible.length === n) cellsWithEntropyN.push({ possible, i, j, n });
      }
    }

    if (cellsWithEntropyN.length === 0) return findWithLowestEntropy(n + 1);

    return cellsWithEntropyN;
  }

  const lowestEntropyCells = findWithLowestEntropy();
  const randomIndex = Math.floor(Math.random() * (lowestEntropyCells.length - 1));

  const cellToUpdate = lowestEntropyCells[randomIndex];

  grid[cellToUpdate.i][cellToUpdate.j] = cellToUpdate.possible[Math.floor(Math.random() * (cellToUpdate.n - 1))];
  return;
}

function getCommonElements(arrays) {
  return [...arrays.reduce((acc, curr) =>
    new Set(curr.filter(x => acc.has(x))),
    new Set(arrays[0])
  )];
}

function findPossible(i, j) {
  let neighbours = [];
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      if (Math.abs(y) === Math.abs(x)) continue;
      if (i + y < 0 || j + x < 0 || i + y >= GRID_SIZE || j + x >= GRID_SIZE) {
        neighbours.push(undefined);
        continue;
      }
      neighbours.push(grid[i + y][j + x]);
    }
  }

  let possibleFromEachNeighbour = [];
  for (let n = 0; n < 4; n++) {
    if (neighbours[n] === undefined) continue;
    const rulesForNeighbour = RULES[neighbours[n]];
    possibleFromEachNeighbour.push(rulesForNeighbour[Object.keys(rulesForNeighbour)[3 - n]]);
  }

  return getCommonElements(possibleFromEachNeighbour);
}
