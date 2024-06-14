const canvas = document.getElementById("snake-canvas");
const context = canvas.getContext("2d");

const GRID_SIZE = 20;
let snake;
let food;

function setup() {
  createCanvas(700, 700);
  snake = new Snake();
  food = new Food();
  frameRate(4);
}

function draw() {
  background(155, 204, 153);
  for (let x = 0; x < width; x += width / GRID_SIZE) {
    for (let y = 0; y < height; y += height / GRID_SIZE) {
      stroke(255);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }

  snake.update();
  snake.draw();
  food.draw();

  if (snake.hasEatenFood()) {
    food.spawn();
    snake.grow();
  }
}

class Snake {
  constructor() {
    this.body = [{ x: 10, y: 10 }];
    this.dir = 1; // 1: right, 2: down, 3: left, 4: up
  }

  update() {
    let head = this.body[0];
    if (this.dir == 1) {
      head.x += width / GRID_SIZE;
    } else if (this.dir == 2) {
      head.y += height / GRID_SIZE;
    } else if (this.dir == 3) {
      head.x -= width / GRID_SIZE;
    } else if (this.dir == 4) {
      head.y -= height / GRID_SIZE;
    }

    for (let i = this.body.length - 1; i >= 1; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
  }

  draw() {
    for (let i = 0; i < this.body.length; i++) {
      fill(255);
      rect(
        this.body[i].x,
        this.body[i].y,
        width / GRID_SIZE,
        height / GRID_SIZE
      );
    }
  }

  grow() {
    this.body.push({
      x: this.body[this.body.length - 1].x,
      y: this.body[this.body.length - 1].y,
    });
  }

  hasEatenFood() {
    if (this.body[0].x == food.x && this.body[0].y == food.y) {
      return true;
    }
  }
}

class Food {
  constructor() {
    this.spawn();
  }

  spawn() {
    let randX = random(width);
    let randY = random(height);
    this.x = randX - (randX % (width / GRID_SIZE));
    this.y = randY - (randY % (height / GRID_SIZE));
  }

  draw() {
    fill(255, 100, 100);
    rect(this.x, this.y, width / GRID_SIZE, height / GRID_SIZE);
  }
}

setup();
