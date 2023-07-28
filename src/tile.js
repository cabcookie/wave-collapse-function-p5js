const drawText = (caption, x, y, height) => {
  fill(255);
  textSize(height);
  textAlign(CENTER);
  text(caption, x, y);
}

class Tile {
  constructor(name, image, edges) {
    this.rotation = 0;
    this.name = name;
    this.image = image;
    this.edges = edges;
  }

  drawTile(index) {
    const x = ((index % DIM) + 0.5) * widthOfTile;
    const y = (Math.floor(index / DIM) + 0.5) * heightOfTile;
    push();
    translate(x, y);
    rotate(this.rotation * HALF_PI);
    image(this.image, -widthOfTile/2, -heightOfTile/2, widthOfTile, heightOfTile);
    pop();

    // drawText(`${index}-${this.name}`, x, y, heightOfTile/6);
    return this.image;
  }

  rotate(steps, name) {
    const { image, edges } = this;
    const newTile = new Tile(name, image, rotateArray(edges, steps));
    newTile.rotation = this.rotation + steps;
    return newTile;
  }
}