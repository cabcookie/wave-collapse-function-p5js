const decisions = [];
const ONE_VERTICAL = DIM;
const ONE_HORIZONTAL = 1;
const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

const minimumEntropy = (aGrid) => aGrid.reduce((prev, {options}) => {
  if (options.length === 1) return prev;
  if (options.length > prev) return prev;
  return options.length;
}, initialOptions.length);

const filterByFieldsWithMinimumEntropy = (aGrid) => (minOptionsLength) => aGrid
  .filter(({options}) => options.length === minOptionsLength);

const reduceFieldOptions = (aGrid, diff, connectionIndex) => field => {
  const { options, index } = field;  
  const tileID = options[0];
  if (tileID === undefined) return field;  
  const tile = tiles[tileID];  
  const tileConnection = tile.edges[connectionIndex];  
  const neighborField = aGrid[index+diff];  
  if (neighborField.options.length === 1) return field;

  const compareIndex = (connectionIndex + 2) % 4;
  neighborField.options = neighborField.options.filter(option => tiles[option].edges[compareIndex] === tileConnection);

  return field;
};

const getTile = ({options, index}) => ({
  tile: { ...tiles[options[0]] },
  index,
});

const drawTile = ({ options, index }) => {
  const tile = tiles[options[0]];
  if (tile === undefined) return null;
  return tile.drawTile(index);
}

const adjustUpperNeighbour = aGrid => field => ifThen(
  ({index}) => index - DIM >= 0,
  reduceFieldOptions(aGrid, -ONE_VERTICAL, UP),
)(field);

const adjustRightNeighbour = aGrid => field => ifThen(
  ({index}) => !((index + 1) % DIM === 0),
  reduceFieldOptions(aGrid, ONE_HORIZONTAL, RIGHT),
)(field);

const adjustLowerNeighbour = aGrid => field => ifThen(
  ({index}) => index + DIM < DIM*DIM,
  reduceFieldOptions(aGrid, ONE_VERTICAL, DOWN),
)(field);

const adjustLeftNeighbour = aGrid => field => ifThen(
  ({index}) => !(index % DIM === 0),
  reduceFieldOptions(aGrid, -ONE_HORIZONTAL, LEFT),
)(field);

const adjustNeighbourOptions = aGrid => field => flowFn(
  adjustUpperNeighbour(aGrid),
  adjustRightNeighbour(aGrid),
  adjustLowerNeighbour(aGrid),
  adjustLeftNeighbour(aGrid),
)(field);

const getRandomField = (theGrid) => (filteredGrid) => theGrid[random(filteredGrid).index];

const pickRandomTile = (field) => {
  field.options = [random(field.options)];
  return field;
};
