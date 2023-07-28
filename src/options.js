const tiles = [];

const DIM = 20;
let initialOptions;

function preload() {
  tiles.push(new Tile('BLANK', loadImage('circuit-coding-train/0.png'), [0,0,0,0]));
  tiles.push(new Tile('PINK', loadImage('circuit-coding-train/1.png'), [1,1,1,1]));
  
  const endOfPipe = new Tile('EOPIPER', loadImage('circuit-coding-train/2.png'), [1,2,1,1]);
  tiles.push(endOfPipe);
  tiles.push(endOfPipe.rotate(1, 'EOPIPED'));
  tiles.push(endOfPipe.rotate(2, 'EOPIPEL'));
  tiles.push(endOfPipe.rotate(3, 'EOPIPEU'));
  
  const pipeCyan = new Tile('PIPECYANH', loadImage('circuit-coding-train/3.png'), [1,3,1,3]);
  tiles.push(pipeCyan);
  tiles.push(pipeCyan.rotate(1, 'PIPECYANV'));

  const pipeInWallLU = new Tile('PIPEWALLL', loadImage('circuit-coding-train/4.png'), [4,2,4,0]);
  tiles.push(pipeInWallLU);
  tiles.push(pipeInWallLU.rotate(1, 'PIPEWALLU'));
  const pipeInWallRD = pipeInWallLU.rotate(2, 'PIPEWALLR');
  pipeInWallRD.edges = [5,0,5,2];
  tiles.push(pipeInWallRD);
  tiles.push(pipeInWallRD.rotate(1, 'PIPEWALLD'));

  const edgeLU = new Tile('EDGELU', loadImage('circuit-coding-train/5.png'), [4,1,1,4]);
  tiles.push(edgeLU);
  const edgeUR = edgeLU.rotate(1, 'EDGEUR');
  edgeUR.edges[0] = 5;
  tiles.push(edgeUR);
  const edgeRD = edgeLU.rotate(2, 'EDGERD');
  edgeRD.edges[1] = 5;
  edgeRD.edges[2] = 5;
  tiles.push(edgeRD);
  const edgeDL = edgeRD.rotate(1, 'EDGEDL');
  edgeDL.edges[2] = 4;
  tiles.push(edgeDL);

  const pipeMangenta = new Tile('PIPEMANGH', loadImage('circuit-coding-train/6.png'), [1,2,1,2]);
  tiles.push(pipeMangenta);
  tiles.push(pipeMangenta.rotate(1, 'PIPEMANGV'));

  const crossingPipes = new Tile('CROSSPIPEH', loadImage('circuit-coding-train/7.png'), [3,2,3,2]);
  tiles.push(crossingPipes);
  tiles.push(crossingPipes.rotate(1, 'CROSSPIPEV'));

  const transformedPipe = new Tile('TRANSPIPEU', loadImage('circuit-coding-train/8.png'), [3,1,2,1]);
  tiles.push(transformedPipe);
  tiles.push(transformedPipe.rotate(1, 'TRANSPIPER'));
  tiles.push(transformedPipe.rotate(2, 'TRANSPIPED'));
  tiles.push(transformedPipe.rotate(3, 'TRANSPIPEL'));

  const pipeCornerMangenta = new Tile('PIPECORMANGU', loadImage('circuit-coding-train/9.png'), [2,2,1,2]);
  tiles.push(pipeCornerMangenta);
  tiles.push(pipeCornerMangenta.rotate(1, 'PIPECORMANGR'));
  tiles.push(pipeCornerMangenta.rotate(2, 'PIPECORMANGD'));
  tiles.push(pipeCornerMangenta.rotate(3, 'PIPECORMANGL'));
  
  tiles.push(new Tile('PIPEALLSIDES', loadImage('circuit-coding-train/10.png'), [2,2,2,2]));
  
  const pipeSidesUR = new Tile('PIPESIDESUR', loadImage('circuit-coding-train/11.png'), [2,2,1,1]);
  tiles.push(pipeSidesUR);
  tiles.push(pipeSidesUR.rotate(1, 'PIPESIDESRD'));
  tiles.push(pipeSidesUR.rotate(2, 'PIPESIDESDL'));
  tiles.push(pipeSidesUR.rotate(3, 'PIPESIDESLU'));

  const pipeMangentaCircleMiddle = new Tile('PIPEMANGCH', loadImage('circuit-coding-train/12.png'), [1,2,1,2]);
  tiles.push(pipeMangentaCircleMiddle);
  tiles.push(pipeMangentaCircleMiddle.rotate(1, 'PIPEMANGCV'));

  initialOptions = new Array(tiles.length).fill(0).map((v,i) => i);

  console.log(tiles);
}
