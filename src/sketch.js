let grid;

let widthOfTile;
let heightOfTile;

let tileId = -1;

function setup() {
  createCanvas(800, 800);
  widthOfTile = width / DIM;
  heightOfTile = height / DIM;
  grid = Array.from(Array(DIM * DIM), (val, idx) => ({
    options: [...initialOptions],
    index: idx,
  }));
}
  
function testTilesCombinations() {
  const diff = 0;
  const newTileId = Math.floor(millis()/3000) % (tiles.length-diff) + diff;
  
  const edgeToLeft = 3;
  const edgeToRight = 1;
  const filterFn = (neighbourEdge, originEdge) => ({edges}) => edges[neighbourEdge] === tile.edges[originEdge];
  
  const tile = tiles[newTileId];
  
  const tilesTop = tiles.filter(filterFn(edgeToRight, edgeToLeft));
  const tilesBottom = tiles.filter(filterFn(edgeToLeft, edgeToRight));
  
  const logList = [];
  
  const offset = 0*DIM;
  const maxLen = Math.min(DIM+offset, Math.max(tilesTop.length, tilesBottom.length));

  for (let index = offset; index < maxLen; index++) {
    const tileTop = tilesTop[index];
    if (tileTop !== undefined) {
      tileTop.drawTile((index-offset) * DIM);
    }

    tile.drawTile((index-offset) * DIM +1);

    const tileBottom = tilesBottom[index];
    if (tileBottom !== undefined) {
      tileBottom.drawTile((index-offset) * DIM +2);
    }

    logList.push([
      tileTop ? `${tileTop.name} - ${tileTop.edges[edgeToRight]}` : '',
      `${tile.edges[edgeToLeft]} - ${tile.name} - ${tile.edges[edgeToRight]}`,
      tileBottom ? `${tileBottom.edges[edgeToLeft]} - ${tileBottom.name}` : '',
    ].join(' // '));

  }

  fill(255);
  text(`ID origin: ${tile.name}/${newTileId}`, widthOfTile*4, heightOfTile*4);
  
  if (!(newTileId === tileId)) {
    logList.forEach((item) => console.log(item));
    tileId = newTileId;
  }

}

function draw() {
  background(255);

  flowFn(
    minimumEntropy,
    filterByFieldsWithMinimumEntropy(grid),
    getRandomField(grid),
    pickRandomTile,
    adjustNeighbourOptions(grid),
  )(grid);
  
  flowFn(
    filter(({options}) => options.length === 1),
    forEach(drawTile),
  )(grid);

  // testTilesCombinations();

  let openFields = grid.filter(({options}) => options.length > 1).length;
  if (openFields === 0) {
    console.log(grid);
    noLoop();
  }
}